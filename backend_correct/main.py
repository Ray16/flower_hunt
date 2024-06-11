from fastapi import FastAPI
from models import Todo
import appbuilder
import os
import re

app = FastAPI()

# 请前往千帆AppBuilder官网创建密钥，流程详见：https://cloud.baidu.com/doc/AppBuilder/s/Olq6grrt6#1%E3%80%81%E5%88%9B%E5%BB%BA%E5%AF%86%E9%92%A5
# 设置环境变量
os.environ["APPBUILDER_TOKEN"] = 'bce-v3/ALTAK-eh4pLo8laymbjz6VkHpAf/0a09449916ea91c7ee9d34af4b2ef238121d51ce'
app_id = '4885c346-800e-4492-bc65-f507289d55e8'  # 已发布AppBuilder应用ID，可在console端查看
# 初始化智能体
builder = appbuilder.AppBuilderClient(app_id)
# 创建会话
conversation_id = builder.create_conversation()

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

# GET all 3 questions from the database

# GET THE todo given id
@app.get("/todos/{todo_id}")
async def get_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return {"todo": todo}
    return {"message": "No getting todos found"}

# GET the specific question as requested from the user


# POST
@app.post("/todos")
async def create_todos(todo: Todo):
    todos.append(todo)
    return {"message": "Todo has been added"}

# POST 3 questions and save them to the database when entered. 


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