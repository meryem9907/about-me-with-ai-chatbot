import { PixelStack } from "@pxlkit/ui-kit";
const assistantBubble =
  "max-w-[75%] bg-retro-surface text-retro-text border-2 border-retro-cyan p-4 pxl-corner-md";
const userBubble =
  "max-w-[75%] bg-retro-card text-black border-2 border-retro-gold p-4 pxl-corner-md";

export function MessageBubbleAssistant() {
    return (
        <PixelStack gap={4} align="start">
      <div className={assistantBubble}>My Name is Meryem.</div>
      
    </PixelStack>
    )
}

export function MessageBubbleUser() {
    return (
        <PixelStack gap={4} align="end" >
      <div className={userBubble}>What is your name?</div>

    </PixelStack>
    )
}