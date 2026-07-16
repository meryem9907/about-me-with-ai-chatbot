import { Message } from "@/models/Message";
import { Dispatch, SetStateAction } from "react";

const STORAGE_KEY = "chat_state_v1";
const MAX_MESSAGES = 30;


export function loadMesssages(
  setMessages: Dispatch<SetStateAction<Message[]>>,

  setPrompt: Dispatch<SetStateAction<string>>,
) {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    setMessages((saved.messages ?? []).slice(-MAX_MESSAGES));
    setPrompt(saved.prompt ?? "");
  } catch {}
}

export function saveMessages(messages: Message[], prompt: string) {
    const lastMessages = messages.slice(-MAX_MESSAGES); // keep newest N
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ lastMessages, prompt }));
}

export function removeMessages() {
    localStorage.removeItem(STORAGE_KEY);

}
