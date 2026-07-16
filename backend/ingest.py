from pathlib import Path
import chromadb
from chromadb.utils import embedding_functions

CHUNK_SIZE = 800
OVERLAP = 100
# Free local embeddings — no API cost
ef = embedding_functions.DefaultEmbeddingFunction()

# Create a persistent client
client = chromadb.PersistentClient(path="./chroma_data")
# Get or create a collection
col = client.get_or_create_collection("about_me", embedding_function=ef)

# Chunk text into smaller chunks
def chunk_text(text: str, size=CHUNK_SIZE, overlap=OVERLAP):
    chunks, i = [], 0
    while i < len(text):
        chunks.append(text[i : i + size])
        i += size - overlap
    return chunks

# Ingest the text into the collection
ids, documents, metadatas = [], [], []
# Iterate over the files in the knowledge folder
for path in Path("knowledge").rglob("*"):
    if path.suffix.lower() not in {".md", ".txt"}:
        continue
    text = path.read_text(encoding="utf-8")
    # Chunk the text into smaller chunks
    for i, chunk in enumerate(chunk_text(text)):
        # Add the id, document and metadata to the lists
        ids.append(f"{path.stem}-{i}")
        documents.append(chunk)
        # Add the source to the metadata
        metadatas.append({"source": path.name})
        
# Upsert the chunks into the collection
if ids:
    col.upsert(ids=ids, documents=documents, metadatas=metadatas)
else:
    print("No documents found in knowledge/")
    
    
print(f"Ingested {len(ids)} chunks")