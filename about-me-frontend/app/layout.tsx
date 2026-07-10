import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers'
import { Inter, Press_Start_2P } from "next/font/google";

export const metadata: Metadata = {
  title: "About-Me page with chatbot",
  description: "Developed by Meryem with pxlkit and next.js",
};


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
    >
      <body className="min-h-full flex flex-col"> 
        <Providers>{children}</Providers> 
      </body>
    </html>
  );
}
