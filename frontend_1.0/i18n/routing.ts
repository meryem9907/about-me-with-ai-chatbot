import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de", "tr"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
