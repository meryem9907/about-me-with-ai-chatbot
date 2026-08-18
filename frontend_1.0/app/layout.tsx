import type { ReactNode } from "react";
import { Nunito } from "next/font/google";
import "./globals.css";

const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      var systemDark = matchMedia('(prefers-color-scheme: dark)').matches;
      var dark = t === 'dark' || ((t === 'system' || !t) && systemDark);
      if (t === 'light') dark = false;
      document.documentElement.classList.toggle('dark', dark);
      // Native controls (select/button) use this before full CSS loads.
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    } catch (_) {}
  })();
`; 

const nunito = Nunito({
  variable: "--nunito-font",
  subsets: ["latin", "latin-ext"],
});

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
   

    <html
      lang="en"
      className={`${nunito.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html> 
  );
}
