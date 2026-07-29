"use client";
import { PxlKitIcon } from "@pxlkit/core";
import { Send } from "@pxlkit/feedback";
import {  PixelIconButton } from "@pxlkit/ui-kit";
import { useEffect, useState } from "react";

export default function ScrollUpBtn() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsVisible(window.scrollY > 100);
    });
  }, []);
  return isVisible ? (
    <div>
        <PixelIconButton label="Go Up" tone="green" icon={<PxlKitIcon icon={Send} size={16} className="rotate-270"/>} 
        className="m-2 cursor-pointer fixed bottom-4 right-16 z-50 " onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        </PixelIconButton>
    </div>
  ) : null;
}