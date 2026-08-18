# Chat edge-case matrix (T7)

| Case | Expected | Status |
|------|----------|--------|
| Missing `NEXT_PUBLIC_API_URL` | Inline/toast “API not configured”; no fetch | Handled in `sendPrompt` |
| Corrupt `chat_state_v1` | Cleared; empty thread | `loadChatMessages` try/catch |
| Stream abort (Stop / unmount) | No error toast; empty assistant stub removed | `AbortController` + `isAbortError` |
| Double submit while streaming | Blocked by `isStreaming` + disabled submit | Handled |
| Locale switch mid-stream | In-flight abort on unmount; new page fresh | Abort on cleanup |
| 429 without `Retry-After` | Default 15s cooldown + message | `retryAfterMs ?? 15_000` |
| 429 with `Retry-After` seconds | Cooldown matches header | `parseRetryAfterMs` |
| Empty / whitespace prompt | No request | Early return |
| Save opt-in off | No `chat_state_v1` writes | `saveChatMessages` guard |
