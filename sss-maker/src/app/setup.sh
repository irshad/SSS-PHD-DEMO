
if command -v python3 &>/dev/null; then
    echo Python 3 is installed
else
    echo Python 3 is not installed
    echo "installing... python 3"
    sudo apt-get install python3-pip
fi
sudo pip3 install --upgrade virtualenv 
virtualenv -p /usr/bin/python3 sss-maker-venv
sss-maker-venv/bin/pip install flask
sss-maker-venv/bin/pip install flask-wtf
sss-maker-venv/bin/pip install -U flask-cors
sss-maker-venv/bin/pip install pymongo
sss-maker-venv/bin/pip install bcrypt
sss-maker-venv/bin/pip install lxml
echo "-------setup complete--------"
