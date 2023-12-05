# OPTUS-AI
Our goal is to raise awareness on the opioid crisis through creating a one-stop web application that tracks and displays social media discourse using novel Natural Language Processing techniques. 

## Setup
### Frontend
This is a React based web application.
To run it:
- download node.js https://nodejs.org/en
- pull the code from the repo https://github.com/RussellABH/OPTUS-AI
- cd into the optus-ai directory
- type "npm start" to start the application
- the website will open on http://localhost:3000/

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
of how we generated each visualization. If you wish to run them yourself, you will have to download the data and set the file paths \
accordingly. 

### Data
For access to the raw data that we used, please contact Prof. Manikonda: manikl(at)rpi.edu

### FastAPI Backend
Optus-AI runs FastAPI on the backend. To run the server locally, use the command:

```commandline
uvicorn backend.server:app --reload
```

Make sure to run this command in the ./OPTUS-AI directory.
Additionally, have the .env file under the ./OPTUS-AI folder