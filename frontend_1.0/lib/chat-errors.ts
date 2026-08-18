export type ChatErrorKind =
  | "network"
  | "rate_limit"
  | "stream"
  | "aborted"
  | "unknown";

export type ChatError = {
  kind: ChatErrorKind;
  retryAfterMs?: number;
};

export function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error && error.name === "AbortError")
  );
}

export function parseRetryAfterMs(header: string | null): number | undefined {
  if (!header) return undefined;
  const asInt = Number(header);
  if (!Number.isNaN(asInt) && asInt >= 0) return asInt * 1000;
  const date = Date.parse(header);
  if (!Number.isNaN(date)) return Math.max(0, date - Date.now());
  return undefined;
}

export function errorFromResponse(response: Response): ChatError {
  if (response.status === 429) {
    return {
      kind: "rate_limit",
      retryAfterMs: parseRetryAfterMs(response.headers.get("Retry-After")),
    };
  }
  return { kind: "stream" };
}

export function errorFromUnknown(error: unknown): ChatError {
  if (isAbortError(error)) {
    return { kind: "aborted" };
  }
  if (error instanceof TypeError) {
    return { kind: "network" };
  }
  if (error && typeof error === "object" && "kind" in error) {
    return error as ChatError;
  }
  return { kind: "unknown" };
}
