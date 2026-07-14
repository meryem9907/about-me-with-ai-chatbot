"use client";
import {
  PixelBox,
  PixelIconButton,
  PixelDivider,
  PixelScrollArea,
  PixelSectionHeader,
  PixelTextarea,
} from "@pxlkit/ui-kit";
import { PxlKitIcon } from "@pxlkit/core";
import {
  MessageBubbleAssistant,
  MessageBubbleDefault,
  MessageBubbleUser,
} from "./message-bubble";
import { useState } from "react";
import { ArrowRight } from "@/app/icons/arrow-right";
import PromptField from "./prompt-field";
import MessageBox from "./message-box";
import { Message } from "@/models/Message";

export default function ChatContainer({
  chatTitle,
  chatDescription,
  placeholder,
}: {
  chatTitle: string;
  chatDescription: string;
  placeholder: string;
}) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const title = chatTitle;
  const description = chatDescription;

  async function fetchMessages(prompt: string = "Hello!") {
    try {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: prompt },
        { role: "assistant", text: "" },
      ]);
      const response = await fetch(
        `http://localhost:8000/stream?prompt=${encodeURIComponent(prompt)}`, // use more context later
      );
      if (!response.ok || !response.body) throw new Error("Stream failed");

      // reads response chunk by chunk
      const reader = response.body.getReader();
      const decoder = new TextDecoder(); 

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          console.log(prev)
          const next = [...prev];
          const last = next[next.length - 1];
          // appends chunk to end
          next[next.length - 1] = { ...last, text: last.text + chunk };
          return next;
        });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center pb-50 w-full px-0  sm:px-10">
      <PixelBox className="p-10 w-full w-[100rem]" tone="cyan">
        <PixelSectionHeader
          align="center"
          className="p-5 flex flex-col items-center justify-center"
          eyebrow=""
          title={title}
        />
        <PixelDivider label="..." tone="green" spacing="sm" />
        <MessageBox
          messages={messages}
          description={description}
        />
        <PromptField
          placeholder={placeholder}
          onMessage={fetchMessages}
          prompt={prompt}
          setPrompt={setPrompt}
        ></PromptField>
      </PixelBox>
    </div>
  );
}
