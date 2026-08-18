from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException

from rag import collection_count

logger = logging.getLogger(__name__)

router = APIRouter(tags=["health"])


@router.get("/health")
async def health():
    """Check if the vector store is healthy."""
    try:
        count = collection_count()
    except Exception:
        logger.exception("Health check failed reading Chroma")
        raise HTTPException(status_code=503, detail="Vector store unavailable")
    if count <= 0:
        raise HTTPException(status_code=503, detail="Vector store empty")
    return {"status": "ok", "chunks": count}
