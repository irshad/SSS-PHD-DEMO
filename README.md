# index

Steps to run sss-framework

* Pre-requisites
+ Install Virtual Box with Ubuntu 16.04 
  (If linux is not installed on your machine)
+ MongoDB
+ Python 
+ Flask 

* Setup Database locally
  + Create database "sss-dsl" 
  	use sss-dsl
  + Create collections
  	use user-info
  	use sss-info

1. First run sss-persistance services
   + git clone https://gitlab.com/renarration/prototypes/sss-framework/sss-persistance.git 
   + cd sss-persistance/src
   + bash setup.sh
   + cd venv/scripts/activate
   + python app.py

2. Run sss-maker
   + git clone https://gitlab.com/renarration/prototypes/sss-framework/sss-maker.git
   + cd sss-maker/src/app
   + bash setup.sh
   + cd venv/scripts/activate
   + python app.py
   + CTRL+SHFT+T
   + cd ../webservices
   + bash setup.sh
   + cd venv/scripts/activate
   + python service.py
   + Open browser : http://localhost:8080

3. Run sss-renderer
   + git clone https://gitlab.com/renarration/prototypes/sss-framework/sss-renderer.git
   + cd sss-renderer/src/app
   + bash setup.sh
   + cd venv/bin/activate
   + python app.py
   + CTRL+SHFT+T
   + cd ../webxfrmtn-engine
   + bash setup.sh
   + cd venv/scripts/activate
   + python webxfrmtn-engine-api.py
   + Open browser : http://localhost:8090




