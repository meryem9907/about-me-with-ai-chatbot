from dotenv import load_dotenv
import os
from google import genai
from google.genai import types
from rag import retrieve

load_dotenv()
model = "gemini-3.1-flash-lite"
SYSTEM_INSTRUCTION = """You are Meryem's portfolio assistant for recruiters.
Answer ONLY using CONTEXT. If missing, say you don't know.
Do not invent skills, jobs, dates, or projects.
Be concise and professional. Decline off-topic or sensitive questions.
When asked about the source of the reference mention her two companies.
"""
class Agent:
    def __init__(self):
        _api_key = os.environ["GEMINI_API_KEY"]
        self.client = genai.Client(api_key=_api_key)

    def generate_response(self, prompt):
        context = retrieve(prompt)
        response = self.client.models.generate_content( model=model,
            contents=f"CONTEXT:\n{context}\n\nQUESTION: {prompt}",
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                temperature=0.3,
                max_output_tokens=900,
            ),)
        return response.text
    
    async def stream_response(self, prompt):
        context = retrieve(prompt)
        stream = await self.client.aio.models.generate_content_stream(
            model=model, 
            contents=f"CONTEXT:\n{context}\n\nQUESTION: {prompt}",
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                temperature=0.3,
                max_output_tokens=900,
            ),
        )
        async for chunk in stream:
            if chunk.text:
                yield chunk.text
            

    def close(self):
        self.client.close()