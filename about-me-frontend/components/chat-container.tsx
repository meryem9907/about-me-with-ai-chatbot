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

export default function ChatContainer() {
  return (
    <div>
      <PixelBox className="p-10 w-fit" tone="cyan">
        <PixelSectionHeader
          className="p-5"
          eyebrow=""
          title="Chat with my AI Assistant"
          description=""
        />
        <PixelDivider label="..." tone="green" spacing="sm" />
        <PixelBox>
          <PixelScrollArea aria-label="Scrollable region" maxHeight={280}>
            <div className="space-y-2 p-3">
              <MessageBubbleUser />
              <MessageBubbleAssistant />
            </div>
          </PixelScrollArea>
        </PixelBox>
        <PixelBox tone="cyan">
          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <PixelTextarea
                className=" w-full"
                tone="cyan"
                label="Prompt"
                placeholder="Ask a question about me, e.g. What are Meryem's strengths?"
              />
            </div>
            <PixelButton
              tone="cyan"
              className="text-retro-text pxl-corner-md pxl-button-md !filter-none "
              iconLeft={<PxlKitIcon icon={Send} size={24} />}
            ></PixelButton>
          </div>
        </PixelBox>
      </PixelBox>
    </div>
  );
}


