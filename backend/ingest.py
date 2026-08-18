"""
Ingest the knowledge base into the vector database. Load data from KNOWLEDGE_DIR, chunk it into smaller chunks, 
embed them, and store them in the vector database/collection."""
from pathlib import Path

from rag import KNOWLEDGE_DIR, reset_collection

# Stay under MiniLM's ~256-token window (~4 chars/token → ~1000 max; use headroom).
CHUNK_SIZE = 450 
OVERLAP = 50


def chunk_text(text: str, size: int = CHUNK_SIZE, overlap: int = OVERLAP):
    """Chunk text into smaller chunks."""
    chunks, i = [], 0
    step = max(1, size - overlap)
    while i < len(text):
        chunks.append(text[i : i + size])
        i += step
    return chunks


def ingest() -> int:
    """Ingest the knowledge base into the vector database."""
    col = reset_collection()
    ids, documents, metadatas = [], [], []

    for path in sorted(KNOWLEDGE_DIR.rglob("*")):
        if path.suffix.lower() not in {".md", ".txt"}:
            continue
        text = path.read_text(encoding="utf-8")
        rel = path.relative_to(KNOWLEDGE_DIR).as_posix()
        for i, chunk in enumerate(chunk_text(text)):
            ids.append(f"{rel}-{i}")
            documents.append(chunk)
            metadatas.append({"source": rel})

    if ids:
        # embedding: updates existing items, or adds them if they don’t yet exist
        col.upsert(ids=ids, documents=documents, metadatas=metadatas)
    else:
        print(f"No documents found in {KNOWLEDGE_DIR}/")

    print(f"Ingested {len(ids)} chunks")
    return len(ids)


if __name__ == "__main__":
    ingest()
