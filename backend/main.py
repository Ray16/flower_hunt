from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, RootModel
import firebase_admin
from firebase_admin import credentials, firestore
import uuid
from typing import Dict, List, Optional

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


# === Garden section 
def calculate_sunlight(garden_rows):
    sunlight = 0
    for row in garden_rows:
        sunlight += row['conditions']['easy'] * 50
        sunlight += row['conditions']['medium'] * 100
        sunlight += row['conditions']['hard'] * 200
    return sunlight


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

class GardenLoadResponse(BaseModel):
    status: str
    message: str
    course_id: str
    sunlight: int
    garden_rows: List[GardenRow]

# If no such garden, create a new one based on the course_topic (fetch from "courses" collection).
# Else, fetch the garden and calcuate the total sunlight:
# In conditions, easy: 1 means that there is 1 easy questions. 
# Each easy flower worth 50 sunlight, a medium worth 100, a hard worth 200.
@app.post("/garden/load_garden", response_model=GardenLoadResponse)
async def garden_page_load(request: GardenLoadRequest):
    gardens_ref = db.collection('gardens')
    garden_query = gardens_ref.where('uid', '==', request.uid).where('course_id', '==', request.course_id).stream()

    garden_data = None
    for doc in garden_query:
        garden_data = doc.to_dict()
        garden_doc_id = doc.id
        break

    if garden_data:
        sunlight = calculate_sunlight(garden_data['garden_rows'])
        garden_data['sunlight'] = sunlight
        
        # Update the sunlight in Firestore
        gardens_ref.document(garden_doc_id).update({'sunlight': sunlight})
        
        return GardenLoadResponse(
            status="success",
            message="Garden loaded successfully",
            course_id=garden_data['course_id'],
            sunlight=sunlight,
            garden_rows=garden_data['garden_rows']
        )
    else:
        courses_ref = db.collection('courses').document(request.course_id)
        course_doc = courses_ref.get()
        if not course_doc.exists:
            raise HTTPException(status_code=404, detail="Course not found")

        course_data = course_doc.to_dict()
        garden_rows = []
        for i, topic in enumerate(course_data['course_topics'], start=1):
            garden_row = {
                'row_num': str(i),
                'topic': topic,
                'conditions': {'easy': 0, 'medium': 0, 'hard': 0},
                'questions': {'q1_id': 'none', 'q2_id': 'none', 'q3_id': 'none'}
            }
            garden_rows.append(garden_row)
        
        garden_data = {
            'uid': request.uid,
            'course_id': request.course_id,
            'sunlight': 0,
            'garden_rows': garden_rows
        }
        
        gardens_ref.add(garden_data)

        return GardenLoadResponse(
            status="success",
            message="New garden created successfully",
            course_id=garden_data['course_id'],
            sunlight=0,
            garden_rows=garden_rows
        )


class GetQuestionRequest(BaseModel):
    my_uid: str
    neighbor_uid: str
    course_id: str
    topic: str
    difficulty: str
    question_id: Optional[str] = None

class GetQuestionResponse(BaseModel):
    status: str
    message: str
    question_id: str    
    difficulty: str
    topic: str
    answer: str
    question: str
    question_number: str
    options: List[str]

# if question_id is provided, directly use the question_id
# else, go to questions to find a question with matching {course_id, topic, difficulty}. Just return the first one.
@app.post("/garden/get_question", response_model=GetQuestionResponse)
async def get_question(request: GetQuestionRequest):
    questions_ref = db.collection('questions')

    if request.question_id:
        # Directly use the provided question_id
        question_doc = questions_ref.document(request.question_id).get()
        if not question_doc.exists:
            raise HTTPException(status_code=404, detail="Question not found")
        question_data = question_doc.to_dict()
    else:
        # Find a question with matching {course_id, topic, difficulty}
        question_query = questions_ref.where('course_id', '==', request.course_id)\
                                      .where('topic', '==', request.topic)\
                                      .where('difficulty', '==', request.difficulty)\
                                      .limit(1).stream()
        question_data = None
        for doc in question_query:
            question_data = doc.to_dict()
            question_data['question_id'] = doc.id
            break
        
        if not question_data:
            raise HTTPException(status_code=404, detail="No matching question found")

    return GetQuestionResponse(
        status="success",
        message="Question retrieved successfully",
        question_id=question_data['question_id'],
        difficulty=question_data['difficulty'],
        topic=question_data['topic'],
        answer=question_data['answer'],
        question=question_data['question'],
        question_number=question_data['question_number'],
        options=question_data['options']
    )


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
        res_arr.append(CoursesItem(course_id=doc.id, course_name=course_data['course_name']))
    return CoursesResponse(root=res_arr)

# Select Neighbor
class SelectNeighborRequest(BaseModel):
    uid: str        
    course_id: str  

class SelectNeighborItem(BaseModel):
    uid: str
    username: str
    sunlight: int

class SelectNeighborResponse(RootModel[List[SelectNeighborItem]]):
    pass

# Read from "gardens" collection and fetch all gardens 
# with matching course_id AND non-matching uid (exclude myself)
@app.post("/select_neighbor", response_model=SelectNeighborResponse)
async def select_neighbor(request: SelectNeighborRequest):
    gardens_ref = db.collection('gardens')
    
    # Query gardens with matching course_id
    garden_query = gardens_ref.where('course_id', '==', request.course_id).stream()
    neighbor_list = []

    for doc in garden_query:
        garden_data = doc.to_dict()
        if garden_data['uid'] != request.uid:
            # Calculate sunlight just to be safe
            sunlight = calculate_sunlight(garden_data['garden_rows'])
            if sunlight != garden_data['sunlight']:
                # Update the sunlight in Firestore
                gardens_ref.document(doc.id).update({'sunlight': sunlight})
            neighbor_list.append(SelectNeighborItem(
                uid=garden_data['uid'],
                username=garden_data['username'],
                sunlight=sunlight
            ))

    return SelectNeighborResponse(root=neighbor_list)
