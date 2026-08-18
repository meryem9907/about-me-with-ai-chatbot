from __future__ import annotations

import asyncio
import logging
import os
from typing import Any, AsyncIterator
from dotenv import load_dotenv
from google import genai
from google.genai import types

from rag import retrieve

load_dotenv()

logger = logging.getLogger(__name__)

MODEL = os.environ.get("MODEL", "").strip()
SYSTEM_INSTRUCTION = """You are Meryem's portfolio assistant for recruiters.
Answer ONLY using CONTEXT. If missing, say you don't know.
Do not invent skills, jobs, dates, or projects.
Be concise and professional. Decline off-topic or sensitive questions.
When asked about the source of the reference mention her projects, university curriculum at Technische Hochschule Augsburg and two companies.
"""

LOCALE_NAMES = {
    "en": "English",
    "de": "German",
    "tr": "Turkish",
}
ALLOWED_LOCALES = frozenset(LOCALE_NAMES)


def normalize_locale(locale: str | None) -> str:
    """Normalize a locale to a standard format."""
    if not locale:
        return "en"
    code = locale.split("-")[0].lower()
    return code if code in ALLOWED_LOCALES else "en"


def _extract_text(payload: Any) -> str:
    """Safely read text from a Gemini response or stream chunk."""
    try:
        text = payload.text
        if text:
            return text
    except (ValueError, AttributeError):
        pass

    try:
        candidates = getattr(payload, "candidates", None) or []
        for candidate in candidates:
            content = getattr(candidate, "content", None)
            parts = getattr(content, "parts", None) or []
            bits = []
            for part in parts:
                part_text = getattr(part, "text", None)
                if part_text:
                    bits.append(part_text)
            if bits:
                return "".join(bits)
    except Exception:
        logger.exception("Failed to extract Gemini text from candidates")
    return ""


class Agent:
    def __init__(self, api_key: str | None = None):
        key = (api_key if api_key is not None else os.environ.get("GEMINI_API_KEY", "")).strip()
        if not key:
            raise RuntimeError("GEMINI_API_KEY is missing or empty")
        if not MODEL:
            raise RuntimeError("MODEL is missing or empty")
        self.client = genai.Client(api_key=key)

    def _system_instruction(self, locale: str | None) -> str:
        """
        Generate a system instruction for the Gemini model.
        """
        code = normalize_locale(locale)
        language = LOCALE_NAMES[code]
        return (
            SYSTEM_INSTRUCTION
            + f"\nReply in {language} unless the user explicitly asks for another language."
        )

    def _config(self, locale: str | None) -> types.GenerateContentConfig:
        """
        Generate a config for the Gemini model.
        """
        return types.GenerateContentConfig(
            system_instruction=self._system_instruction(locale),
            temperature=0.3, # temperature: controls the randomness of the model's output
            max_output_tokens=900, # max_output_tokens: controls the maximum number of tokens in the output
        )


    def generate_response(self, prompt: str, locale: str | None = None) -> str:
        """
        Generate a response to a prompt using the Gemini model. 
        """
        context = retrieve(prompt)
        response = self.client.models.generate_content(
            model=MODEL,
            contents=f"CONTEXT:\n{context}\n\nQUESTION: {prompt}",
            config=self._config(locale),
        )
        text = _extract_text(response)
        if not text:
            raise RuntimeError("Empty or blocked model response")
        return text

    async def open_stream(self, prompt: str, locale: str | None = None):
        """
        Retrieve context and open the Gemini stream before HTTP headers are sent.
        """
        context = await asyncio.to_thread(retrieve, prompt)
        return await self.client.aio.models.generate_content_stream(
            model=MODEL,
            contents=f"CONTEXT:\n{context}\n\nQUESTION: {prompt}",
            config=self._config(locale),
        )

    async def iter_stream(self, stream) -> AsyncIterator[str]:
        """
        Iterate over the stream and yield the text chunks.
        """
        async for chunk in stream:
            text = _extract_text(chunk)
            if text:
                yield text

    async def stream_response(
        self, prompt: str, locale: str | None = None
    ) -> AsyncIterator[str]:
        """
        Stream a response to a prompt using the Gemini model.
        """
        stream = await self.open_stream(prompt, locale=locale)
        async for text in self.iter_stream(stream):
            yield text

    def close(self):
        self.client.close()
