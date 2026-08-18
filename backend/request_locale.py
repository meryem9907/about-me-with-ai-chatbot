from __future__ import annotations

from agent import normalize_locale


def resolve_locale(
    locale: str | None,
    accept_language: str | None,
) -> str:
    """Resolve the locale from query param or Accept-Language."""
    if locale:
        return normalize_locale(locale)
    if accept_language:
        primary = accept_language.split(",")[0].strip()
        if primary:
            return normalize_locale(primary)
    return "en"
