
# CONFIG FILE
# Rename this file to `config.py`
# Give or change values according to mongodb instance location and database name.
# Uncomment `SERVER_URI` according to your requirement.

# Information required for connection.
#PASSWORD = str(' ') #Mongodb server password
#USERNAME = str(' ') #MongoDB server username
#GROUP_NAME = str(' ') #Cluster name, provided while signing up for MongoDB cloud service.

# Database should already exist
DATABASE_NAME = str('sss-dsl') #required

# Name the collections for storing user profiles and sss information.
# Collections with these name will be created if not existing already
USER_COLLECTION_NAME = str(' ') #required
SSS_COLLECTION_NAME = str('sss-info') #required

# Only one =SERVER_URI= is to be filled

# URI of the cluster at MongoDB Atlas
# SERVER_URI = str(' ')

# FOR LOCAL MongoDB instance. Default location is given below
SERVER_URI = str('mongodb://localhost:27017')
