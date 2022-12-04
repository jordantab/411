# 411
CS411 Group Project

Activate virtual environment(not required)

Linux：

sudo apt-get install python3-venv    # If needed
python3 -m venv .venv
source .venv/bin/activate

macOS

python3 -m venv .venv
source .venv/bin/activate

Windows

py -3 -m venv .venv
.venv\scripts\activate

run "python manage.py runserver" to start the backend first 

cd frontend

npm start

football folder is the project folder, the views.py inside that folder contains the 
function(get_match_data) that retrieves user inputs from frontend and fetch the result from calling multiple apis. 

#this current version is fully functioning, which can correctly display all the search results. 
