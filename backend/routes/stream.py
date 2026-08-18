from __future__ import annotations

import logging

from fastapi import APIRouter, Header, HTTPException, Query, Request
from fastapi.responses import StreamingResponse

from request_locale import resolve_locale
from rate_limit import check_rate_limit
from schemas import StreamBody

logger = logging.getLogger(__name__)

router = APIRouter(tags=["stream"])


async def _streaming_response(request: Request, prompt: str, locale: str) -> StreamingResponse:
    """Stream a response to a prompt using the Gemini model."""
    agent = request.app.state.agent
    try:
        stream = await agent.open_stream(prompt, locale=locale)
    except Exception:
        logger.exception("Stream setup failed")
        raise HTTPException(status_code=502, detail="Upstream model error")

    async def event_stream():
        try:
            async for chunk in agent.iter_stream(stream):
                yield chunk
        except Exception:
            logger.exception("Stream read failed")
            return

    return StreamingResponse(event_stream(), media_type="text/plain")


@router.post("/stream")
async def stream_post(
    request: Request,
    body: StreamBody,
    locale: str | None = Query(default=None),
    accept_language: str | None = Header(default=None, alias="Accept-Language"),
):
    """Stream a response to a prompt using the Gemini model."""
    check_rate_limit(request)
    resolved = resolve_locale(locale, accept_language)
    return await _streaming_response(request, body.prompt, resolved)
