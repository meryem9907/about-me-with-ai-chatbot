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
- frontend: next.js
- backend: fastapi
- tailwind
- ai sdk: Anthropic SDK / LangChain / LlamaIndex
- vector db: Qdrant / Chroma / pgvector
- deploy:  Render / Railway / Fly.io / VPS
- add MCP Server later for Github, CV query etc.
# MVP
- Recruiter -> Uses chatbot -> Chatbot gives answers

# Sprints
1. 10.07 - 16.07
- create mvp: page with untrained chatbot and quick infos
- make it deployable
2. 17.07 - 30.07
- train llm 
3. 31.07 - 13.08
- enhance accessibility, responsiveness and performance (checklist?)
4. 14.08 - 22.08 
- unit test, integration test, e2e tests

# Design 
- Figma 

# Next steps
- page flipper for quick view