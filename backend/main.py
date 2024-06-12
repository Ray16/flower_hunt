from fastapi import FastAPI
from pydantic import BaseModel, RootModel
from typing import List

app = FastAPI()

# 01 - On page load

class GardenLoadRequest(BaseModel):
    uid: int
    course_id: int

class GardenRow(BaseModel):
    week: int
    active: bool
    conditions: List[int]
    gain: int

class GardenLoadResponse(RootModel[List[GardenRow]]):
    pass


@app.post("/garden/page_load", response_model=GardenLoadResponse)
async def garden_page_load(request: GardenLoadRequest):
    res_arr = [
        GardenRow(week=1, active=True, conditions=[1, 0, 1, 0], gain=8),
        GardenRow(week=2, active=False, conditions=[1, 0, 1, 0], gain=0),
        GardenRow(week=3, active=False, conditions=[1, 0, 1, 0], gain=0),
        GardenRow(week=4, active=False, conditions=[1, 0, 1, 0], gain=0),
        GardenRow(week=5, active=False, conditions=[1, 0, 1, 0], gain=0),
        GardenRow(week=6, active=False, conditions=[1, 0, 1, 0], gain=0),
        GardenRow(week=7, active=False, conditions=[1, 0, 1, 0], gain=0),
        GardenRow(week=8, active=False, conditions=[1, 0, 1, 0], gain=0),
        GardenRow(week=9, active=False, conditions=[1, 0, 1, 0], gain=0),
        GardenRow(week=10, active=False, conditions=[1, 0, 1, 0], gain=0)
        
    ]
    return GardenLoadResponse(root=res_arr)

# 02 - On garden steal

class GardenStealRequest(BaseModel):
    uid: int
    course_id: int
    week: int

class GardenStealResponse(BaseModel):
    question_id: str
    chapter: str
    answer: str
    difficulty: str
    question: str
    options: List[str]

@app.post("/garden/steal", response_model=GardenStealResponse)
async def garden_steal(request: GardenStealRequest):
    response_data = GardenStealResponse(
        question_id='week1_q1',
        chapter='1',
        answer='B',
        difficulty='easy',
        question='What is Python?',
        options=['A type of snake', 'A programming language', 'A car brand', 'A music brand']
    )
    return response_data

# Courses Screen
class CoursesRequest(BaseModel):
    uid: int

class CoursesItem(BaseModel):
    course_id: int
    course_name: str

class CoursesResponse(RootModel[List[CoursesItem]]):
    pass

# 03 - Courses
@app.post("/courses", response_model=CoursesResponse)
async def courses_page(request: CoursesRequest):
    res_arr = [
        CoursesItem(course_id=101, course_name='Software Engineering'),
        CoursesItem(course_id=102, course_name='Data Science'),
    ]
    return CoursesResponse(root=res_arr)
