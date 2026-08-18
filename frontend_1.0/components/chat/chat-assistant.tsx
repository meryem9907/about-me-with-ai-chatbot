"use client";

import SendIcon from "@/icons/send-icon";
import {
  memo,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  clearChatMessages,
  isSaveOptedIn,
  loadChatMessages,
  saveChatMessages,
  setSaveOptIn,
} from "@/lib/chat-storage";
import {
  errorFromResponse,
  errorFromUnknown,
  isAbortError,
  type ChatError,
  type ChatErrorKind,
} from "@/lib/chat-errors";
import { useToast } from "@/components/toast-provider";
import ChatMarkdown from "@/components/chat/chat-markdown";
import Loader from "@/components/loader";
import type { Message } from "@/lib/chat-types";

export type { Message };

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function clampMaxMessages(raw: number): number {
  if (!Number.isFinite(raw) || raw < 1) return 30;
  return Math.min(100, Math.floor(raw));
}

const MAX_MESSAGES = clampMaxMessages(
  Number(process.env.NEXT_PUBLIC_MAX_MESSAGES ?? 30),
);

type UiMessage = Message & { id: string };

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const ChatBubble = memo(function ChatBubble({
  role,
  text,
  streaming,
  loadingLabel,
}: {
  role: Message["role"];
  text: string;
  streaming: boolean;
  loadingLabel: string;
}) {
  const className =
    role === "assistant"
      ? "chat-md prose prose-zinc dark:prose-invert max-w-none rounded-2xl bg-surface px-4 py-3 text-foreground"
      : "chat-md prose prose-zinc dark:prose-invert max-w-none break-words rounded-2xl bg-accent-soft px-4 py-3 text-foreground";

  let body: ReactNode;
  if (role === "assistant" && streaming) {
    body = text.trim() ? (
      <p className="whitespace-pre-wrap">{text}</p>
    ) : (
      <Loader size="md" label={loadingLabel} />
    );
  } else {
    body = <ChatMarkdown text={text} />;
  }
  return <div className={className}>{body}</div>;
});

