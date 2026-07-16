import chromadb
from chromadb.utils import embedding_functions

# Free local embeddings — no API cost
ef = embedding_functions.DefaultEmbeddingFunction()
# Create a persistent client
client = chromadb.PersistentClient(path="./chroma_data")
col = client.get_or_create_collection("about_me", embedding_function=ef)

def retrieve(question: str, k: int = 4) -> str:
    hits = col.query(query_texts=[question], n_results=k)
    # Get the documents and metadata
    docs = hits["documents"][0]
    metas = hits["metadatas"][0]
    if not docs:
        return ""
    # Join the documents and metadata
    return "\n\n---\n\n".join(
        f"[{m['source']}]\n{d}" for d, m in zip(docs, metas)
    )