# Dcoumentation of Backend API

## Garden screen

### On page load
```
POST {
  uid
  course_id
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
```
