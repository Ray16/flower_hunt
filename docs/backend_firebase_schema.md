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
    course_id: str,
    sunlight: int,
    garden_rows: list of {id, topic, conditions}
}
```