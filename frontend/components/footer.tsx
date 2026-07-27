"use client";
import { PixelButton } from "@pxlkit/ui-kit";
import Imprint from "./imprint";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer bg-[var(--retro-surface)] p-5 w-full 
    flex flex-col md:justify-center 
    items-center ">
      <div className="text-center pb-5">Links </div>
      <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
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
      
        <Link href="/imprint">
   
          <PixelButton tone="cyan" className="m-2 cursor-pointer">
            Imprint
          </PixelButton>
        </Link>
        <Link href="/privacy">
  
          <PixelButton tone="cyan" className="m-2 cursor-pointer">
            Privacy Policy
          </PixelButton>
        </Link>
        <Link href="/terms-of-use">
  
          <PixelButton tone="cyan" className="m-2 cursor-pointer">
            Terms of Use
          </PixelButton>
        </Link>
   
      </div>
      
    </div>
  );
}
