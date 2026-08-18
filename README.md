# Live Demo

https://about-me-with-ai-chatbot.onrender.com/

# Prerequisites

- Node.js 22 (local frontend also works on ~24)
- Python ~3.12
- Docker ~29.6

# Project layout

- `frontend_1.0/` — Next.js portfolio UI (chat, projects, legal, i18n)
- `backend/` — FastAPI + Gemini + Chroma RAG

# Run with Docker (size ~ 2GB)

1. Create a root `.env` from [`env.example`](env.example).
2. `docker compose up --build`
3. Open http://localhost:3000/en


The backend entrypoint ingests knowledge into Chroma if the collection is empty (so a fresh volume still works). Health: `GET http://localhost:8000/health`.

# Run frontend locally

```bash
cd frontend_1.0
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000/en. Point `NEXT_PUBLIC_API_URL` at a running backend.

# Run backend locally

```bash
cd backend
cp env.example .env
# set GEMINI_API_KEY, MODEL, PROD_DOMAIN
python -m venv .venv
# activate venv, then:
pip install -r requirements.txt
python ingest.py
uvicorn main:app --reload --port 8000
```
