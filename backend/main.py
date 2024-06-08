from fastapi import FastAPI
from pydantic import BaseModel, RootModel
from typing import List

app = FastAPI()

# Define request model
class PageLoadRequest(BaseModel):
    uid: int
    course_id: int

# Define response models
class GardenStatus(BaseModel):
    active: bool
    conditions: List[int]
    gain: int

class PageLoadResponse(RootModel[List[GardenStatus]]):
    pass

# 01 - On page load
@app.post("/garden/page_load", response_model=PageLoadResponse)
async def garden_page_load(request: PageLoadRequest):
    sample_garden_status = [
        GardenStatus(active=True, conditions=[1, 0, 1, 0], gain=8),
        GardenStatus(active=False, conditions=[1, 0, 1, 0], gain=8)
    ]
    return PageLoadResponse(root=sample_garden_status)

@app.post("/garden/steal")
async def garden_steal(uid: int, course_id: int, week: int):
    return {question: "he"}