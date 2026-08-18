#!/bin/sh
set -e
python - <<'PY'
from rag import collection_count
import subprocess
import sys

if collection_count() == 0:
    print("Chroma collection empty; running ingest...")
    subprocess.check_call([sys.executable, "ingest.py"])
else:
    print(f"Chroma collection ready ({collection_count()} chunks)")
PY
exec uvicorn main:app --host 0.0.0.0 --port 8000
