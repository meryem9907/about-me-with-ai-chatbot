import { PixelStack, PixelTypewriter } from "@pxlkit/ui-kit";
import ReactMarkdown from "react-markdown";

const assistantBubble =
  "max-w-[75%] w-fit break-words  bg-retro-surface text-retro-text border-2 border-retro-cyan p-4 pxl-corner-md";
const userBubble =
  "max-w-[75%] w-fit break-words  bg-retro-card text-retro-text border-2 border-retro-gold p-4 pxl-corner-md";

export function MessageBubbleAssistant({text}: {  text: string}) {

    return (
        <PixelStack gap={4} align="start">
        <div className={assistantBubble}><ReactMarkdown>{text || "…"}</ReactMarkdown></div>
    </PixelStack>
    )
}

export function MessageBubbleUser({ text }: { text: string }) {
    return (
        <PixelStack gap={4} align="end" >
      <div className={userBubble}><ReactMarkdown>{text}</ReactMarkdown></div>

    </PixelStack>
    )
}

export function MessageBubbleDefault({ text }: { text: string }) {
    return (
        <PixelStack gap={4} align="start" >
      <div className={assistantBubble}><PixelTypewriter label={text} speed={40} delay={800} cursor/>
</div>

    </PixelStack>
    )
}