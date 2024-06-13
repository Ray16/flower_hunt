from fastapi import FastAPI
from pydantic import BaseModel, RootModel
from typing import Dict, List

app = FastAPI()

# 01 - On page load

class GardenLoadRequest(BaseModel):
    uid: int
    course_id: int

class Condition(BaseModel):
    easy: int
    medium: int
    hard: int

class GardenRow(BaseModel):
    id: int
    topic: str
    conditions: Condition

class GardenLoadResponse(BaseModel):
    sunlight: int
    garden_rows: List[GardenRow]


@app.post("/garden/page_load", response_model=GardenLoadResponse)
async def garden_page_load(request: GardenLoadRequest):
    res_arr = [
        GardenRow(id=1, topic="Array", conditions=Condition(easy=3, medium=0, hard=0)),
        GardenRow(id=2, topic="Linked List", conditions=Condition(easy=0, medium=0, hard=0)),
        GardenRow(id=3, topic="Stack", conditions=Condition(easy=1, medium=1, hard=0)),
        GardenRow(id=4, topic="Queue", conditions=Condition(easy=0, medium=1, hard=0)),
        GardenRow(id=5, topic="Binary Tree", conditions=Condition(easy=2, medium=0, hard=1)),
        GardenRow(id=6, topic="Hash Table", conditions=Condition(easy=0, medium=0, hard=2)),
        GardenRow(id=7, topic="Graph", conditions=Condition(easy=1, medium=0, hard=0)),
        GardenRow(id=8, topic="Heap", conditions=Condition(easy=0, medium=1, hard=1)),
        GardenRow(id=9, topic="Sorting", conditions=Condition(easy=2, medium=1, hard=0)),
        GardenRow(id=10, topic="Dynamic Programming", conditions=Condition(easy=0, medium=2, hard=1))
    ]

    # Sort garden rows by id
    sorted_res_arr = sorted(res_arr, key=lambda x: x.id)

    response = GardenLoadResponse(
        sunlight=100,
        garden_rows=sorted_res_arr
    )
    return response

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

# Receive answer
class SubmitAnswerRequest(BaseModel):
    uid: int
    question_id: str
    response_time: float
    user_answer: str
    correct_answer: str

class SubmitAnswerResponse(BaseModel):
    status: str

@app.post("/garden/submit_answer", response_model=SubmitAnswerResponse)
async def submit_answer(request: SubmitAnswerRequest):
    response_data = SubmitAnswerResponse(
        status='success'
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


## Select Neighbor Screen

class SelectNeighborRequest(BaseModel):
    uid: int
    course_id: int

class SelectNeighborItem(BaseModel):
    uid: int
    username: str
    total_flowers: int

class SelectNeighborResponse(RootModel[List[SelectNeighborItem]]):
    pass

@app.post("/select_neighbor", response_model=SelectNeighborResponse)
async def courses_page(request: SelectNeighborRequest):
    res_arr = [
        SelectNeighborItem(uid=102, username='Faradawn', total_flowers=100),
        SelectNeighborItem(uid=102, username='Mike', total_flowers=10),
        SelectNeighborItem(uid=102, username='Ray', total_flowers=5),
    ]
    return SelectNeighborResponse(root=res_arr)