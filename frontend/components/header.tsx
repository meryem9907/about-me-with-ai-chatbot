"use client";
import { PixelButton, PixelHeroSection } from "@pxlkit/ui-kit";
import { ParallaxPxlKitIcon } from "@pxlkit/core";
import {  CoolEmoji } from "@pxlkit/parallax";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isLegalPage =
    pathname === "/imprint" ||
    pathname === "/privacy" ||
    pathname === "/terms-of-use";


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
      {isLegalPage && (
        <div className="flex justify-center py-3">
          <Link href="/">
            <PixelButton tone="cyan" className="cursor-pointer">
              ← Back home
            </PixelButton>
          </Link>
        </div>
      )}
    </div>
  );
}
