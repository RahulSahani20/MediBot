from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from testqa import get_qa_chain

from datetime import datetime
from typing import List
from bson import ObjectId
import os
from dotenv import load_dotenv

from database import chats_collection  # You'll create this in database.py
from database import users_collection

from auth_utils import hash_password, verify_password, create_access_token
from fastapi import Depends
from pydantic import EmailStr

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from auth_utils import SECRET_KEY, ALGORITHM

from fastapi import HTTPException

from deep_translator import GoogleTranslator

app = FastAPI()

qa_chain = get_qa_chain()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use your frontend domain here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# === ChatBot QnA Endpoint ===
class QueryRequest(BaseModel):
    query: str
    language: str = "English"  # Default to English

@app.get("/")
def read_root():
    return {"message": "Hello, world"}

@app.post("/query")
def ask_query(request: QueryRequest):

    user_query = request.query
    selected_lang = request.language.lower()

    # Step 1: Translate input to English if it's not already English
    if selected_lang != "english":
        try:
            translated_query = GoogleTranslator(source=selected_lang, target="english").translate(user_query)
        except Exception as e:
            print("Translation to English failed:", e)
            translated_query = user_query
    else:
        translated_query = user_query

    # Step 2: Ask the language model
    response = qa_chain.invoke({"query": translated_query})
    answer = response["result"]

    # Step 3: Translate answer back to selected language
    if selected_lang != "english":
        try:
            translated_answer = GoogleTranslator(source="english", target=selected_lang).translate(answer)
        except Exception as e:
            print("Translation to selected language failed:", e)
            translated_answer = answer
    else:
        translated_answer = answer

    return {
        "result": translated_answer,
        "sources": [doc.metadata for doc in response["source_documents"]]
    }






oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
        if user_email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_email
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")







# === Chat History Models and Endpoints ===
class Message(BaseModel):
    role: str
    content: str

class ChatCreate(BaseModel):
    title: str
    messages: List[Message]

# @app.post("/chat")
# async def save_chat(chat: ChatCreate):
#     doc = {
#         "title": chat.title,
#         "messages": [msg.dict() for msg in chat.messages],
#         "created_at": datetime.utcnow()
#     }
#     result = await chats_collection.insert_one(doc)
#     return {"id": str(result.inserted_id)}

# @app.get("/chat")
# async def get_chats():
#     chats = []
#     async for chat in chats_collection.find().sort("created_at", -1):
#         chat["id"] = str(chat["_id"])
#         del chat["_id"]
#         chats.append(chat)
#     return chats
@app.post("/chat")
async def save_chat(chat: ChatCreate,current_user: str = Depends(get_current_user)):
    doc = {
        "title": chat.title,
        "messages": [msg.dict() for msg in chat.messages],
        "created_at": datetime.utcnow(),
        "user": current_user
    }
    result = await chats_collection.insert_one(doc)
    return {"id": str(result.inserted_id)}

@app.get("/chat")
async def get_chats(current_user: str = Depends(get_current_user)):
    chats = []
    async for chat in chats_collection.find({"user": current_user}).sort("created_at", -1):
        chat["id"] = str(chat["_id"])
        del chat["_id"]
        chats.append(chat)
    return chats

class ChatUpdate(BaseModel):
    messages: List[Message]

@app.put("/chat/{chat_id}")
async def update_chat(chat_id: str, chat_update: ChatUpdate):
    if not ObjectId.is_valid(chat_id):
        raise HTTPException(status_code=400, detail="Invalid chat ID")

    update_result = await chats_collection.update_one(
        {"_id": ObjectId(chat_id)},
        {"$set": {"messages": [msg.dict() for msg in chat_update.messages]}},
    )

    if update_result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Chat not found")

    updated_chat = await chats_collection.find_one({"_id": ObjectId(chat_id)})
    updated_chat["id"] = str(updated_chat["_id"])
    del updated_chat["_id"]
    return updated_chat


# === Auth ===

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRegister(UserLogin):
    name: str

@app.post("/register")
async def register(user: UserRegister):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = hash_password(user.password)
    await users_collection.insert_one({"email": user.email, "password": hashed, "name": user.name})
    return {"msg": "User registered successfully"}

@app.post("/login")
async def login(user: UserLogin):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/users/me")
async def get_user_info(current_user: str = Depends(get_current_user)):
    user = await users_collection.find_one({"email": current_user})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "email": user["email"],
        "name": user.get("name", "")
    }


