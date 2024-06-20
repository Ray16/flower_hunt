# Dcoumentation of Firebase Database

## users 
```
user_id {
    username: str,
    password: str,
}
```

## gardens
```
garden_id {
    uid: str,
    username: str,
    course_id: str,
    sunlight: int,
    garden_rows: List[{id, topic, conditions}]
}
```

## questions 
```
question_id {
  'topic': 'Array',
  'difficulty': 'easy',
  'answer': 'B',
  'question': 'What is Python?', 
  'options': ['A type of snake', 'A programming language', 'A car brand', 'A music brand']
}
```