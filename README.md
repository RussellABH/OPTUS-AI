# OPTUS-AI
Our goal is to raise awareness on the opioid crisis through creating a one-stop web application that tracks and displays social media discourse using novel Natural Language Processing techniques. 

Please see the presentation, `OPTUS-AI Presentation.pptx`, for a brief overview of the work we did this semester.

## Setup
### Frontend
This is a React based web application.
To run it:
- download node.js https://nodejs.org/en
- pull the code from the repo https://github.com/RussellABH/OPTUS-AI
- cd into the optus-ai directory
- type "npm start" to start the application
- the website will open on http://localhost:3000/

### FastAPI and MongoDB
First, navigate to the backend folder and install the required packages using:
```
pip install -r requirements.txt
```
Optus-AI runs FastAPI on the backend. To run the server locally, run the following command in the root directory:
```commandline
uvicorn backend.server:app --reload
```
The following command line messages will specify a link to go to, which leads to the basic endpoint on the local server.

#### MongoDB Connection
Edit the .env file and paste in the MongoDB connection string. It is recommended to use MongoDB Atlas to upload and view data.


## Organization
### Frontend
`main` branch has the up-to-date website and backend.
Html files for data visualizations are stored in "public/graphs".
These files have an equivalent component in "src/components" so that they can be imported into Home.js.
Images & logos stored in "public/images".
Each page on the site has it's .js and .css file stored in "src".
january.json is included as a temporary solution to get data for the Frequencies Per Month visualization.
Home.js should eventually be able to make an api call based on the 2 dropdown buttons to retrieve the data for a given month in a given year.


### Visualizations
For each visualization, they are each within the `analyis` folder, seperated by the dev who worked on it. 
There is no garunteed organization within each folder, however they are typically a set of jupyter notebooks. They are here for documentation 
and to help others who wish to create their own. If you wish to run them yourself, you will have to download the data and set the file paths
accordingly. 

### Data
The raw data is hosted on a Box folder. For access, please contact Prof. Manikonda: manikl(at)rpi.edu. To generate the opioid data for drugs_forum, please see the README file under analysis folder.

### Backend
To find a list of all endpoints, see the [server.py](backend/server.py) file.

The MongoDB database used for this project is called "optus-ai." For the geolocation feature mapping a user's latitude and
longitude to a city, there is an "index" in our database created specifically for this feature.