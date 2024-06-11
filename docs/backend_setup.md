# Backend Setup

## Setup FastAPI
```
# update the environment
sudo apt update
sudo apt upgrade -y
sudo apt install python3-pip python3-venv -y

# install fastapi and firebase
python3 -m venv env
source env/bin/activate
pip install fastapi uvicorn
pip install --upgrade firebase-admin

# put firebase key inside the folder and name it as
mike_private_key.json

# launch the app on port 8001
tmux
uvicorn main:app --host 0.0.0.0 --port 8001

# on another terminal
curl http://127.0.0.1:8001

# on local computer
curl http://129.114.24.200:8001
```



### Test API
```
# Post
curl -X POST "http://129.114.24.200:8001/garden/page_load" \
     -H "Content-Type: application/json" \
     -d '{"uid": 100, "course_id": 14100}'

```

### Trouble shoot
- Installation error: grpcio-status 1.64.1 has requirement protobuf<6.0dev,>=5.26.1, but you'll have protobuf 4.25.3 which is incompatible.
Solution:
```
pip install grpcio-status==1.62.2
```

- "422 Unprocessable Entity". Solved by defining the input request's base model.
```
# before
async def garden_page_load(uid: int, course_id: int):

# after
async def garden_page_load(request: PageLoadRequest):

class PageLoadRequest(BaseModel):
    uid: int
    course_id: int
```
