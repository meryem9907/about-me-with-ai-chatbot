
from dotenv import load_dotenv
import os
from google import genai
from google.genai import types

load_dotenv()
model = "gemini-3.1-flash-lite"

class Agent:
    def __init__(self):
        _api_key = os.environ["GEMINI_API_KEY"]
        self.client = genai.Client(api_key=_api_key)

    def generate_response(self, prompt):
        response = self.client.models.generate_content( model=model,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
                max_output_tokens=900,
            ),)
        return response.text
    
    async def stream_response(self, prompt):
        stream = await self.client.aio.models.generate_content_stream(
            model=model, contents=prompt
        )
        async for chunk in stream:
            if chunk.text:
                print(chunk.text, end="")
                yield chunk.text
            

    def close(self):
        self.client.close()