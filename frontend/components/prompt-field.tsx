import { PxlKitIcon } from "@pxlkit/core";
import { PixelBox, PixelIconButton, PixelTextarea, PixelTooltip } from "@pxlkit/ui-kit";
import { ArrowRight } from "@/app/icons/arrow-right";
import { Dispatch, SetStateAction } from "react";
import { removeMessages } from "@/utils/persist_messages";
import { Message } from "@/models/Message";
import { Redo } from "@/app/icons/redo";

export default function PromptField({
  placeholder,
  onMessage,
  prompt,
  setPrompt,
  setMessages
}: {
  placeholder: string;
  onMessage: (text: string) => Promise<void>;
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
  setMessages: Dispatch<SetStateAction<Message[]>>
}) {
  const clearChat = () => {
    setMessages([]);
    setPrompt("");
    removeMessages();
  };
  return (
    <>
      <PixelBox tone="cyan">
        <div className="flex w-full items-center gap-4">
          <div className="flex-1">
            <PixelTextarea
              value={prompt}

              className=" w-full"
              tone="cyan"
              label="Prompt"
              placeholder={placeholder}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // stop newline
                  const text = prompt.trim();
                  if (!text) return;
                  onMessage(text);
                  setPrompt("");
                }
              }}
            />
          </div>
          <div className="flex-col flex gap-1 justify-center">
               <PixelTooltip content="Send Message" position="bottom">
            <PixelIconButton
              label="Send Message"
              className="pxl-corner-md pxl-button-md !filter-none  bg-retro-bg hover:bg-border "
              icon={<PxlKitIcon icon={ArrowRight} size={24} color="white" />}
              onClick={() => {
                onMessage(prompt);
                setPrompt("");
              }}
            ></PixelIconButton></PixelTooltip>
            <PixelTooltip content="Reset" position="bottom">
            <PixelIconButton
              label="Reset"
              tone="red"
              className="pxl-corner-md pxl-button-md !filter-none  bg-retro-bg hover:bg-border "
              icon={<PxlKitIcon icon={Redo} size={24} color="white" />}
              onClick={() => {
                clearChat();
              }}
            ></PixelIconButton></PixelTooltip>
          </div>
        </div>
      </PixelBox>
    </>
  );
}
