from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from google.cloud import datastore
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from functools import wraps
import uuid
import uvicorn

import requests

datastore_client = datastore.Client.from_service_account_json('jobsmaster-761921139a35.json')

app = FastAPI(
    title="JobsMaster",
    version="0.0.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Class to manage the websockets for chat
class SocketManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, data):
        for connection in self.active_connections:
            await connection.send_json(data)    

manager = SocketManager()


class Chat(BaseModel):
    text: str
    date: str
    user_email: str

def require_api_key(f):
    @wraps(f)
    async def decorated_function(*args, request: Request,**kwargs):
        if request.headers.get('X-API-Key') != 'abcdef123456':
            raise Exception401(message= 'Invalid API Key')
        return await f(*args, request, **kwargs)
    return decorated_function


# API to get all the previous chat messages
@app.get('/chat/getchats')
async def get_chats(request : Request, X_API_Key: str = Header(default=None)):
    query = datastore_client.query(kind='Messages')
    query.order = ['date']
    return list(query.fetch())

websockets = []


# Websocket
@app.websocket("/chat/ws")
async def websocket_endpoint(websocket: WebSocket):
    print("entered ws")
    await manager.connect(websocket)
    response = {"response":"got connected"}
    await manager.broadcast(response)
    try:
        while True:
            data = await websocket.receive_json()
            r = requests.post('https://us-central1-jobsmaster.cloudfunctions.net/chatCheck', json=data)
            print(r)
            if r.text == 'Censored':
                data['text'] = 'Censored'
                print(data['text'])
                await websocket.send_json(data)
            else:
                print("Here")
                id = str(uuid.uuid4())
                key = datastore_client.key('Messages', id)
                entity = datastore.Entity(key)
                entity['text'] = data['text']
                entity['date'] = data['date']
                print(entity)
                datastore_client.put(entity)
                await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        response = {"response":"left"}
        await manager.broadcast(response)

class Exception401(Exception):
    def __init__(self, message: str ):
        self.message = message

@app.exception_handler(Exception401)
async def Exception404Handler(request: Request, exception : Exception401):
    return JSONResponse(status_code=401, content={"message": exception.message})


if __name__ == "__main__":
    uvicorn.run(app)
