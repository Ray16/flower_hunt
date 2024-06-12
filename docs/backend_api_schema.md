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

## Garden screen

### 01 - On page load
```
POST {
  uid: 100
  course_id: 14100
}

Response [
  {
    week: 1,
    active: true,
    conditions: [1,0,1,0],
    gain: 8
  },
  {
    week: 2,
    active: false,
    conditions: [1,0,1,0],
    gain: 8
  },
]

curl -X POST "http://129.114.24.200:8001/garden/page_load" \
     -H "Content-Type: application/json" \
     -d '{"uid": 100, "course_id": 14100}'
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
     -d '{"uid": 100, "course_id": 14100, "week": 1}'
```

### 03 - When user selects/submits an answer
```
POST {
  question_id: 'week1_q1',
  response_time: '10',
  user_answer: '0',
  correct_answer: '1'
}

Response {
  'status': 'success'
}
```