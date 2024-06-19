from fastapi import FastAPI
from pydantic import BaseModel, RootModel
import firebase_admin
from firebase_admin import credentials, firestore
import uuid
from typing import Dict, List

app = FastAPI()

# Initialize Firebase
cred = credentials.Certificate('faradawn_private_key.json')
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

class DeleteAccountResponse(BaseModel):
    status: str

class UIDModel(BaseModel):
    uid: str

@app.post("/create_user", response_model=CreateUserResponse)
async def create_user(user: User):
    users_ref = db.collection('users')
    # Check if the username already exists
    query = users_ref.where('username', '==', user.username).stream()
    for doc in query:
        return CreateUserResponse(status="already created", uid="none")
    
    # Create new user with username_uuid as document ID
    uid = f"{user.username}_{uuid.uuid4()}"
    users_ref.document(uid).set({
        'username': user.username,
        'password': user.password
    })
    return CreateUserResponse(status="success", uid=uid)

@app.post("/login", response_model=LoginResponse)
async def login(user: User):
    users_ref = db.collection('users')
    # Find the user by username
    query = users_ref.where('username', '==', user.username).stream()
    for doc in query:
        user_data = doc.to_dict()
        if user_data['password'] == user.password:
            return LoginResponse(status="success", uid=doc.id)
    
    return LoginResponse(status="failed", uid="none")

@app.post("/delete_account", response_model=DeleteAccountResponse)
async def delete_account(uid: UIDModel):
    user_ref = db.collection('users').document(uid.uid)
    doc = user_ref.get()
    if doc.exists:
        user_ref.delete()
        return DeleteAccountResponse(status="success")
    else:
        return DeleteAccountResponse(status="failed: user not found")

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

class GardenLoadResponse(BaseModel):
    sunlight: int
    garden_rows: List[GardenRow]

# TODO 01: return a garden matching {uid, course_id}
@app.post("/garden/page_load", response_model=GardenLoadResponse)
async def garden_page_load(request: GardenLoadRequest):
    # If no corresponding garden, create a new one.
    # If found a garden, reutnr the garden.

    # a sample initial garden with all 0
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

    # another sample garden
    sample_garden_rows = [
        GardenRow(id="1", topic="Array", conditions=Condition(easy=3, medium=2, hard=1)),
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

    # delete this below 
    if request.uid == "100":
        response = GardenLoadResponse(
            sunlight=100,
            garden_rows=init_garden_rows
        )
    else:
        response = GardenLoadResponse(
            sunlight=50,  # Assuming a default sunlight value for other users
            garden_rows=sample_garden_rows
        )

    return response



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
    response_data = GardenStealResponse(
        question_id='week1_q1',
        difficulty='easy',
        topic='Array',
        answer='B',
        question='What is Python?',
        options=['A type of snake', 'A programming language', 'A car brand', 'A music brand']
    )
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

# delete account 

