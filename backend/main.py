from fastapi import FastAPI
from pydantic import BaseModel, RootModel
import firebase_admin
from firebase_admin import credentials, firestore
import uuid
from typing import Dict, List

app = FastAPI()

# Initialize Firebase
cred = credentials.Certificate('mike-secret-key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Models
class User(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    status: str
    uid: str

class CreateUserResponse(BaseModel):
    status: str
    uid: str

@app.post("/create_user", response_model=CreateUserResponse)
async def create_user(user: User):
    user_ref = db.collection('users').document(user.username)
    doc = user_ref.get()
    if doc.exists:
        return CreateUserResponse(status="already created", uid="none")
    else:
        uid = str(uuid.uuid4())
        user_ref.set({
            'username': user.username,
            'password': user.password,
            'uid': uid
        })
        return CreateUserResponse(status="success", uid=uid)

@app.post("/login", response_model=LoginResponse)
async def login(user: User):
    user_ref = db.collection('users').document(user.username)
    doc = user_ref.get()
    if doc.exists and doc.to_dict().get('password') == user.password:
        return LoginResponse(status="success", uid=doc.to_dict().get('uid'))
    else:
        return LoginResponse(status="failed", uid="none")

# 01 - On page load

class GardenLoadRequest(BaseModel):
    uid: str
    course_id: str

class Condition(BaseModel):
    easy: int
    medium: int
    hard: int

class GardenRow(BaseModel):
    id: str
    topic: str
    conditions: Condition

class Garden(BaseModel):
    course_id: str
    sunlight: int
    garden_rows: List[GardenRow]

class GardenLoadResponse(BaseModel):
    status: str
    garden: Garden

# TODO 01: return a garden matching {uid, course_id}
@app.post("/garden/page_load", response_model=GardenLoadResponse)
async def garden_page_load(request: GardenLoadRequest):
    # Sample initial garden with all 0
    init_garden_rows = [
        GardenRow(id="1", topic="Array", conditions=Condition(easy=0, medium=0, hard=0)),
        GardenRow(id="2", topic="Linked List", conditions=Condition(easy=0, medium=0, hard=0)),
        GardenRow(id="3", topic="Stack", conditions=Condition(easy=0, medium=0, hard=0)),
        GardenRow(id="4", topic="Queue", conditions=Condition(easy=0, medium=0, hard=0)),
        GardenRow(id="5", topic="Binary Tree", conditions=Condition(easy=0, medium=0, hard=0)),
        GardenRow(id="6", topic="Hash Table", conditions=Condition(easy=0, medium=0, hard=0)),
        GardenRow(id="7", topic="Graph", conditions=Condition(easy=0, medium=0, hard=0)),
        GardenRow(id="8", topic="Heap", conditions=Condition(easy=0, medium=0, hard=0)),
        GardenRow(id="9", topic="Sorting", conditions=Condition(easy=0, medium=0, hard=0)),
        GardenRow(id="10", topic="Dynamic Programming", conditions=Condition(easy=0, medium=0, hard=0))
    ]

    # Get the reference to the user's document
    user_ref = db.collection('gardens').document(request.uid)
    doc = user_ref.get()

    # Check if the user document exists
    if doc.exists:
        user_data = doc.to_dict()
        courses = user_data.get('courses', {})

        if request.course_id in courses:
            # The user already has this course, return the existing garden
            course_data = courses[request.course_id]
            garden = Garden(
                course_id=request.course_id,
                sunlight=course_data['sunlight'],
                garden_rows=course_data['garden_rows']
            )
            return GardenLoadResponse(status="Old user, old course", garden=garden)
        else:
            # The user does not have this course yet, add a new garden for the course
            courses[request.course_id] = {
                'sunlight': 50,
                'garden_rows': [row.dict() for row in init_garden_rows]
            }
            user_ref.update({'courses': courses})
            garden = Garden(
                course_id=request.course_id,
                sunlight=50,
                garden_rows=init_garden_rows
            )
            return GardenLoadResponse(status="Old user, new course", garden=garden)
    else:
        # The user has no gardens at all, create a brand new one for the user
        user_ref.set({
            'courses': {
                request.course_id: {
                    'sunlight': 50,
                    'garden_rows': [row.dict() for row in init_garden_rows]
                }
            }
        })
        garden = Garden(
            course_id=request.course_id,
            sunlight=50,
            garden_rows=init_garden_rows
        )
        return GardenLoadResponse(status="New user, new course", garden=garden)

# 02 - On garden steal

class GardenStealRequest(BaseModel):
    uid: str
    course_id: str
    topic: str
    difficulty: str

class GardenStealResponse(BaseModel):
    question_id: str
    difficulty: str
    topic: str
    answer: str
    question: str
    options: List[str]

# TODO 02: return a question (for now, just put some random questions in firebase)
@app.post("/garden/steal", response_model=GardenStealResponse)
async def garden_steal(request: GardenStealRequest):
    # below is just an example
    response_data = GardenStealResponse(
        question_id='week1_q1',
        difficulty='easy',
        topic='Array',
        answer='B',
        question='What is Python?',
        options=['A type of snake', 'A programming language', 'A car brand', 'A music brand']
    )

    # Haoran: just return any question by the id
    # user_ref = db.collection('gardens').document(request.question_id)
    # doc = user_ref.get()

    return response_data

# Receive answer
class SubmitAnswerRequest(BaseModel):
    uid: str
    neighbor_uid: str
    course_id: str
    question_id: str
    response_time: float
    user_answer: str
    correct_answer: str

class SubmitAnswerResponse(BaseModel):
    status: str

# TODO 03: put this record into Firebase. 
# If user is correct, deduct the neighbor's plant and add to user's garden.
@app.post("/garden/submit_answer", response_model=SubmitAnswerResponse)
async def submit_answer(request: SubmitAnswerRequest):
    response_data = SubmitAnswerResponse(
        status='success'
    )
    return response_data


# Courses Screen
class CoursesRequest(BaseModel):
    uid: str

class CoursesItem(BaseModel):
    course_id: str
    course_name: str

class CoursesResponse(RootModel[List[CoursesItem]]):
    pass

# 03 - Courses
@app.post("/courses", response_model=CoursesResponse)
async def courses_page(request: CoursesRequest):
    res_arr = [
        CoursesItem(course_id="101", course_name='Software Engineering'),
        CoursesItem(course_id="102", course_name='Data Science'),
    ]
    return CoursesResponse(root=res_arr)


## Select Neighbor Screen

class SelectNeighborRequest(BaseModel):
    uid: str
    course_id: str

class SelectNeighborItem(BaseModel):
    uid: str
    username: str
    total_flowers: int

class SelectNeighborResponse(RootModel[List[SelectNeighborItem]]):
    pass

@app.post("/select_neighbor", response_model=SelectNeighborResponse)
async def courses_page(request: SelectNeighborRequest):
    res_arr = [
        SelectNeighborItem(uid=str(uuid.uuid4()), username='Faradawn', total_flowers=100),
        SelectNeighborItem(uid=str(uuid.uuid4()), username='Mike', total_flowers=10),
        SelectNeighborItem(uid=str(uuid.uuid4()), username='Ray', total_flowers=5),
        SelectNeighborItem(uid=str(uuid.uuid4()), username='Alice', total_flowers=15),
        SelectNeighborItem(uid=str(uuid.uuid4()), username='Bob', total_flowers=20),
        SelectNeighborItem(uid=str(uuid.uuid4()), username='Charlie', total_flowers=25),
        SelectNeighborItem(uid=str(uuid.uuid4()), username='David', total_flowers=30),
        SelectNeighborItem(uid=str(uuid.uuid4()), username='Eve', total_flowers=35),
        SelectNeighborItem(uid=str(uuid.uuid4()), username='Frank', total_flowers=40),
        SelectNeighborItem(uid=str(uuid.uuid4()), username='Grace', total_flowers=45),
    ]
    return SelectNeighborResponse(root=res_arr)


# gardens

