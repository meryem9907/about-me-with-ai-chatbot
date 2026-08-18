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

# Single ONNX session for process lifetime (DefaultEmbeddingFunction recreates per call).
_embedding_fn = ONNXMiniLM_L6_V2()
_client = chromadb.PersistentClient(path=CHROMA_PATH)
_col = _client.get_or_create_collection(
    COLLECTION_NAME,
    embedding_function=_embedding_fn,
)


def get_client():
    return _client


def get_collection():
    return _col


def reset_collection():
    """Drop and recreate the collection (used by ingest to avoid orphan chunks)."""
    global _col
    try:
        _client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass
    _col = _client.get_or_create_collection(
        COLLECTION_NAME,
        embedding_function=_embedding_fn,
    )
    return _col


def collection_count() -> int:
    return get_collection().count()


def warm_embeddings() -> None:
    """Touch the ONNX model once so the first user request is not cold."""
    _embedding_fn(["warmup"])


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
