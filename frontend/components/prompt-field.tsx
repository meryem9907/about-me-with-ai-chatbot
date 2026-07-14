import { PxlKitIcon } from "@pxlkit/core";
import { PixelBox, PixelIconButton, PixelTextarea } from "@pxlkit/ui-kit";
import { ArrowRight } from "@/app/icons/arrow-right";
import { Dispatch, EventHandler, SetStateAction, useState } from "react";

 export default function PromptField({placeholder, onMessage, prompt, setPrompt}:{placeholder:string, onMessage:(text:string)=>Promise<void>, prompt:string, setPrompt:Dispatch<SetStateAction<string>>}) {

     return (<>
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
            <PixelIconButton
            label="Send Message"
              className="pxl-corner-md pxl-button-md !filter-none  bg-retro-bg hover:bg-border "
              icon={<PxlKitIcon icon={ArrowRight} size={24} color="white"/>}
              onClick={() => {
                onMessage(prompt);
                setPrompt("");
              }}
            ></PixelIconButton>
          </div>
        </PixelBox>
        </>
     )
 }