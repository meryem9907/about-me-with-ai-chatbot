"use client";

import { AnimatedPxlKitIcon, PxlKitIcon } from "@pxlkit/core";
import { PixelTabs, TabItem } from "@pxlkit/ui-kit";
import { TypingDots } from "@pxlkit/feedback";
import { BlinkingEye } from "@pxlkit/social";
import { TargetHit } from "@pxlkit/feedback";
import { MagicWand } from "@pxlkit/gamification";
import QuickViewContainer from "./projects";
import ChatContainer from "./chat-container";
import {  useRouter } from "next/navigation";

export default function TabBar() {
  const chatTitle = "Chat with my AI Assistant";
  const chatDescription = "Ask anything about me!";
  const placeholder =
    "Ask a question about me, e.g. What are Meryem's strengths?";
  const router = useRouter();
 
  const items: TabItem[] = [
    {
      id: "chatbot",
      label: "Chatbot",
      content: (
        <ChatContainer
          chatTitle={chatTitle}
          chatDescription={chatDescription}
          placeholder={placeholder}
        />
      ),
      icon: <AnimatedPxlKitIcon icon={TypingDots} size={32} />,
    },
    {
      id: "projects",
      label: "Projects",
      content: <QuickViewContainer />,
      icon: <AnimatedPxlKitIcon icon={BlinkingEye} size={32} />,
    }/* ,
    {
      id: "currentTargets",
      label: "Current Targets",
      content: <div/>,
      icon: <PxlKitIcon icon={TargetHit} size={32} />,
    },
    {
      id: "skillset",
      label: "Skillset",
      content: <div />,
      icon: <PxlKitIcon icon={MagicWand} size={32} />,
    }, */
  ];

  return (
   <div className="p-3">
      <PixelTabs
      keepMounted={true}
        items={items}
         activationMode="manual"
        onChange={(id) => {
          router.push(`?tab=${id}`);
        }}
        
      />
  </div>
  );
}
