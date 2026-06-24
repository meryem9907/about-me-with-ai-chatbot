# Description
This project includes an about-me page with a trained large language model that can respond to questions about my person.
It should be able to give quick insights about my personality, skills, projects, work experience, hobbys and current aims.
It targets recruiters so the design should be intuitive and modern. The main source of value is the ai chatbot and the special design of the page, which should represent my personality: animal-loving, vivid imagination, nerdy.

# Scope 
1. Must-have 
- trained Ai-chatbot
- striking design: pixel art character, animals, nerdy touch
2. Nice-to-have
- concise overview to access key information about myself

# Specification
1. Functional:
- as a recruiter i want to ask questions about the canditate over an ai chatbot to get specific information without manually picking it from a general text. There should be an ai chatbot that can answer general (who is meryem?) and detailed (what are meryems specializations?)
- as a recruiter i want to quickly read over the key informations about the canditate. There should be a listed overview of the main ideas (my personality, skills, projects, work experience, hobbys and current aims) about the candidate.
2. Not functional:
- as a developer i want to create responsive design
- as a developer i want the fonts and ui components to be in pixel art style to give a nerdy impression
- as a developer it is important to me to train the llm to answer questions about myself without hallucinating. It should answer with an automatized text when asked unanswerable, undesired or insensitive questions.
3. Constraints
- as a developer i want to use astro with react in the frontend to make benefit of the pace in the page
- as a developer i want to to use flask in the backend to host and serve the llm with minimal and lightweight setup
- as a developer i want to use tailwind to quickly build the design
- as a developer i want to host an llm from Gemini preferably, if this fails for some reason then i will use a model from huggingface
- as a deployment platform i want to keep following options open: Vercel with serverless functions, Render / Railway / Fly.io for custom flask server.

# MVP
- Recruiter -> Uses chatbot -> Chatbot gives answers

# Sprints
1. 24.06 - 01.07
- collect inspo for design choices
- Create a design in figma
- choose an ai model
- init repo and create project boilerplate
2. 02.07 - 08.07
- implement frontend
3. 08.07 - 15.07
- implement backend
4. 15.07 - 22.07 
- test and deploy 

# Design 
- Figma 

