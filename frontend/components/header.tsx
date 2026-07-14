"use client";
import { PixelHeroSection } from "@pxlkit/ui-kit";
import { ParallaxPxlKitIcon } from "@pxlkit/core";
import {  CoolEmoji } from "@pxlkit/parallax";

export default function Header() {
  return (
    <div className="bg-retro-bg">
      <PixelHeroSection
        density="comfortable"
minHeight="sm"
        eyebrow="Introducing"
        headline="My Portfolio!"
        subline="Hi, I'm Meryem! I'm so excited you are here!"
        className="object-scale-down md:object-cover max-h-[200px]"
      />
<div className="flex items-center justify-center">
      <ParallaxPxlKitIcon
        icon={CoolEmoji}
        size={128}
        interactive
        strength={20}
      /></div>
    </div>
  );
}
