
from pymongo import MongoClient
# import datetime
import json
from config import DATABASE_NAME, SERVER_URI

# DATABASE_NAME and SERVER_URI are defined in config.py
client = MongoClient(SERVER_URI)
db = client[DATABASE_NAME]

def post_db(post_string, collection_name):
    """
    insert a document into a collection

    post_string(required): JSON object
    collection_name(required): name of collection (str)
    output: return object_id of newly created document.
    """
    collection = db[collection_name]
    post_id = collection.insert_one(post_string).inserted_id
    print(post_id)
    return post_id

def get_db(collection_name, queryFilter):
    """"
    get documents form collection

    queryFilter : JSON list of filters ex. {"author": "Mike"}
    collection_name(required) : name of collection (str)
    output: return JSON list of documents matching to queryFilter

    By adding _id : False, we are hiding the object_ids in projections because
    these IDs are of BSON type and are not compatible with JSON.
    """
    collection = db[collection_name]
    if(len(queryFilter) > 0):
        result = collection.find(queryFilter, {'_id': False})
    else:
        result = collection.find({}, {'_id': False})
    return result

def update_db(collection_name=None, queryFilter=None, update=None):
    """
    Update existing document in collection. If do not exist, create a new one.

    collection_name(string)(required) : name of target collection.
    queryFilter(JSON object)(required) : collection will be queried on given values.
    update(JSON object)(required) : new JSON object to replace values in existing document.

    output : return MongoDB response which tells if object is modified or created.
    """
    collection = db[collection_name]
    result = collection.update(queryFilter, update, upsert=True)
    return result
