import { describe, expect, it } from "vitest";
import {
  errorFromResponse,
  errorFromUnknown,
  isAbortError,
  parseRetryAfterMs,
} from "./chat-errors";

describe("chat errors", () => {
  it("parses Retry-After seconds", () => {
    expect(parseRetryAfterMs("12")).toBe(12_000);
  });

  it("maps 429 responses with and without Retry-After", () => {
    const withHeader = new Response(null, {
      status: 429,
      headers: { "Retry-After": "5" },
    });
    expect(errorFromResponse(withHeader)).toEqual({
      kind: "rate_limit",
      retryAfterMs: 5_000,
    });

    const withoutHeader = new Response(null, { status: 429 });
    expect(errorFromResponse(withoutHeader)).toEqual({
      kind: "rate_limit",
      retryAfterMs: undefined,
    });
  });

  it("maps network TypeError", () => {
    expect(errorFromUnknown(new TypeError("Failed to fetch"))).toEqual({
      kind: "network",
    });
  });

  it("maps abort errors", () => {
    const abort = new DOMException("Aborted", "AbortError");
    expect(isAbortError(abort)).toBe(true);
    expect(errorFromUnknown(abort)).toEqual({ kind: "aborted" });
  });
});
