#!/bin/sh
set -e
# Bind immediately so Fly's proxy can connect. Ingest/ONNX warmup happens in app lifespan.
exec uvicorn main:app --host 0.0.0.0 --port 8000
