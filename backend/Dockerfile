FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Strip Windows CRLF so the script runs on Linux even if checked out on Windows.
RUN sed -i 's/\r$//' entrypoint.sh && chmod +x entrypoint.sh

# Cache MiniLM in the image so cold starts do not download ~80MB.
RUN python -c "from chromadb.utils.embedding_functions import ONNXMiniLM_L6_V2; ONNXMiniLM_L6_V2()(['warmup'])"

EXPOSE 8000
ENTRYPOINT ["sh", "./entrypoint.sh"]
