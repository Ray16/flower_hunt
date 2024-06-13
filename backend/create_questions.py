import firebase_admin
from firebase_admin import credentials, firestore

# Use a service account.
cred = credentials.Certificate('faradawn_private_key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

questions_ref = db.collection("questions")

# Define the questions data with different difficulties
questions_data = [
    {
        'topic': 'Array',
        'difficulty': 'easy',
        'answer': 'B',
        'question': 'What is Python?',
        'options': ['A type of snake', 'A programming language', 'A car brand', 'A music brand']
    },
    {
        'topic': 'Linked List',
        'difficulty': 'medium',
        'answer': 'A',
        'question': 'Which data structure is used to implement a stack?',
        'options': ['Array', 'Linked List', 'Hash Table', 'Tree']
    },
    {
        'topic': 'Dynamic Programming',
        'difficulty': 'hard',
        'answer': 'C',
        'question': 'Which algorithm technique solves problems by breaking them down into simpler subproblems?',
        'options': ['Greedy', 'Divide and Conquer', 'Dynamic Programming', 'Brute Force']
    }
]

# Write the questions to Firestore
def add_questions(questions_data):
    for question_data in questions_data:
        questions_ref.add(question_data)
    print("Questions added successfully")

# Call the function to add the questions
add_questions(questions_data)
