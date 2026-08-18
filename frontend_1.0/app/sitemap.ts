import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://about-me-with-ai-chatbot.onrender.com";

const paths = [
  { href: "/", priority: 1.0},
  { href: "/chat-assistant", priority: 0.8},
  { href: "/projects", priority: 0.8},
  { href: "/imprint", priority: 0.5},
  { href: "/privacy", priority: 0.5},
  { href: "/terms-of-use", priority: 0.5},
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const path of paths) {
      entries.push({
        url: `${siteUrl}/${locale}${path.href}`,
        lastModified: new Date(),
        priority: path.priority,
      });
    }
  }
  return entries;
}
