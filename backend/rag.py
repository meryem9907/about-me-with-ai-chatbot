from __future__ import annotations

import threading
from pathlib import Path

import chromadb

try:
    from chromadb.utils.embedding_functions import ONNXMiniLM_L6_V2
except ImportError:  # pragma: no cover - older chromadb layouts
    from chromadb.utils.embedding_functions.onnx_mini_lm_l6_v2 import (
        ONNXMiniLM_L6_V2,
    )

BASE_DIR = Path(__file__).resolve().parent
CHROMA_PATH = str(BASE_DIR / "chroma_data")
COLLECTION_NAME = "about_me"
KNOWLEDGE_DIR = BASE_DIR / "knowledge"

_lock = threading.Lock()
_embedding_fn = None
_client = None
_col = None


def _get_embedding_fn():
    """Load MiniLM once; constructing it at import would block Fly cold starts."""
    global _embedding_fn
    if _embedding_fn is None:
        _embedding_fn = ONNXMiniLM_L6_V2()
    return _embedding_fn


def get_client():
    global _client
    if _client is None:
        _client = chromadb.PersistentClient(path=CHROMA_PATH)
    return _client


def get_collection():
    """Collection used for query/ingest (needs the real embedding function)."""
    global _col
    with _lock:
        if _col is None:
            _col = get_client().get_or_create_collection(
                COLLECTION_NAME,
                embedding_function=_get_embedding_fn(),
            )
        return _col


def reset_collection():
    """Drop and recreate the collection (used by ingest to avoid orphan chunks)."""
    global _col
    with _lock:
        client = get_client()
        try:
            client.delete_collection(COLLECTION_NAME)
        except Exception:
            pass
        _col = client.get_or_create_collection(
            COLLECTION_NAME,
            embedding_function=_get_embedding_fn(),
        )
        return _col


def _collection_names() -> set[str]:
    names: set[str] = set()
    for item in get_client().list_collections():
        if isinstance(item, str):
            names.add(item)
        else:
            name = getattr(item, "name", None)
            if name:
                names.add(name)
    return names


def collection_exists() -> bool:
    return COLLECTION_NAME in _collection_names()


def collection_count() -> int:
    """Return stored chunk count. 0 only when the collection is missing."""
    if COLLECTION_NAME not in _collection_names():
        return 0
    return get_collection().count()


def warm_embeddings() -> None:
    """Touch the ONNX model once so the first user request is not cold."""
    _get_embedding_fn()(["warmup"])


def retrieve(question: str, k: int = 4) -> str:
    hits = get_collection().query(query_texts=[question], n_results=k)
    docs = (hits.get("documents") or [[]])[0]
    metas = (hits.get("metadatas") or [[]])[0]
    if not docs:
        return ""
    parts = []
    for doc, meta in zip(docs, metas):
        source = (meta or {}).get("source", "unknown")
        parts.append(f"[{source}]\n{doc}")
    return "\n\n---\n\n".join(parts)
