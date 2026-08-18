import type { Message } from "@/lib/chat-types";

export const CHAT_STATE_KEY = "chat_state_v1";
export const CHAT_SAVE_OPT_IN_KEY = "chat_save_opt_in_v1";

type ChatStateV1 = {
  version: 1;
  messages: Message[];
};

export function isSaveOptedIn(): boolean {
  try {
    return localStorage.getItem(CHAT_SAVE_OPT_IN_KEY) === "1";
  } catch {
    return false;
  }
}

export function setSaveOptIn(enabled: boolean) {
  try {
    if (enabled) {
      localStorage.setItem(CHAT_SAVE_OPT_IN_KEY, "1");
    } else {
      localStorage.removeItem(CHAT_SAVE_OPT_IN_KEY);
      localStorage.removeItem(CHAT_STATE_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function loadChatMessages(maxMessages: number): Message[] {
  try {
    if (!isSaveOptedIn()) return [];
    const raw = localStorage.getItem(CHAT_STATE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatStateV1;
    if (parsed?.version !== 1 || !Array.isArray(parsed.messages)) {
      localStorage.removeItem(CHAT_STATE_KEY);
      return [];
    }
    return parsed.messages
      .filter(
        (m): m is Message =>
          !!m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.text === "string",
      )
      .slice(-maxMessages);
  } catch {
    try {
      localStorage.removeItem(CHAT_STATE_KEY);
    } catch {
      /* ignore */
    }
    return [];
  }
}

export function saveChatMessages(messages: Message[]) {
  try {
    if (!isSaveOptedIn()) return;
    const payload: ChatStateV1 = { version: 1, messages };
    localStorage.setItem(CHAT_STATE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearChatMessages() {
  try {
    localStorage.removeItem(CHAT_STATE_KEY);
  } catch {
    /* ignore */
  }
}
