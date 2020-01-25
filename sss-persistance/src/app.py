
from flask import Flask, jsonify, abort
from flask import request
from bson.json_util import dumps as bson_dumps
from bson.objectid import ObjectId
from classes import SSS
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/api/get/sss/<key_type>/', methods=['POST'])
def getByType(key_type):
    if(not key_type in ['username', 'sssname', 'renurl']):
        abort(400)
    value = request.json[key_type]
    json_obj = {str('metadata.' + key_type): value}
    print(json_obj)
    results = SSS.get(json_obj)
    if(results):
        r = []
        for i in range(0, results.count()):
            r.append(results[i])
        return jsonify(r), 200
    return jsonify({"error": "not_found"}), 403

@app.route('/api/get/id=<object_id>', methods=['GET'])
def getById(object_id):
    json_obj = {'_id': ObjectId(object_id)}
    print(json_obj)
    results = SSS.get(json_obj)
    if(results):
        return jsonify(results[0]), 200
    else:
        return jsonify({'error': 'not_found'}), 403

@app.route('/api/update/sss/', methods=['POST'])
def createOrUpdateSSS():
    """
    Updates already existing sss record of a user
    else creates one.
    return: id of newly created document else True.
    """
    sss = SSS.fromJSON(request.json)
    result = sss.update()
    print(result)
    return jsonify({'result': bson_dumps(result)})

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000) #removed 127.0.0.1
