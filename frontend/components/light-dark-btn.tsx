"use client";
import { PxlKitIcon } from "@pxlkit/core";
import { PixelIconButton } from "@pxlkit/ui-kit";
import { CrescentMoon } from "@pxlkit/weather";
import { Sun } from "@pxlkit/weather";


export default function LightDarkBtn() {
  const toggleLightDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
  return (
    <div
      className="inline-flex items-center justify-center outline-none 
    
    
    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-retro-bg 
    focus-visible:ring-retro-green/40  pxl-shadow-active fixed bottom-6 
    right-6 z-50 shadow-lg"
    >
      <PixelIconButton
        label="Light Dark Mode Switch"
        tone="green"  
        onClick={toggleLightDarkMode}
        icon={
           <>
            <span className="inline-flex dark:hidden">
              <PxlKitIcon icon={CrescentMoon} size={16} />
            </span>
            <span className="hidden dark:inline-flex">
              <PxlKitIcon icon={Sun} size={16} />
            </span>
          </>
        }
      
      />
    </div>
  );
}
