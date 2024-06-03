from fastapi import FastAPI
from sql_app import *

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

# create a database

# update a database

# write to a database

# read from a database
