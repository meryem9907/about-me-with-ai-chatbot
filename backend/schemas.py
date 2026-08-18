from __future__ import annotations

from pydantic import BaseModel, Field


class StreamBody(BaseModel):
    """Body of the stream request."""
    prompt: str = Field(min_length=1, max_length=4000)
