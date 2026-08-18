import { beforeEach, describe, expect, it } from "vitest";
import {
  CHAT_STATE_KEY,
  clearChatMessages,
  isSaveOptedIn,
  loadChatMessages,
  saveChatMessages,
  setSaveOptIn,
} from "./chat-storage";

describe("chat storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("does not persist unless opted in", () => {
    expect(isSaveOptedIn()).toBe(false);
    saveChatMessages([{ role: "user", text: "hi" }]);
    expect(localStorage.getItem(CHAT_STATE_KEY)).toBeNull();
  });

  it("saves and restores when opted in", () => {
    setSaveOptIn(true);
    saveChatMessages([
      { role: "user", text: "hi" },
      { role: "assistant", text: "hello" },
    ]);
    expect(loadChatMessages(30)).toEqual([
      { role: "user", text: "hi" },
      { role: "assistant", text: "hello" },
    ]);
    clearChatMessages();
    expect(loadChatMessages(30)).toEqual([]);
  });

  it("clears corrupt payloads", () => {
    setSaveOptIn(true);
    localStorage.setItem(CHAT_STATE_KEY, "{not-json");
    expect(loadChatMessages(30)).toEqual([]);
  });
});
