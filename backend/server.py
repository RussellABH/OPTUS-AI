from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import load_dotenv
from fastapi.responses import PlainTextResponse
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()  # take environment variables from .env.

app = FastAPI()  # initialize fast api server

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# pulls from .env file (needs to be in directory you run uvicorn from)
CONNECTION_STRING = os.getenv("CONNECTION_STRING")
# Find necessary database collection
client = MongoClient(CONNECTION_STRING)
dbname = client['optus_ai']
rehab_centers = dbname['rehab_centers']


@app.get("/")  # default root
async def root():
    return {"message": "Hello World"}


# test the mongodb server, extract rehab data and display it as text
@app.get("/rehabtest", response_class=PlainTextResponse)
async def db():
    items = rehab_centers.find()  # list of all entries in collection
    item = items[788]  # one entry, dict format
    string = ''
    string += item['name'] + '\n'
    string += item['formatted_address'] + '\n'
    r = 'no rating'
    try:
        r = item['rating']
    except Exception:
        pass
    if r != 'no rating':
        string += str(r) + ' stars \n'
    return string


@app.get("/nearest_rehab")
async def nearestRehab(lat: float, lng: float, limit: int):

    pointer = rehab_centers.find({
        "loc": {
            "$near": {
                "$geometry": {
                    "type": "Point",
                    "coordinates": [lng, lat]
                }
            }
        }
    }).limit(limit)

    data = []
    for i in pointer:
        entry = {}
        entry['name'] = i['b_name']

        entry['address'] = ''
        try:
            entry['address'] = i['formatted_address']
        except Exception:
            pass

        entry['rating'] = ''
        try:
            entry['rating'] = i['rating']
        except Exception:
            pass

        entry['phone_number'] = ''
        try:
            i['formatted_phone_number']
        except Exception:
            pass

        try:
            reviews = []

            for db_review in i['reviews']:
                review = {}
                review['rating'] = db_review['rating']
                review['text'] = db_review['text']
                reviews.append(review)

            entry['reviews'] = reviews
        except Exception:
            pass

        data.append(entry)
    return data

