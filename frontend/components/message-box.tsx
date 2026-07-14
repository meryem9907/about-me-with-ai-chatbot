import { PixelBox, PixelDivider, PixelScrollArea, PixelSectionHeader } from "@pxlkit/ui-kit";
import { MessageBubbleAssistant, MessageBubbleDefault, MessageBubbleUser } from "./message-bubble";
import { Message } from "@/models/Message";
import { Dispatch, SetStateAction } from "react";

export default function MessageBox({ messages,  description}:{messages:Message[],  description:string}){
    return (
    <>
       
        <PixelBox>
          <PixelScrollArea aria-label="Chat Window" maxHeight={500} className="">
            
            <div className="space-y-2 p-3">
              <MessageBubbleDefault text={description}/>
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