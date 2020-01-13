from flask import Flask, request, render_template, flash, make_response, session, abort, jsonify, g, url_for, send_from_directory, \
    redirect
from flask_wtf import Form
from wtforms import StringField, IntegerField, SelectField, PasswordField, SubmitField, validators, ValidationError
from wtforms.fields.html5 import EmailField
from werkzeug.security import check_password_hash
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import bcrypt
import requests
import conf
import json
import re

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
    login = SubmitField('Login')

@app.route('/')
def home():
    form = userLoginForm()
    """
    displays the urlform page if the user is already logged in
    else displays the login page.
    """
    if 'username' in session:
        return redirect(url_for('urlPage'))
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
    login_user = users.find_one({ '$and': [ { 'userinfo.username': request.form['username'] }, { 'userinfo.password': request.form['password'] } ] })

    if request.method == 'POST':
        """
        the code below gets executed if, the entered credentials are valid. 
        If valid then, the user will be redirected to an urlform page.
        """
        if login_user:
            user_details = users.find_one( { 'userinfo.username': request.form['username'] } )
            session['username'] = user_details['userinfo']['username']
            session['userid'] = user_details['userinfo']['userid']
            session['communityname'] = user_details['userinfo']['communityname']
            session['communityid'] = user_details['userinfo']['communityid']
            return redirect(url_for('urlPage'))   
            """
            the code below gets executed if, the entered credentials are 
            invalid i.e., user will be in the same page.
            """         
        else:
            error = 'Invalid Credentials. Please try again'
            return render_template('login.html', form=form, error=error)

@app.route('/logout')
def logout():
    """
    remove the username from the session
    if it exits
    """
    session.pop('username', None)
    return redirect(url_for('home'))

class urlForm(Form):
    """
    url form to access writing and settings pages
    """
    url = StringField('URL:', [validators.DataRequired(), validators.url() ])
    submit = SubmitField('Renarrate')

@app.route('/urlform', methods=['GET','POST'])
def urlPage():
   form = urlForm()
   if request.method == 'POST':
      if form.validate() == False:
        return render_template('url_form.html', form=form)
      elif form.validate_on_submit():
        """ 
        if the url is valid get_sss method is called by passing 
        entered url
        """
        url = form.url.data
        print(url)
        return redirect(getSss(url))
   elif request.method == 'GET':
       return render_template('url_form.html', form = form)
  
def getSss(passed_url):
    endpoint = 'http://'+conf.SSS_DB_HOST_ADRS[0]+':'+str(conf.SSS_DB_PORT_ADRS[0])+'/api/get/sss/renurl/'
    body = {'renurl' : str(passed_url)}
    headers = {'Content-Type': 'application/json'}
    sss_list = requests.post(endpoint, data=json.dumps(body), headers=headers)
    if(sss_list.status_code == 200):
        global sss
        for sss in sss_list.json():
            sss_conditions = json.loads(json.dumps(sss['ssscrite']))
            print(sss_conditions)
            if(re.match(session['username'], sss_conditions['username']) or sss_conditions['username'] == '*'):
                if(re.match(session['userid'], sss_conditions['userid']) or sss_conditions['userid'] == '*' ):
                    if(re.match(session['communityname'], sss_conditions['cmntyname']) or sss_conditions['cmntyname'] == '*'):
                        if(re.match(session['communityid'], sss_conditions['cmntyid']) or sss_conditions['cmntyid'] == '*'):
                            response = sss['pgxform']
                            print(response)
                            break
        return 'getTransformPage'   
    
    elif(sss_list.status_code == 403):
        return 'error'

@app.route('/error')
def errorPage():
    return 'No renarrations available for this url..!'

@app.route('/getTransformPage')
def getPage():
    sssData = requests.post('http://'+conf.XFORM_API_HOST_ADRS[0]+':'+str(conf.XFORM_API_PORT_ADRS[0])+'/send/sss/json/', data=json.dumps(sss), headers={'Content-Type': 'application/json'})
    return sssData.text

@app.route('/test', methods=['GET'])
def test():
  return 'Its Working...!'

if __name__ == '__main__':
    app.run(host=conf.HOST[0], port=conf.PORT[0], debug = True)
