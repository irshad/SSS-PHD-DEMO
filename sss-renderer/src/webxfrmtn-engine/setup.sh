
if command -v python3 &>/dev/null; then
    echo Python 3 is installed
else
    echo Python 3 is not installed
    echo "installing... python 3"
    sudo apt-get install python3-pip
fi
sudo pip3 install --upgrade virtualenv 
virtualenv -p /usr/bin/python3 venv
venv/bin/pip install -r requirements.txt
echo "-------setup complete--------"
