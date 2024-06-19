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
    user_email: str

class UserLogin(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    status: str
    uid: str

class CreateUserResponse(BaseModel):
    status: str
    uid: str

# Just use Status so frontend can save time instead of interpreting
# what's going on. 
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
    # set is "add" 
    users_ref.document(uid).set({
        'username': user.username,
        'password': user.password,
        'user_email': user.user_email
    })
    return CreateUserResponse(status="success", uid=uid)

@app.post("/login", response_model=LoginResponse)
async def login(userlog: UserLogin):
    users_ref = db.collection('users')
    # Find the user by username, stream can let it go over the collection. 
    query = users_ref.where('username', '==', userlog.username).stream()
    for doc in query:
        user_data = doc.to_dict()
        if user_data['password'] == userlog.password:
            return LoginResponse(status="Successfully logged in", uid=doc.id)
        else:
            # Don't let them know the uid at all
            return LoginResponse(status="Wrong Password", uid="none")
    
    return LoginResponse(status="Please create an account first", uid="none")

@app.post("/delete_account", response_model=DeleteAccountResponse)
async def delete_account(uid: UIDModel):
    # try delete everything else along, and only if you are a user you can delete

    # delete from users
    user_ref = db.collection('users').document(uid.uid)
    doc = user_ref.get()

    #delete from gardens
    gard_ref = db.collection('gardens').document(uid.uid)
    doc_g = gard_ref.get()

    # It must first exist in users
    if doc.exists:
        user_ref.delete()
        # now check if user has a garden record
        if doc_g.exists:
            gard_ref.delete()
            return DeleteAccountResponse(status="Deleted both user and user's garden")
        else:
            return DeleteAccountResponse(status="Deleted user yet the user has no garden at all")
    else:
        return DeleteAccountResponse(status="failed: user not found")

# 01 - On page load
# The user wants to get the garden that recorded what he did, the progress
# It might have records in several courses. 
class GardenLoadRequest(BaseModel):
    uid: str
    course_id: str

# How many points you got? 
class Condition(BaseModel):
    easy: int       # how many flowers I stole
    medium: int
    hard: int

class Questions(BaseModel):
    q1_id: str
    q2_id: str
    q3_id: str

# the information of each row
class GardenRow(BaseModel):
    row_num: str 
    topic: str      
    conditions: Condition
    questions: Questions

# A user has many gardens, depending on how many courses the user is taking
class Garden(BaseModel):
    course_id: str
    sunlight: int   # this is important because we want more sunlight. 
    garden_rows: List[GardenRow]


class GardenLoadResponse(BaseModel):
    status: str
    garden: Garden

# TODO 01: return a garden matching {uid, course_id}
@app.post("/garden/page_load", response_model=GardenLoadResponse)
async def garden_page_load(request: GardenLoadRequest):
    # grad the topics from course to prepare the initial garden
    # knowing the topics, we can pick some questions

    # Sample initial garden with all 0
    init_garden_rows = [
        # Haoran; just hard coded the first row, so I can test with it later. 
        GardenRow(row_num="1", topic="Array", conditions=Condition(easy=0, medium=0, hard=0), questions = Questions(q1_id = "SxGy1eypKa7Wq31BXuPd", q2_id = "PaUxnUASEMQueBuFH1BR", q3_id = "tEehF1V0svY8Hi8jkt24")),
        GardenRow(row_num="2", topic="Linked List", conditions=Condition(easy=0, medium=0, hard=0), questions = Questions(q1_id = "none", q2_id = "none", q3_id = "none")),
        GardenRow(row_num="3", topic="Stack", conditions=Condition(easy=0, medium=0, hard=0), questions = Questions(q1_id = "none", q2_id = "none", q3_id = "none")),
        GardenRow(row_num="4", topic="Queue", conditions=Condition(easy=0, medium=0, hard=0), questions = Questions(q1_id = "none", q2_id = "none", q3_id = "none")),
        GardenRow(row_num="5", topic="Binary Tree", conditions=Condition(easy=0, medium=0, hard=0), questions = Questions(q1_id = "none", q2_id = "none", q3_id = "none")),
        GardenRow(row_num="6", topic="Hash Table", conditions=Condition(easy=0, medium=0, hard=0), questions = Questions(q1_id = "none", q2_id = "none", q3_id = "none")),
        GardenRow(row_num="7", topic="Graph", conditions=Condition(easy=0, medium=0, hard=0), questions = Questions(q1_id = "none", q2_id = "none", q3_id = "none")),
        GardenRow(row_num="8", topic="Heap", conditions=Condition(easy=0, medium=0, hard=0), questions = Questions(q1_id = "none", q2_id = "none", q3_id = "none")),
        GardenRow(row_num="9", topic="Sorting", conditions=Condition(easy=0, medium=0, hard=0), questions = Questions(q1_id = "none", q2_id = "none", q3_id = "none")),
        GardenRow(row_num="10", topic="Dynamic Programming", conditions=Condition(easy=0, medium=0, hard=0), questions = Questions(q1_id = "none", q2_id = "none", q3_id = "none"))
    ]

    # Haoran: for now just let it be document('Software_Engineer_123'), later use 
    # request.course_id once we can add courses with course_id
    # course_ref = db.collection('courses').document('Software_Engineer_123')
    # doc_c = course_ref.get()
    # # if the user
    # if doc_c.exists:
    #     # we have such course, iterate through the 
    #     course_data = doc_c.to_dict()
    #     course_data['course_topics']
    #     # TODO: write a for loop to fill out the information and randomly pick 
    #     # some questions for each level condition
    # else:
    #     return GardenLoadResponse(status="We don't have the course", garden=None)
    # And remember, we only start the rest if the course exists for the user. 
    # For now we assume we have the course and only 1 course

    # Get the reference to the user's document
    # Mike_9809229e-f7e1-4499-aa96-a43baa058572
    # Software_Engineer_123
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
    my_uid: str        # who am I
    his_uid: str        # who I'm stealing form 
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
        answer='A',
        question='1768. You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string. Return the merged string.',
        options=[
            'Use two pointers, one for each string, to iterate through the strings in alternating order.',
            'Convert the strings to lists, concatenate the lists, and then convert back to a string.',
            'Use a single loop to iterate through the shorter string and append the remaining characters of the longer string.',
            'Use recursion to merge the strings, with each recursive call merging one character from each string.'
        ]
    )

    # try fetch a question from the questions database and return
    user_ref = db.collection('questions').document(request.uid)
    doc = user_ref.get()
    

    return response_data

