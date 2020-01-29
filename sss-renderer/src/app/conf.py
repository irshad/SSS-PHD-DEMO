
SECRET_KEY = ('dshgfcjsd',) # some long string
DATABASE = ('sss-dsl',) # Database connection
USERS_COLLECTION= ['user-info'] # users info collection

# To run the app on local machine
# HOST = ['localhost'] # Removed 127.0.0.1
# PORT = [8090]
# Comment above lines and uncomment below lines to run the app on server 
HOST = ['0.0.0.0']
PORT = [8090]

# SSS-DB address (To modify the host name to server address change hostname in 'SSS_DB_HOST_ADRS')  
SSS_DB_HOST_ADRS = ['localhost'] # Removed 127.0.0.1
SSS_DB_PORT_ADRS = [5000]

# Web transformation engine API address (To modify the host name to server address change hostname in 'XFORM_API_HOST_ADRS')
XFORM_API_HOST_ADRS = ['localhost'] # Removed 127.0.0.1
XFORM_API_PORT_ADRS = [8006]
