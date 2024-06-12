# Dcoumentation of Backend API
- Check the full API documentation at: http://129.114.24.200:8001/docs.


## Part 01: Login screen
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
    active: true,
    conditions: [1,0,1,0],
    gain: 8
  },
  {
    active: false,
    conditions: [1,0,1,0],
    gain: 8
  },
]

# Call API
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
  'question_id': 'week1_q1'
  'chapter': '1',
  'answer': 'B',
  'difficulty': 'easy',
  'question': 'What is Python?', 
  'options': ['A type of snake', 'A programming language', 'A car brand', 'A music brand']
}

# Call API
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

### 04 - When user returns to the Garden screen
Call the same api as 01


## How to call the API 