"use client";

export default function Credits() {
  return (
    <aside
      className="
        sticky left-4 bottom-6 left-4 z-40 -translate-y-1/2
        max-w-[14rem]
      "
      aria-label="UI credits"
    >
      {/* bubble */}
      <div
        className="
          relative border-2 border-retro-border bg-retro-surface opacity-60
          p-4 text-xs text-retro-text font-mono pxl-corner-md
          shadow-[4px_4px_0_#000]
        "
      >
        <p className="mb-2 text-retro-muted uppercase tracking-wide">Credits</p>
        <ul className="space-y-1">
          <li>
            UI:{" "}
            <a
              href="https://pxlkit.xyz/"
              className="text-retro-cyan underline"
            >
              pxlkit
            </a>
          </li>
          <li>Built with Next.js</li>
          <li>© Meryem</li>
        </ul>

       
      </div>
    </aside>
  );
}