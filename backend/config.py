from __future__ import annotations

import os

from dotenv import load_dotenv

load_dotenv()


def require_env(name: str) -> str:
    """Require an environment variable to be set."""
    value = os.environ.get(name, "").strip()
    if not value:
        raise RuntimeError(f"Required environment variable {name} is missing or empty")
    return value


def cors_origins() -> list[str]:
    """Get the CORS origins from the environment variable."""
    origins = ["http://localhost:3000"]
    raw = os.environ.get("PROD_DOMAIN", "").strip()
    if not raw:
        raise RuntimeError("Required environment variable PROD_DOMAIN is missing or empty")
    for part in raw.split(","):
        origin = part.strip().rstrip("/")
        if origin and origin not in origins:
            origins.append(origin)
    return origins


require_env("GEMINI_API_KEY")
require_env("MODEL")

CORS_ORIGINS = cors_origins()
RATE_LIMIT_REQUESTS = int(os.environ.get("RATE_LIMIT_REQUESTS", "20"))
RATE_LIMIT_WINDOW_SEC = int(os.environ.get("RATE_LIMIT_WINDOW_SEC", "60"))
ALLOW_GET_STREAM = os.environ.get("ALLOW_GET_STREAM", "false").lower() in {
    "1",
    "true",
    "yes",
}
