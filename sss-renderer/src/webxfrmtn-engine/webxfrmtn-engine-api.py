
from flask import Flask, request
from flask_cors import CORS
import webxfrmtnengine as sss_app
from conf import XFRM_API_HOST, XFRM_API_PORT, DEBUG
import json

app = Flask(__name__)
CORS(app)

@app.route('/send/sss/json/', methods=['POST'])
def web_xfrmtn():
    sss = json.loads(json.dumps(request.json))
    op = sss_app.Operations(sss["metadata"]["renurl"])
    op.runAll(sss['pgxform'])
    html = op.getNewPageSource()
    print(html)
    op.close()
    return html,200

if __name__ == '__main__':
    app.run(host=XFRM_API_HOST[0], port=XFRM_API_PORT[0], debug=DEBUG[0])
