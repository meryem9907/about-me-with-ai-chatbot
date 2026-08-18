from __future__ import annotations

import time
from collections import defaultdict, deque

from fastapi import HTTPException, Request

from config import RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW_SEC

_rate_buckets: dict[str, deque[float]] = defaultdict(deque)


def client_ip(request: Request) -> str:
    """Get the client IP from the request."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    if request.client:
        return request.client.host
    return "unknown"


def check_rate_limit(request: Request) -> None:
    """Check the rate limit for the request.
    Per client only RATE_LIMIT_REQUESTS requests are allowed within RATE_LIMIT_WINDOW_SEC seconds.
     If the rate limit is exceeded, raise a HTTPException with a Retry-After header."""
    now = time.monotonic() # seconds in floating point
    key = client_ip(request) # get the client IP from the request
    bucket = _rate_buckets[key] # get the bucket for the client IP
    while bucket and now - bucket[0] > RATE_LIMIT_WINDOW_SEC: # remove requests older than RATE_LIMIT_WINDOW_SEC seconds
        bucket.popleft() # remove the oldest request from the bucket 
    if len(bucket) >= RATE_LIMIT_REQUESTS:
        retry_after = max(1, int(RATE_LIMIT_WINDOW_SEC - (now - bucket[0])) + 1) 
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded",
            headers={"Retry-After": str(retry_after)},
        )
    bucket.append(now)
