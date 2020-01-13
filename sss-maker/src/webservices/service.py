
from flask import Flask
from flask import request
from flask_cors import CORS
import requests as req
import bs4
import json
import conf 

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = conf.SECRET_KEY[0]

translatekey = 'trnsl.1.1.20160620T044235Z.009e3fdaf079e045.51ec20ede6d14038c2cb193de1f8891c28dfc749'

@app.route("/language-translive", methods=['POST'])
def languagetranslive():
    try:
        sentence = request.json['sentence']
    except:
        return "sentence parameter not passed"
    try :
        fromlang = request.json['from-language']
    except:
        return "from-language parameter not passed"
    try :
        tolang = request.json['to-language']
    except:
        return "to-language not passed"

    res = req.get('https://translate.yandex.net/api/v1.5/tr/translate?key='+translatekey+'&text='+sentence+'&lang='+fromlang+'-'+tolang+'&format=plain&options=0')
    soup = bs4.BeautifulSoup(res.text)
    ret = soup.text
    return ret

@app.route("/currency-conv", methods=['POST'])
def currencyconversion():
    try :
        cur_amount = request.json['currency-amount']
    except:
        return "cur_amount parameter is not passed"
    try:
        from_cur = request.json['from-currency']
    except:
        return "from_cur parameter is not passed"
    try :
        to_cur = request.json['to-currency']
        if(to_cur == "IN"):
            to_cur = "INR"
    except:
        return "to_cur parameter is not passed"

    res = req.get("http://free.currencyconverterapi.com/api/v3/convert?q="+from_cur+"_"+to_cur+"&compact=ultra")
    soup = bs4.BeautifulSoup(res.text)
    json_res = json.loads(soup.text)
    converted_cur = json_res[from_cur+"_"+to_cur]*cur_amount   
    return str(converted_cur)+" "+to_cur

@app.route("/test", methods=['GET'])
def test():
    return "Its working..!"

if __name__ == '__main__':
    app.run(host=conf.HOST[0], port=conf.PORT[0], debug = True)
