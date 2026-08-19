from __future__ import annotations

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
async def health():
    """Liveness probe. Must stay fast so Fly can route traffic during cold start."""
    return {"status": "ok"}
