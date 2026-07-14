
# Prerequisites

- Installed Node.js version
- Installed Python version 

# Dev mode
- run <code>npm i</code> in the frontend folder
- run <code>pip install -- -r requirements.txt </code> in the backend folder
- create an .env file with "GEMINI_API_KEY" in the backend folder
<code>GEMINI_API_KEY="example key"</code>.
You can generate a key from the Google Gemini docs: https://ai.google.dev/gemini-api/docs/get-started?hl=de
- choose a model: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite
- make sure to create a gitignore folder with ".env" included to not expose your keys
- start frontend: <code>npm run dev</code>
- start backend: <code>fastapi dev</code>


# Credits 

- Icons and assets by Pxlkit: https://pxlkit.xyz/