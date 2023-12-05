# OPTUS-AI
Our goal is to raise awareness on the opioid crisis through creating a one-stop web application that tracks and displays social media discourse using novel Natural Language Processing techniques. 

## Organization
`main` branch has the up-to-date website and backend.



### Visualizations
For each visualization, they are each within the `analyis` folder, seperated by the dev who worked on it. 
There is no garunteed organization within each folder, however they are typically a set of jupyter notebooks. They are here for documentation 
of how we generated each visualization. If you wish to run them yourself, you will have to download the data and set the file paths \
accordingly. 

### Data
For access to the raw data that we used, please contact Prof. Manikonda: manikl(at)rpi.edu

### FastAPI and MongoDB Setup
First, navigate to the backend folder and install the required packages using:
```
pip install -r requirements.txt
```
Optus-AI runs FastAPI on the backend. To run the server locally, run the following command in the root directory:
```commandline
uvicorn backend.server:app --reload
```
The following command line messages will specify a link to go to, which leads to the basic endpoint on the local server. To find a list of all endpoints, see the [server.py](backend/server.py) file
#### MongoDB Connection
Edit the .env file and paste in the MongoDB connection string. The database name used for the project is "optus_ai." It is recommended to use MongoDB Atlas to upload and view data.
