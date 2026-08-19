from __future__ import annotations

import asyncio
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from agent import Agent
from config import CORS_ORIGINS
from rag import collection_exists, collection_count, warm_embeddings
from routes.health import router as health_router
from routes.stream import router as stream_router

logger = logging.getLogger(__name__)


def _prepare_vector_store() -> None:
    """Ingest if empty, then load MiniLM. Must not block the listen socket."""
    try:
        if not collection_exists():
            from ingest import ingest

            logger.info("Chroma collection empty; running ingest...")
            ingest()
        else:
            logger.info("Chroma collection ready (%s chunks)", collection_count())
        warm_embeddings()
    except Exception:
        logger.exception("Vector store prepare failed (continuing)")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Start serving immediately; warm RAG in the background for Fly cold starts."""
    app.state.agent = Agent()
    warmup = asyncio.create_task(asyncio.to_thread(_prepare_vector_store))
    try:
        yield
    finally:
        warmup.cancel()
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
