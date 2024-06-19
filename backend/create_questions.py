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
        'course_id': '101',
        'topic': 'Array',
        'difficulty': 'easy',
        'answer': 'A',
        'question': '1768. You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string. Return the merged string.',
        'options': [
            'Use two pointers, one for each string, to iterate through the strings in alternating order.',
            'Convert the strings to lists, concatenate the lists, and then convert back to a string.',
            'Use a single loop to iterate through the shorter string and append the remaining characters of the longer string.',
            'Use recursion to merge the strings, with each recursive call merging one character from each string.'
        ]
    },

    {
        'course_id': '101',
        'topic': 'Array',
        'difficulty': 'medium',
        'answer': 'A',
        'question': '151. Given a string s, reverse the order of words. Return the string with words in reverse order, separated by a single space. Ignore leading, trailing, and multiple spaces.',
        'options': [
            'Split the string into words, reverse the order of the words, and join them back together.',
            'Use a two-pointer technique to swap characters in the string.',
            'Use a stack to store characters and then pop them off to reverse the order of the words.',
            'Loop through the string and reverse each word individually.'
        ]
    },

    {
        'course_id': '101',
        'topic': 'Array',
        'difficulty': 'hard',
        'answer': 'A',
        'question': '188. Given an integer array prices where prices[i] is the price of a stock on the ith day, and an integer k, find the maximum profit you can achieve with at most k transactions. Note: You must sell the stock before you buy again.',
        'options': [
            'Use dynamic programming with a 2D array where dp[i][j] represents the maximum profit after j transactions up to the ith day.',
            'Sort the prices array and select the k largest differences between consecutive prices.',
            'Use a greedy approach to buy at every local minimum and sell at every local maximum.',
            'Use a recursive function to try all possible transactions and return the maximum profit.'
        ]
    }


]

# Write the questions to Firestore
def add_questions(questions_data):
    for question_data in questions_data:
        questions_ref.add(question_data)
    print("Questions added successfully")

# Call the function to add the questions
add_questions(questions_data)
