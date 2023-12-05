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

### FastAPI Backend
Optus-AI runs FastAPI on the backend. To run the server locally, use the command:

```commandline
uvicorn backend.server:app --reload
```

Make sure to run this command in the ./OPTUS-AI directory.
Additionally, have the .env file under the ./OPTUS-AI folder