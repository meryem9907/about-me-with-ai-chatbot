import { PixelBox,  PixelScrollArea} from "@pxlkit/ui-kit";
import { MessageBubbleAssistant, MessageBubbleDefault, MessageBubbleUser } from "./message-bubble";
import { Message } from "@/models/Message";
import { useEffect, useRef } from "react";
import StarterPrompts from "./starter-prompt-fields";

export default function MessageBox({ messages,  description, onMessage, mainWindowBottomRef}:{messages:Message[],  description:string,   onMessage: (text: string) => Promise<void>, mainWindowBottomRef: React.RefObject<HTMLDivElement | null>} ){
  const chatWindowBottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatWindowBottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    mainWindowBottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mainWindowBottomRef, messages]);  
  return (
    <>
       
        <PixelBox>
          <PixelScrollArea  aria-label="Chat Window" maxHeight={500} className="overflow-y-auto">
            
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
            <div ref={chatWindowBottomRef} />
          </PixelScrollArea>
     
        </PixelBox>
    </>
    )
}