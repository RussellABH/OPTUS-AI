from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv() # take environment variables from .env.

app = FastAPI() # initialize fast api server

# pulls from .env file
CONNECTION_STRING = os.getenv("CONNECTION_STRING")

# Find necessary database collection from airbnb
client = MongoClient(CONNECTION_STRING)
dbname = client['sample_airbnb']
collection = dbname['listingsAndReviews']

@app.get("/") # default root
async def root():
    return {"message": "Hello World"}

# test the mongodb server, extract airbnb data and display it as text
@app.get("/testdb")
async def db():
    items = collection.find() # list of all entries in collection
    item = items[0] # one entry, dict format
    string = ''
    for key, value in item.items():
        string += "" + str(key) + "" + str(value) + "\n"
    return string