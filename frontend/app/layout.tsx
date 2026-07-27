import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Inter, Press_Start_2P } from "next/font/google";
import Footer from "@/components/footer";
import LightDarkBtn from "@/components/light-dark-btn";
import Header from "@/components/header";
import ScrollUpBtn from "@/components/scroll-up-btn";

export const metadata: Metadata = {
  title: "About-Me page with chatbot",
  description: "Developed by Meryem with pxlkit and next.js",
};

const themeScript = `
    (function() {
      try {
        var theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (_) {}
    })();
  `;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${pressStart.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }}></script>
      </head>
      <body className="flex flex-col min-h-dvh overflow-x-hidden ">
        <Header />
        <div className=" min-w-0 min-h-0">
          <Providers>{children}</Providers>
        </div>
        <LightDarkBtn />
        <Footer />
        <ScrollUpBtn />
      </body>
    </html>
  );
}
