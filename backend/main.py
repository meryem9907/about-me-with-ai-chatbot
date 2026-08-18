from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from agent import Agent
from config import CORS_ORIGINS
from rag import warm_embeddings
from routes.health import router as health_router
from routes.stream import router as stream_router

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Warm embeddings on startup; close the Gemini client on shutdown."""
    try:
        warm_embeddings()
    except Exception:
        logger.exception("Embedding warmup failed (continuing)")
    app.state.agent = Agent()
    try:
        yield
    finally:
        app.state.agent.close()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept", "Accept-Language", "Authorization"],
)

app.include_router(health_router)
app.include_router(stream_router)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Preserve custom headers (e.g. Retry-After) on HTTP errors."""
    headers = dict(exc.headers or {})
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
        headers=headers,
    )
