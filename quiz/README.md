### Multiple choice question database
We build a multiple choice question databse related to Python programming using ChatGPT-4o.

The `quiz.json` file contains 10 multiple choice questions for each of the following chapters in the [Python Crash Course](https://www.google.com/books/edition/Python_Crash_Course_3rd_Edition/qD1wEAAAQBAJ?hl=en&gbpv=0) textbook:
- Chapter 1: Introduction
- Chapter 2: Variables and Simple Data Types
- Chapter 3: Introducing Lists
- Chapter 4: Working with Lists
- Chapter 5: if Statements
- Chapter 6: Dictionaries
- Chapter 7: User Input and while Loops
- Chapter 8: Functions
- Chapter 9: Classes
- Chapter 10: Files and Exceptions

The questions and answers are generated using ChatGPT-4o with the following prompt:
```
Can you generate a 10 multiple choice questions for each of the following chapters:
Chapter 1: Introduction
Chapter 2: Variables and Simple Data Types
Chapter 3: Introducing Lists
Chapter 4: Working with Lists
Chapter 5: if Statements
Chapter 6: Dictionaries
Chapter 7: User Input and while Loops
Chapter 8: Functions
Chapter 9: Classes
Chapter 10: Files and Exceptions

The example format of question should be given in the json format, an example is the following:

[{
        "question": "Which data type in Python is used to represent a sequence of characters?",
        "options": ["A. int", "B. float", "C. str", "D. list"],
        "answer": "C",
        "Chapter": 2
    }]
```