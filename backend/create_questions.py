import firebase_admin
from firebase_admin import credentials, firestore
import uuid

# Use a service account.
cred = credentials.Certificate('faradawn_private_key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

questions_ref = db.collection("questions")

# Define the questions data with different difficulties
questions_data = [
    {
        'question_id': str(uuid.uuid4()),
        'course_id': '101',
        'topic': 'Array',
        'difficulty': 'easy',
        'answer': 'A',
        'question': 'Merge two strings by alternating characters. Append remaining characters of the longer string.',
        'question_number': '1768',
        'options': [
            'Two pointers. Iterate alternatively.',
            'Convert strings to lists, concatenate, convert back.',
            'Single loop for shorter string, append remaining characters.',
            'Recursion, merge one character at a time.'
        ]
    },

    {
        'question_id': str(uuid.uuid4()),
        'course_id': '101',
        'topic': 'Array',
        'difficulty': 'medium',
        'answer': 'A',
        'question': 'Reverse the order of words in a string. Ignore extra spaces.',
        'question_number': '151',
        'options': [
            'Split, reverse words, join back together.',
            'Two-pointer technique to swap characters.',
            'Use stack to reverse order of words.',
            'Loop, reverse each word individually.'
        ]
    },

    {
        'question_id': str(uuid.uuid4()),
        'course_id': '101',
        'topic': 'Array',
        'difficulty': 'hard',
        'answer': 'A',
        'question': 'Find max profit with at most k stock transactions. Sell before buying again.',
        'question_number': '188',
        'options': [
            'Dynamic programming with 2D array for max profit.',
            'Sort prices, select k largest differences.',
            'Greedy, buy at local min, sell at local max.',
            'Recursive, try all transactions, return max profit.'
        ]
    }
]

def delete_all_questions():
    questions_ref = db.collection('questions')
    query = questions_ref.stream()
    for doc in query:
        questions_ref.document(doc.id).delete()
    print("All questions deleted successfully")

# Write the questions to Firestore
def add_questions(questions_data):
    for question_data in questions_data:
        questions_ref.add(question_data)
    print("Questions added successfully")

    # add questions id to OG user 

# Call the function to add the questions
delete_all_questions()
add_questions(questions_data)
