"use client";
import { PixelBox, PixelDivider, PixelSectionHeader } from "@pxlkit/ui-kit";
import { useEffect, useState } from "react";
import PromptField from "./prompt-field";
import MessageBox from "./message-box";
import { Message } from "@/models/Message";
import { loadMesssages,  saveMessages } from "@/utils/persist_messages";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_MESSAGES = process.env.MAX_MESSAGES ?? 300;

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


  useEffect(() => {
    loadMesssages(setMessages, setPrompt);
  }, []);

  useEffect(() => {
    saveMessages(messages, prompt);
  }, [messages, prompt]);

  async function fetchMessages(prompt: string = "Hello!") {
    try {
      const newMsg:Message[] = [{ role: "user", text: prompt }, { role: "assistant", text: "" }]
      setMessages((prev) => [...prev, ...newMsg].slice(-MAX_MESSAGES)); 
      const response = await fetch(
        `${API_URL}/stream?prompt=${encodeURIComponent(prompt)}`, // use more context later
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
          console.log(prev);
          const next = [...prev];
          const last = next[next.length - 1];
          // appends chunk to end
          next[next.length - 1] = { ...last, text: last.text + chunk };
          return next.slice(-MAX_MESSAGES);
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
        <MessageBox messages={messages} description={description} onMessage={fetchMessages} />
        <PromptField
          placeholder={placeholder}
          onMessage={fetchMessages}
          prompt={prompt}
          setPrompt={setPrompt}
          setMessages={setMessages}
        ></PromptField>
      </PixelBox>
    </div>
  );
}
