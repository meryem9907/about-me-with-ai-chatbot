"use client"

import ChatbotPage from "@/app/chatbot/page";
import QuickView from "@/app/quick-view/page";
import { AnimatedPxlKitIcon, PxlKitIcon } from "@pxlkit/core";
import {  PixelTabs,  TabItem } from "@pxlkit/ui-kit";
import { TypingDots } from '@pxlkit/feedback';
import { BlinkingEye } from '@pxlkit/social';

export default function MenuBar() {
   const items:TabItem[] =
    [
        {id: "chatbot", label: "Chatbot", content:<ChatbotPage />, icon:<AnimatedPxlKitIcon icon={TypingDots} size={32}  />},
        {id: "quickview", label: "Quick View", content:<QuickView />, icon:<AnimatedPxlKitIcon icon={BlinkingEye} size={32}  />}
    ]
   
  return (
    <PixelTabs items={items} />
  );
}
