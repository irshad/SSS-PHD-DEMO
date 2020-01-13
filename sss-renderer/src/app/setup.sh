
#! bash script for setting up enviornment for flask app
if command -v python3 &>/dev/null; then
    echo Python 3 is installed
else
    echo Python 3 is not installed
    echo 'installing... python 3'
    sudo apt-get install python3-pip
fi
sudo pip3 install --upgrade virtualenv 
virtualenv -p /usr/bin/python3 sss-renderer-venv
sss-renderer-venv/bin/pip install flask
sss-renderer-venv/bin/pip install flask-wtf
sss-renderer-venv/bin/pip install -U flask-cors
sss-renderer-venv/bin/pip install pymongo
sss-renderer-venv/bin/pip install bcrypt
sss-renderer-venv/bin/pip install requests
echo '-------setup complete--------'
