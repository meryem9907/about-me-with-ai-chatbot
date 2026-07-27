"use client";
import { PixelHeroSection } from "@pxlkit/ui-kit";
import { ParallaxPxlKitIcon } from "@pxlkit/core";
import {  CoolEmoji } from "@pxlkit/parallax";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <div className="bg-[var(--retro-bg)] cursor-pointer">
      <PixelHeroSection
        density="comfortable"
minHeight="sm"
        eyebrow="Introducing"
        headline="My Portfolio"
        subline="Hi, I'm Meryem! I'm so excited you are here!"
        className="object-scale-down md:object-cover max-h-[200px]"
        onClick={() => router.push("/")}
      />

    </div>
  );
}