# Receive answer
class SubmitAnswerRequest(BaseModel):
    uid: str
    neighbor_uid: str
    course_id: str          
    question_id: str        
    user_answer: str        
    correct_answer: str     # we probably know this when user asked for a question

class SubmitAnswerResponse(BaseModel):
    status: str

# TODO 03: put this record into Firebase. 
# If user is correct, deduct the neighbor's plant and add to user's garden.
@app.post("/garden/submit_answer", response_model=SubmitAnswerResponse)
async def submit_answer(request: SubmitAnswerRequest):
    # 2 cases, 
    # 1st we got it right, we want to add a flower to us and deduct
    # a flower from the neighbor. 
    # 2nd we got it wrong, nothing changes, just return

    if request.correct_answer==request.user_answer:
        # now we got it right, need to update the garden of both
        # first add 1 to our garden
        garden_ref = db.collection('gardens').document(request.uid)
        doc_my_g = garden_ref.get()
        user_data = doc_my_g.to_dict()
        courses = user_data.get('courses', {})
        course_data = courses[request.course_id]
        garden_rows = course_data['garden_rows']
        for row in garden_rows:
            if row['questions']['q1_id']== request.question_id:
                row['conditions']['easy'] += 1
            if row['questions']['q2_id']== request.question_id:
                row['conditions']['medium'] += 1
            if row['questions']['q3_id']== request.question_id:
                row['conditions']['hard'] += 1
        garden_ref.update({'courses': courses})

        # now deduct 1 from the neighbor, same thing
        garden_ref = db.collection('gardens').document(request.neighbor_uid)
        doc_my_g = garden_ref.get()
        user_data = doc_my_g.to_dict()
        courses = user_data.get('courses', {})
        course_data = courses[request.course_id]
        garden_rows = course_data['garden_rows']
        for row in garden_rows:
            if row['questions']['q1_id']== request.question_id:
                row['conditions']['easy'] -= 1
            if row['questions']['q2_id']== request.question_id:
                row['conditions']['medium'] -= 1
            if row['questions']['q3_id']== request.question_id:
                row['conditions']['hard'] -= 1
        garden_ref.update({'courses': courses})
        
        # now you got it right, and you should have 1 extra point in your garden now. 
        return SubmitAnswerResponse(status = "You got it right!")
    else:
        return SubmitAnswerResponse(status = "You got it wrong!")


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
    uid: str        # Me
    course_id: str  # The course I'm in 

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


