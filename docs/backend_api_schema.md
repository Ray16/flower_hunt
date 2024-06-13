# Dcoumentation of Backend API
- Check the full API documentation at: http://129.114.24.200:8001/docs.


## Course Screen
```
POST /courses {
  uid: 100
}

Response [
  {
    course_id: 101,
    course_name: "Software Engineering",
  },
  {
    course_id: 102,
    course_name: "Data Science",
  }
]

curl -X POST "http://129.114.24.200:8001/courses" \
     -H "Content-Type: application/json" \
     -d '{"uid": 100}'
```

### Course - retrieve that garden 

## Garden screen

### 01 - On page load (each topic is a row)
Sort the garden rows based on their id. \\
Conditions mean how many flowers of each type the user has. \\
```
POST {
  uid: 100
  course_id: 101
}

Response {
  sunlight: 100,
  garden_rows: [
    {
      id: 1,
      topic: "array",
      conditions: {
        easy: 3,
        medium: 0,
        hard: 0,
      }
    },
    {
      id: 2,
      topic: "linked list",
      conditions: {
        easy: 0,
        medium: 0,
        hard: 0,
      }
    },
  ]
}


curl -X POST "http://129.114.24.200:8001/garden/page_load" \
     -H "Content-Type: application/json" \
     -d '{"uid": 100, "course_id": 101}'
```

### 02 - On clicking steal
```
POST {
  uid: 100
  course_id: 14100
  week: 1
}

Response {
  'question_id': 'week1_q1',
  'chapter': '1',
  'answer': 'B',
  'difficulty': 'easy',
  'question': 'What is Python?', 
  'options': ['A type of snake', 'A programming language', 'A car brand', 'A music brand']
}

curl -X POST "http://129.114.24.200:8001/garden/steal" \
     -H "Content-Type: application/json" \
     -d '{"uid": 100, "course_id": 101, "week": 1}'
```

### 03 - When user submits an answer
```
POST /garden/submit_answer {
  uid: 100,
  question_id: 'q1',
  response_time: 10,
  user_answer: 'A',
  correct_answer: 'B'
}

Response {
  status: 'success'
}

curl -X POST "http://129.114.24.200:8001/garden/submit_answer" \
     -H "Content-Type: application/json" \
     -d '{"uid": 100, "question_id": "q1", "response_time": 10, "user_answer": "A", "correct_answer": "B"}'
```

## Select Neighbor Screen
```
POST /select_neighbor {
  uid,
  course_id,
}

Response [
  {
    uid: 102,
    username: "Faradawn",
    total_flowers: 50,
  },
  {
    uid: 103,
    username: "Mike",
    total_flowers: 10,
  },
  {
    uid: 104,
    username: "Ray",
    total_flowers: 5,
  }
]

curl -X POST "http://129.114.24.200:8001/select_neighbor" \
     -H "Content-Type: application/json" \
     -d '{"uid": 100, "course_id": 101}'
```
