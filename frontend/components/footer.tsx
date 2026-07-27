"use client";
import { PixelButton } from "@pxlkit/ui-kit";

export default function Footer() {
  return (
    <div className="footer bg-[var(--retro-surface)] p-5">
      <div className="text-center pb-2">Links </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <PixelButton
          className="m-2 cursor-pointer "
          tone="cyan"
          onClick={() =>
            window.open("https://www.linkedin.com/in/meryem-unuvar", "_blank")
          }
        >
          LinkedIn
        </PixelButton>
        <PixelButton
          className="m-2 cursor-pointer"
          tone="cyan"
          onClick={() => window.open("https://github.com/meryem9907", "_blank")}
        >
          GitHub
        </PixelButton>
      </div>
    </div>
  );
}
