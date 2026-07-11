"use client";
import {
  PixelBox,
  PixelButton,
  PixelDivider,
  PixelScrollArea,
  PixelSectionHeader,
  PixelTextarea,
} from "@pxlkit/ui-kit";
import { PxlKitIcon } from "@pxlkit/core";
import { MessageBubbleAssistant, MessageBubbleUser } from "./message-bubble";
import { Send } from "@pxlkit/feedback";
import { useState } from "react";
type Message = { role: "user" | "assistant"; text: string };


export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");

  async function fetchMessages(
    prompt: string = "Hello!",
  ) {
    try {
      setMessages((prev) => [
    ...prev,
    { role: "user", text: prompt },
    { role: "assistant", text: "" },
  ]);
      const response = await fetch(
        `http://localhost:8000/stream?prompt=${encodeURIComponent(prompt)}`,
      );
      if (!response.ok || !response.body) throw new Error("Stream failed");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, text: last.text + chunk };
          return next;
        });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center pb-50 w-full">
      <PixelBox className="p-10 w-full w-[100rem]" tone="cyan">
        <PixelSectionHeader
          className="p-5 flex flex-col items-center justify-center"
          eyebrow=""
          title="Chat with my AI Assistant"
          description=""
        />
        <PixelDivider label="..." tone="green" spacing="sm" />
        <PixelBox>
          <PixelScrollArea aria-label="Scrollable region" maxHeight={500}>
            <div className="space-y-2 p-3">
             {messages.map((message, i) =>
    message.role === "user" ? (
      <MessageBubbleUser key={i} text={message.text} />
    ) : (
      <MessageBubbleAssistant key={i} text={message.text} />
    )
  )}
            </div>
          </PixelScrollArea>
        </PixelBox>
        <PixelBox tone="cyan">
          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <PixelTextarea
                value={prompt}

                className=" w-full"
                tone="cyan"
                label="Prompt"
                placeholder="Ask a question about me, e.g. What are Meryem's strengths?"
                onChange={(e) => setPrompt(e.target.value)}
                 onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // stop newline
                const text = prompt.trim();
                if (!text) return;
                fetchMessages(text);
                setPrompt("");

              }
              }}
              />
            </div>
            <PixelButton
              
              className="pxl-corner-md pxl-button-md !filter-none  bg-retro-bg hover:bg-border "
              iconLeft={<PxlKitIcon icon={Send} size={24} />}
              onClick={() => {
                fetchMessages(prompt);
                 setPrompt("");
              }}
              
            ></PixelButton>
          </div>
        </PixelBox>
      </PixelBox>
    </div>
  );
}