export default function ChatAssistant() {
  const t = useTranslations("Chat");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const { toast } = useToast();
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);
  const [cooldownMs, setCooldownMs] = useState(0);
  const [isInputFixed, setIsInputFixed] = useState(false);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const liveStatusRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  const nearBottomRef = useRef(true);
  const lastScrollAtRef = useRef(0);
  const listId = useId();

  function messageForKind(kind: ChatErrorKind) {
    switch (kind) {
      case "rate_limit":
        return t("rateLimit");
      case "network":
        return t("network");
      case "stream":
        return t("streamFailed");
      case "aborted":
        return t("stopped");
      default:
        return t("unknown");
    }
  }

  useEffect(() => {
    mountedRef.current = true;
    queueMicrotask(() => {
      setSaveEnabled(isSaveOptedIn());
      setMessages(
        loadChatMessages(MAX_MESSAGES).map((m) => ({ ...m, id: makeId() })),
      );
      setHydrated(true);
    });
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!hydrated || isStreaming) return;
    if (saveEnabled) {
      saveChatMessages(messages.map(({ role, text }) => ({ role, text })));
    }
  }, [messages, saveEnabled, hydrated, isStreaming]);

  useEffect(() => {
    if (!nearBottomRef.current) return;
    const now = Date.now();
    if (isStreaming && now - lastScrollAtRef.current < 120) return;
    lastScrollAtRef.current = now;
    scrollRef.current?.scrollIntoView({
      behavior: isStreaming ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, isStreaming]);

  useEffect(() => {
    const onScroll = () => {
      setIsInputFixed(window.scrollY > 100);
      const doc = document.documentElement;
      const distanceFromBottom =
        doc.scrollHeight - window.scrollY - window.innerHeight;
      nearBottomRef.current = distanceFromBottom < 160;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (cooldownMs <= 0) return;
    const id = window.setInterval(() => {
      setCooldownMs((ms) => Math.max(0, ms - 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [cooldownMs > 0]); // eslint-disable-line react-hooks/exhaustive-deps -- only restart when entering/leaving cooldown

  function announce(status: string) {
    if (liveStatusRef.current) {
      liveStatusRef.current.textContent = status;
    }
  }

  function stopStreaming() {
    abortRef.current?.abort();
  }

  async function sendPrompt(text: string) {
    if (!text || isStreaming || cooldownMs > 0) return;
    if (!API_URL) {
      setError({ kind: "unknown" });
      toast(t("apiMissing"));
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLastPrompt(text);
    setError(null);
    setIsStreaming(true);
    announce(t("replying"));

    const userMsg: UiMessage = { id: makeId(), role: "user", text };
    const assistantMsg: UiMessage = {
      id: makeId(),
      role: "assistant",
      text: "",
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg].slice(-MAX_MESSAGES));
    setValue("");

    try {
      const url = new URL(`${API_URL}/stream`);
      url.searchParams.set("locale", locale);

      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
          "Accept-Language": locale,
        },
        body: JSON.stringify({ prompt: text }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw errorFromResponse(response);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value: chunkValue } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(chunkValue, { stream: true });
        if (!chunk) continue;
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (!last || last.role !== "assistant") return next;
          next[next.length - 1] = { ...last, text: last.text + chunk };
          return next.slice(-MAX_MESSAGES);
        });
      }

      const tail = decoder.decode();
      if (tail) {
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (!last || last.role !== "assistant") return next;
          next[next.length - 1] = { ...last, text: last.text + tail };
          return next.slice(-MAX_MESSAGES);
        });
      }

      announce(t("finished"));
    } catch (err) {
      if (isAbortError(err)) {
        announce(t("stopped"));
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === "assistant" && last.text === "") {
            next.pop();
          }
          return next;
        });
        return;
      }
      const chatError = errorFromUnknown(err);
      const message = messageForKind(chatError.kind);
      setError(chatError);
      toast(message);
      announce(message);
      if (chatError.kind === "rate_limit") {
        setCooldownMs(chatError.retryAfterMs ?? 15_000);
      }
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === "assistant" && last.text === "") {
          next.pop();
        }
        return next;
      });
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
      if (mountedRef.current) {
        setIsStreaming(false);
      }
    }
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    await sendPrompt(value.trim());
  }

  function handleSaveToggle(checked: boolean) {
    setSaveEnabled(checked);
    setSaveOptIn(checked);
    if (checked) {
      saveChatMessages(messages.map(({ role, text }) => ({ role, text })));
      toast(t("savedToast"));
    } else {
      clearChatMessages();
      toast(t("unsavedToast"));
    }
  }

  function handleClear() {
    abortRef.current?.abort();
    setMessages([]);
    clearChatMessages();
    setError(null);
    toast(t("clearedToast"));
  }

  const formClass = isInputFixed
    ? "fixed rounded-t-2xl bottom-0 left-1/2 z-30 w-full md:min-w-4xl -translate-x-1/2 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-4 bg-background shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
    : "mx-auto mb-2 flex md:min-w-4xl items-center gap-2";

  const cooldownSeconds = Math.ceil(cooldownMs / 1000);
  const streamingAssistantId =
    isStreaming && messages[messages.length - 1]?.role === "assistant"
      ? messages[messages.length - 1]?.id
      : null;

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-8 text-2xl md:p-4 md:text-4xl">
      <h1 className="mb-2 mt-20 shrink-0 text-2xl md:text-4xl">{t("title")}</h1>
      {isInputFixed && <div className="h-16" />}

      <form onSubmit={handleSubmit} className={formClass}>
        <div className="relative w-full ">
          <label htmlFor="chat-input" className="sr-only">
            {t("messageLabel")}
          </label>
          <textarea
            id="chat-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("placeholder")}
            disabled={isStreaming || cooldownMs > 0}
            rows={2}
            className="w-full  min-h-[2.75rem] md:min-h-20   rounded border border-border bg-surface px-6 py-3 pr-20 text-base text-foreground 
            outline-none placeholder:text-muted disabled:opacity-60"
          />
          <button
            type="submit"
            aria-label={isStreaming ? tCommon("loading") : t("send")}
            disabled={isStreaming || cooldownMs > 0 || !value.trim()}
            className="absolute top-1/2 right-2 min-h-11 min-w-11 -translate-y-1/2 cursor-pointer px-3 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isStreaming ? (
              <Loader size="sm" label={tCommon("loading")} />
            ) : (
              <SendIcon className="h-8 w-8" />
            )}
          </button>
        </div>
      </form>

      <div
        ref={liveStatusRef}
        id={listId}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      {error && error.kind !== "aborted" && (
        <div
          role="alert"
          className="mt-3 w-full max-w-xl shrink-0 rounded-md border border-danger bg-danger-soft px-4 py-3 text-sm text-danger"
        >
          <p>{messageForKind(error.kind)}</p>
          {cooldownMs > 0 && (
            <p className="mt-1">{t("cooldown", { seconds: cooldownSeconds })}</p>
          )}
          {cooldownMs <= 0 && lastPrompt && (
            <button
              type="button"
              className="mt-2 underline"
              onClick={() => sendPrompt(lastPrompt)}
              disabled={isStreaming}
            >
              {t("retry")}
            </button>
          )}
        </div>
      )}

      <p className="text-sm text-muted">{t("privacyHint")}</p>

      <div className="mt-4 flex w-full max-w-xl flex-wrap items-center justify-between gap-3 text-sm">
        <label className="inline-flex items-center gap-2 text-foreground">
          <input
            type="checkbox"
            checked={saveEnabled}
            onChange={(e) => handleSaveToggle(e.target.checked)}
            className="size-4 accent-[var(--accent)]"
          />
          {t("saveToggle")}
        </label>
        <div className="flex gap-2">
          {isStreaming && (
            <button
              type="button"
              onClick={stopStreaming}
              className="min-h-11 rounded-md border border-border bg-surface px-3 py-1.5 text-foreground"
            >
              {t("stop")}
            </button>
          )}
          <button
            type="button"
            onClick={handleClear}
            className="min-h-11 rounded-md border border-border bg-surface px-3 py-1.5 text-foreground"
          >
            {t("clear")}
          </button>
        </div>
      </div>

      <div
        className="mt-8 mb-9  min-h-[2.75rem] md:min-h-20   w-full max-w-4xl flex-1 space-y-3 overflow-y-auto text-base"
        aria-live="off"
      >
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            role={msg.role}
            text={msg.text}
            streaming={msg.id === streamingAssistantId}
            loadingLabel={tCommon("loading")}
          />
        ))}
      </div>
      <div className="pb-20" ref={scrollRef} />
    </div>
  );
}
