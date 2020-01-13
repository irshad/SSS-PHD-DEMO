from flask import Flask, request, render_template, flash, make_response, session, abort, jsonify, g, url_for, send_from_directory, \
    redirect
from flask_wtf import Form
from wtforms import StringField, IntegerField, SelectField, PasswordField, SubmitField, validators, ValidationError
from wtforms.fields.html5 import EmailField
from werkzeug.security import check_password_hash
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
from urllib.parse import unquote, quote
from io import StringIO
import lxml.html
import bcrypt
import conf

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = conf.SECRET_KEY[0]

client = MongoClient()
db = client[conf.DATABASE[0]]

class userLoginForm(Form):
    """
    Login form to access writing and settings pages
    """
    username = StringField('Username')
    password = PasswordField('Password')
    login = SubmitField("Login")

@app.route('/')
def home():
    form = userLoginForm()
    """
    displays the urlform page if the user is already logged in
    else displays the login page.
    """
    if 'renarratorname' in session:
        return redirect(url_for('urlForm'))
    else:
        return render_template('login.html', form = form)

@app.route('/login', methods=['GET', 'POST'])
def userLogin():
    error = None
    form = userLoginForm()
    """
    Compares current login info with the user profiles in database
    """
    users = db[conf.USERS_COLLECTION[0]]
    login_user = users.find_one({ "$and": [ { "userinfo.username": request.form["username"] }, { "userinfo.password": request.form["password"] } ] })

    if request.method == 'POST':
        """
        the code below is executed if, the entered credentials are valid but only if 
        user is a renarrator/admin then the user will be redirected to an urlform page.
        """
        if login_user:
            user_details = users.find_one( { "userinfo.username": request.form["username"] } )
            type_of_user = user_details["userinfo"]["role"]
            if (type_of_user == "RenarratorUser" or type_of_user == "admin"): 
                session['renarratorname'] = user_details["userinfo"]["username"]
                session['renarratorid'] = user_details["userinfo"]["userid"]
                session['communityname'] = user_details["userinfo"]["communityname"]
                session['communityid'] = user_details["userinfo"]["communityid"]
                return redirect(url_for('urlForm'))   
                """
                If user is not renarrator/admin code below gets executed saying 
                that access denied
                """
            else:
                error = 'Access denied..!Only renarrator/admin user can login into sss-maker'
                return render_template('login.html', form=form, error=error)
                """
                the code below is executed if, the entered credentials are 
                invalid i.e., user will be in the same page.
                """         
        else:
            error = 'Invalid Credentials. Please try again'
            return render_template('login.html', form=form, error=error)

@app.route('/logout')
def logoutUser():
    """
    remove the renarratorname from the session
    if it exits
    """
    session.pop('renarratorname', None)
    return redirect(url_for('home'))

class registrationForm(Form):
    username = StringField('User Name', [validators.DataRequired(), validators.Length(min=4, max=25)])
    userid = StringField('User Id', [validators.DataRequired(), validators.Length(min=4, max=25)])
    role =  SelectField('Role', choices = [('RenarratorUser', 'Renarrator'), ('NormalUser', 'Normal user')])
    email = EmailField('Email', [validators.DataRequired(), validators.Length(max=50), validators.Email()])
    communityname = StringField('Community Name')
    communityid = StringField('Community Id')
    password = PasswordField('Password', [validators.DataRequired(), validators.Length(max=15)])
    signup = SubmitField("Sign Up")

@app.route('/register', methods=['GET','POST'])
def registration():
    form = registrationForm()
    if request.method == 'POST':
        """
        Checks if the user is already registered 
        or not from database
        """
        users = db[conf.USERS_COLLECTION[0]]
        existing_user = users.find_one({ "$or": [ { "userinfo.username": request.form["username"] }, { "userinfo.email": request.form["email"] } ] })
        if form.validate() == False:
            error = 'All the fields are mandatory.  Please fill the details correctly.'
            return render_template('registration.html', form = form, error = error)

        elif existing_user is None:
            hashpass = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt())
            users.insert_one(
                {   
                    'userinfo': {
                        'username': request.form['username'],
                        'userid': request.form['userid'],
                        'email': request.form['email'],
                        'communityname': request.form['communityname'],
                        'communityid': request.form['communityid'],
                        'role': request.form['role'],
                        'password': request.form['password']
                    }
                }
            )
            flash('Thanks for registering.')
            return render_template('success.html', role = request.form['role'])

        else:
            error = 'User name/email id already exists'
            return render_template('registration.html', form = form, error = error)
            
    elif request.method == 'GET':
        return render_template('registration.html', form = form)


