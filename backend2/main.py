from fastapi import FastAPI
from models import Todo

app = FastAPI()

# get the function of the todos, and convert that to database functionality
todos=[]

# JUST A WELCOME
@app.get("/")
async def root():
    return {"message": "Welcome to Flower Garden!"}

# GET ALL
@app.get("/todos")
async def get_all_todos():
    return {"todos": todos}

# GET THE todo given id
@app.get("/todos/{todo_id}")
async def get_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return {"todo": todo}
    return {"message": "No getting todos found"}

# POST
@app.post("/todos")
async def create_todos(todo: Todo):
    todos.append(todo)
    return {"message": "Todo has been added"}

# UPDATE
@app.put("/todos/{todo_id}")
async def update_todo(todo_id: int, todo_new:Todo):
    for todo in todos:
        if todo.id == todo_id:
            todo.item = todo_new.item
            return {"todo": todo}
    return {"message": "No todos found to update"}

# DELETE
@app.delete("/todos/{todo_id}")
async def delete_todos(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            todos.remove(todo)
            return {"message": "Todo has been deleted"}
    return {"message": "No removing todos found"}