import { PixelBox, PixelDivider, PixelScrollArea, PixelSectionHeader } from "@pxlkit/ui-kit";
import { MessageBubbleAssistant, MessageBubbleDefault, MessageBubbleUser } from "./message-bubble";
import { Message } from "@/models/Message";
import { Dispatch, SetStateAction } from "react";
import StarterPrompts from "./starter_prompt-fields";

export default function MessageBox({ messages,  description, onMessage}:{messages:Message[],  description:string,   onMessage: (text: string) => Promise<void>}, ){
    return (
    <>
       
        <PixelBox>
          <PixelScrollArea aria-label="Chat Window" maxHeight={500} className="">
            
            <div className="space-y-2 p-3">
              <MessageBubbleDefault text={description}/>
              <StarterPrompts onMessage={onMessage}></StarterPrompts>
              {messages.map((message, i) =>
                message.role === "user" ? (
                  <MessageBubbleUser key={i} text={message.text} />
                ) : (
                  <MessageBubbleAssistant key={i} text={message.text} />
                ),
              )}
            </div>
          </PixelScrollArea>
        </PixelBox>
    </>
    )
}