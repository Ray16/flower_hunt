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

class UserLogin(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    status: str
    message: str
    uid: str

class CreateUserResponse(BaseModel):
    status: str
    message: str
    uid: str

class DeleteAccountResponse(BaseModel):
    status: str
    message: str

class UIDModel(BaseModel):
    uid: str

@app.post("/create_user", response_model=CreateUserResponse)
async def create_user(user: User):
    users_ref = db.collection('users')
    query = users_ref.where('username', '==', user.username).stream()
    for doc in query:
        return CreateUserResponse(status="failed", message="Username already exists", uid="none")
    
    uid = f"{user.username}_{uuid.uuid4()}"
    users_ref.document(uid).set({
        'username': user.username,
        'password': user.password
    })
    return CreateUserResponse(status="success", message="User created successfully", uid=uid)

@app.post("/login", response_model=LoginResponse)
async def login(userlog: UserLogin):
    users_ref = db.collection('users')
    query = users_ref.where('username', '==', userlog.username).stream()
    for doc in query:
        user_data = doc.to_dict()
        if user_data['password'] == userlog.password:
            return LoginResponse(status="success", message="Successfully logged in", uid=doc.id)
        else:
            return LoginResponse(status="failed", message="Wrong password", uid="none")
    
    return LoginResponse(status="failed", message="Please create an account first", uid="none")

@app.post("/delete_account", response_model=DeleteAccountResponse)
async def delete_account(uid: UIDModel):
    user_ref = db.collection('users').document(uid.uid)
    doc = user_ref.get()

    gard_ref = db.collection('gardens').document(uid.uid)
    doc_g = gard_ref.get()

    if doc.exists:
        user_ref.delete()
        if doc_g.exists:
            gard_ref.delete()
            return DeleteAccountResponse(status="success", message="Deleted both user and user's garden")
        else:
            return DeleteAccountResponse(status="success", message="Deleted user but no garden found")
    else:
        return DeleteAccountResponse(status="failed", message="User not found")

class GardenLoadRequest(BaseModel):
    uid: str
    course_id: str

class Condition(BaseModel):
    easy: int
    medium: int
    hard: int

class Questions(BaseModel):
    q1_id: str
    q2_id: str
    q3_id: str

class GardenRow(BaseModel):
    row_num: str 
    topic: str      
    conditions: Condition
    questions: Questions

class Garden(BaseModel):
    course_id: str
    sunlight: int
    garden_rows: List[GardenRow]

class GardenLoadResponse(BaseModel):
    status: str
    message: str
    garden: Garden

@app.post("/garden/page_load", response_model=GardenLoadResponse)
async def garden_page_load(request: GardenLoadRequest):
    init_garden_rows = [
        GardenRow(row_num="1", topic="Array", conditions=Condition(easy=0, medium=0, hard=0), questions=Questions(q1_id="none", q2_id="none", q3_id="none")),
        GardenRow(row_num="2", topic="Linked List", conditions=Condition(easy=0, medium=0, hard=0), questions=Questions(q1_id="none", q2_id="none", q3_id="none")),
        GardenRow(row_num="3", topic="Stack", conditions=Condition(easy=0, medium=0, hard=0), questions=Questions(q1_id="none", q2_id="none", q3_id="none")),
        GardenRow(row_num="4", topic="Queue", conditions=Condition(easy=0, medium=0, hard=0), questions=Questions(q1_id="none", q2_id="none", q3_id="none")),
        GardenRow(row_num="5", topic="Binary Tree", conditions=Condition(easy=0, medium=0, hard=0), questions=Questions(q1_id="none", q2_id="none", q3_id="none")),
        GardenRow(row_num="6", topic="Hash Table", conditions=Condition(easy=0, medium=0, hard=0), questions=Questions(q1_id="none", q2_id="none", q3_id="none")),
        GardenRow(row_num="7", topic="Graph", conditions=Condition(easy=0, medium=0, hard=0), questions=Questions(q1_id="none", q2_id="none", q3_id="none")),
        GardenRow(row_num="8", topic="Heap", conditions=Condition(easy=0, medium=0, hard=0), questions=Questions(q1_id="none", q2_id="none", q3_id="none")),
        GardenRow(row_num="9", topic="Sorting", conditions=Condition(easy=0, medium=0, hard=0), questions=Questions(q1_id="none", q2_id="none", q3_id="none")),
        GardenRow(row_num="10", topic="Dynamic Programming", conditions=Condition(easy=0, medium=0, hard=0), questions=Questions(q1_id="none", q2_id="none", q3_id="none"))
    ]

    user_ref = db.collection('gardens').document(request.uid)
    doc = user_ref.get()

    if doc.exists:
        user_data = doc.to_dict()
        courses = user_data.get('courses', {})

        if request.course_id in courses:
            # only in this case we need to recalculate the total sunlight because
            # our flower might have been stolen, all other cases just get a new garden
            course_data = courses[request.course_id]

            # let's calculate the total sum of sunlight here
            total_sunlight = 0
            for row in course_data['garden_rows']:
                total_sunlight += row['conditions']['easy']*50+row['conditions']['medium']*100+row['conditions']['hard']*200            

            garden = Garden(
                course_id=request.course_id,
                sunlight=total_sunlight,
                garden_rows=course_data['garden_rows']
            )
            return GardenLoadResponse(status="success", message="Old user, old course", garden=garden)
        else:
            courses[request.course_id] = {
                'sunlight': 0,
                'garden_rows': [row.dict() for row in init_garden_rows]
            }
            user_ref.update({'courses': courses})
            garden = Garden(
                course_id=request.course_id,
                sunlight=0,
                garden_rows=init_garden_rows
            )
            return GardenLoadResponse(status="success", message="Old user, new course", garden=garden)
    else:
        user_ref.set({
            'courses': {
                request.course_id: {
                    'sunlight': 0,
                    'garden_rows': [row.dict() for row in init_garden_rows]
                }
            }
        })
        garden = Garden(
            course_id=request.course_id,
            sunlight=0,
            garden_rows=init_garden_rows
        )
        return GardenLoadResponse(status="success", message="New user, new course", garden=garden)

class GardenStealRequest(BaseModel):
    my_uid: str
    neighbor_uid: str
    course_id: str  
    topic: str
    difficulty: str

class GardenStealResponse(BaseModel):
    status: str
    message: str
    question_id: str    
    difficulty: str
    topic: str
    answer: str
    question: str
    question_number: str
    options: List[str]

@app.post("/garden/steal", response_model=GardenStealResponse)
async def garden_steal(request: GardenStealRequest):
    response_data = GardenStealResponse(
        status="success",
        message="Placeholder question",
        question_id='week1_q1',
        difficulty='easy',
        topic='Array',
        answer='A',
        question='You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string. Return the merged string.',
        question_number='1768',
        options=[
            'Use two pointers, one for each string, to iterate through the strings in alternating order.',
            'Convert the strings to lists, concatenate the lists, and then convert back to a string.',
            'Use a single loop to iterate through the shorter string and append the remaining characters of the longer string.',
            'Use recursion to merge the strings, with each recursive call merging one character from each string.'
        ]
    )

    garden_ref = db.collection('gardens').document(request.neighbor_uid)
    doc_g = garden_ref.get()
    
    neighbor_garden = doc_g.to_dict()
    courses = neighbor_garden.get('courses', {})
    course_data = courses[request.course_id]
    garden_rows = course_data['garden_rows']
    
    question_id = None
    for row in garden_rows:
        if row['topic'] == request.topic:
            if request.difficulty == "easy":
                question_id = row["questions"]['q1_id']
                break
            elif request.difficulty == "medium":
                question_id = row["questions"]['q2_id']
                break
            elif request.difficulty == "hard":
                question_id = row["questions"]['q3_id']
                break

    question_ref = db.collection('questions').document(question_id)
    doc_q = question_ref.get()
    
    if doc_q.exists:
        question_data = doc_q.to_dict()
        response_data = GardenStealResponse(
            status="success",
            message="Got the question",
            question_id=question_id,
            difficulty=question_data['difficulty'],
            topic=question_data['topic'],
            answer=question_data['answer'],
            question=question_data['question'],
            question_number=question_data['question_number'],
            options=question_data['options']
        )
    else:
        response_data.message = f"Question id {question_id}, doc not found"

    return response_data

class SubmitAnswerRequest(BaseModel):
    uid: str
    neighbor_uid: str
    course_id: str          
    question_id: str        
    user_answer: str        
    correct_answer: str     

class SubmitAnswerResponse(BaseModel):
    status: str
    message: str

@app.post("/garden/submit_answer", response_model=SubmitAnswerResponse)
async def submit_answer(request: SubmitAnswerRequest):
    if request.correct_answer == request.user_answer:
        garden_ref = db.collection('gardens').document(request.uid)
        doc_my_g = garden_ref.get()
        user_data = doc_my_g.to_dict()

        courses = user_data.get('courses', {})
        course_data = courses[request.course_id]
        garden_rows = course_data['garden_rows']

        for row in garden_rows:
            if row['questions']['q1_id'] == request.question_id:
                row['conditions']['easy'] += 1
                break
            if row['questions']['q2_id'] == request.question_id:
                row['conditions']['medium'] += 1
                break
            if row['questions']['q3_id'] == request.question_id:
                row['conditions']['hard'] += 1
                break
        garden_ref.update({'courses': courses})

        garden_ref = db.collection('gardens').document(request.neighbor_uid)
        doc_my_g = garden_ref.get()
        user_data = doc_my_g.to_dict()
        courses = user_data.get('courses', {})
        course_data = courses[request.course_id]
        garden_rows = course_data['garden_rows']

        for row in garden_rows:
            if row['questions']['q1_id'] == request.question_id:
                row['conditions']['easy'] = max(0, row['conditions']['easy'] - 1)
                break
            if row['questions']['q2_id'] == request.question_id:
                row['conditions']['medium'] = max(0, row['conditions']['medium'] - 1)
                break
            if row['questions']['q3_id'] == request.question_id:
                row['conditions']['hard'] = max(0, row['conditions']['hard'] - 1)
                break
        garden_ref.update({'courses': courses})
        
        return SubmitAnswerResponse(status="success", message="You got it right!")
    else:
        return SubmitAnswerResponse(status="failed", message="You got it wrong!")

class CoursesRequest(BaseModel):
    uid: str

class CoursesItem(BaseModel):
    course_id: str
    course_name: str

class CoursesResponse(RootModel[List[CoursesItem]]):
    pass

@app.post("/courses", response_model=CoursesResponse)
async def courses_page(request: CoursesRequest):
    courses_ref = db.collection('courses')
    query = courses_ref.stream()
    res_arr = []
    for doc in query:
        course_data = doc.to_dict()
        res_arr.append(CoursesItem(course_id=course_data['course_id'], course_name=course_data['course_name']))
    return CoursesResponse(root=res_arr)

# Select Neighbor
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
async def select_neighbor(request: SelectNeighborRequest):
    # TODO: 1) fetch from firebase gardens collection and garden_id, include the ones with matching course_id
    # 2) for each item, change total_flowers to sunlight, also add neighbor_id field
    # res_arr = [
    #     SelectNeighborItem(uid=str(uuid.uuid4()), username='Fara_1', total_flowers=100),
    #     SelectNeighborItem(uid=str(uuid.uuid4()), username='Mike', total_flowers=10),
    #     SelectNeighborItem(uid=str(uuid.uuid4()), username='Ray', total_flowers=5),
    #     SelectNeighborItem(uid=str(uuid.uuid4()), username='Alice', total_flowers=15),
    #     SelectNeighborItem(uid=str(uuid.uuid4()), username='Bob', total_flowers=20),
    #     SelectNeighborItem(uid=str(uuid.uuid4()), username='Charlie', total_flowers=25),
    #     SelectNeighborItem(uid=str(uuid.uuid4()), username='David', total_flowers=30),
    #     SelectNeighborItem(uid=str(uuid.uuid4()), username='Eve', total_flowers=35),
    #     SelectNeighborItem(uid=str(uuid.uuid4()), username='Frank', total_flowers=40),
    #     SelectNeighborItem(uid=str(uuid.uuid4()), username='Grace', total_flowers=45),
    # ]
    res_arr = []

    # Fetch users from the 'gardens' collection
    gardens_ref = db.collection('gardens')
    query = gardens_ref.stream()

    for doc in query:
        garden_data = doc.to_dict()
        uid = doc.id

        # Check if the garden has the requested course
        if request.course_id in garden_data.get('courses', {}):
            course_data = garden_data['courses'][request.course_id]
            total_flowers = course_data['sunlight']
            
            # Fetch the username from the 'users' collection
            user_ref = db.collection('users').document(uid)
            user_doc = user_ref.get()
            if user_doc.exists:
                user_data = user_doc.to_dict()
                username = user_data['username']
                
                res_arr.append(
                    SelectNeighborItem(uid=uid, username=username, total_flowers=total_flowers)
                )

    return SelectNeighborResponse(root=res_arr)
