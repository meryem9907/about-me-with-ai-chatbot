from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from agent import Agent
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()
agent = Agent()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", os.environ["PROD_DOMAIN"] ], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/stream")
async def stream(prompt: str = "Explain the theory of relativity?"):
    return StreamingResponse(agent.stream_response(prompt), media_type="text/plain")

@app.get("/ask")
async def ask(prompt: str = "Hello, how are you?"):
    return {"response": agent.generate_response(prompt)}


