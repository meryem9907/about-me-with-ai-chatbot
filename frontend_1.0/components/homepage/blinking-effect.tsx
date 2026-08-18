"use client"

export default function BlinkingEffect({ children }: { children: React.ReactNode } ) {
  return (
    <>
    <span className="pl-2 pb-[0.25rem] inline animate-blink">{children}</span>
    </>
  );
}
