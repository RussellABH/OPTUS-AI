from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import load_dotenv
from fastapi.responses import PlainTextResponse
import os

load_dotenv()  # take environment variables from .env.

app = FastAPI()  # initialize fast api server

# pulls from .env file (needs to be in directory you run uvicorn from)
CONNECTION_STRING = os.getenv("CONNECTION_STRING")
# Find necessary database collection
client = MongoClient(CONNECTION_STRING)
dbname = client['optus_ai']
collection = dbname['rehab_centers']


@app.get("/")  # default root
async def root():
    return {"message": "Hello World"}


# test the mongodb server, extract rehab data and display it as text
@app.get("/rehab", response_class=PlainTextResponse)
async def db():
    items = collection.find()  # list of all entries in collection
    item = items[0]  # one entry, dict format
    string = ''
    string += item['name'] + '\n'
    string += item['formatted_address'] + '\n'
    string += str(item['rating']) + ' stars \n'
    return string