@app.route('/urlform', methods=['GET'])
def urlForm():
    if request.method == 'GET':
        return render_template('url_form.html')

@app.route('/openpage')
def fetchPageContent():
    d = {}
    d['foruri'] = request.args['foruri']
    req = Request(d['foruri'], headers={'User-Agent':
                                        'Mozilla/5.0 (X11; ' +
                                        'Linux x86_64; rv:25.0)' +
                                        'Gecko/20100101 Firefox/25.0)'})
    # A fix to send user-agents, so that sites render properly.
    try:
        res = urlopen(req)
        if res.geturl() != d['foruri']:
           redirected_url = 'http://{0}:{1}/openpage?foruri={2}'.format(conf.HOST[0], conf.PORT[0], quote(res.geturl()))
           return ("There was a server redirect, please click on the"+" "+"<a href="+redirected_url+">link</a>"+" "+"to continue.")
        else:        
           page = res.read()
           res.close()
    except ValueError:
        error = "Please check the url..!"
        return render_template('error.html', error = error)
    except URLError as e:
       if hasattr(e, 'reason'):
          error = 'We failed to reach a server.Reason:', e.reason
          return render_template('error.html', error = error)
       elif hasattr(e, 'code'):
          error = 'The server couldn\'t fulfill the request.Error code:', e.code
          return render_template('error.html', error = error)
    
    try:
        page = str(page, 'utf-8')  # Hack to fix improperly displayed chars on wikipedia.
    except UnicodeDecodeError:
        pass   # Some pages may not need be utf-8'ed

    try:
        g.root = lxml.html.parse(StringIO(page)).getroot()
    except ValueError:
        g.root = lxml.html.parse(d['foruri']).getroot() # Sometimes creators of the page lie about the encoding, thus leading to this execption. http://lxml.de/parsing.html#python-unicode-strings
    
    g.root.make_links_absolute(d['foruri'], resolve_base_href=True)
    for i in g.root.iterlinks():
        if i[1] == 'href' and i[0].tag != 'link':
            try:
                i[0].attrib['href'] = 'http://{0}:{1}/openpage?foruri={2}'.format(conf.HOST[0], conf.PORT[0], quote(i[0].attrib['href']))
            except KeyError:
                i[0].attrib['href'] = '{0}:{1}/openpage?foruri={2}'.format(conf.HOST[0], conf.PORT[0], quote(i[0].attrib['href'].encode('utf-8')))
    setScripts()
    #sendSessionDetails(d['foruri'])
    response = make_response()
    response.data = lxml.html.tostring(g.root)
    return response

def setScripts():
    annolet_script = g.root.makeelement('script')
    g.root.body.append(annolet_script)
    annolet_script.set('src', conf.ANNOLET_URL[0])
    annolet_script.set('type', 'text/javascript')

    jq_script = g.root.makeelement('script')
    g.root.head.append(jq_script)
    jq_script.set('src', conf.JQUERY_URL[0])
    jq_script.set('type', 'text/javascript')

    fonts_link = g.root.makeelement('link')
    g.root.head.append(fonts_link)
    fonts_link.set('href', conf.FONTS_URL[0])
    fonts_link.set('rel', 'stylesheet')

    annolet_link = g.root.makeelement('link')
    g.root.head.append(annolet_link)
    annolet_link.set('href', conf.ANNOLET_STYLING_URL[0])
    annolet_link.set('rel', "stylesheet") 
    
def sendSessionDetails(url):
    sssdict_script =  g.root.makeelement('script')
    g.root.body.append(sssdict_script)
    sssdict_script.set('type', 'text/javascript')
    #sssdict_script.text = sssdict_script.text = 'var session_info = {};'+'session_info["renarratorname"]='+str(session["renarratorname"])+';'+'session_info["renarratorid"]='+str(session["renarratorid"])+';'

@app.route('/test', methods=['GET'])
def testApi():
  return "Its Working...!"

if __name__ == '__main__':
    app.run(host=conf.HOST[0], port=conf.PORT[0], debug = True)
