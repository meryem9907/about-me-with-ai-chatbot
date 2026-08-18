"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <label className="mt-2 flex min-h-11 flex-col gap-1 px-3 text-sm text-foreground">
      <span className="text-muted">{t("language")}</span>
      <select
        className="rounded-md border border-border bg-background px-2 py-2 text-foreground [color-scheme:light] dark:bg-surface dark:[color-scheme:dark]"
        value={locale}
        onChange={(e) => {
          router.replace(pathname, { locale: e.target.value as AppLocale });
        }}
        aria-label={t("language")}
      >
        {routing.locales.map((code) => (
          <option key={code} value={code}>
            {code.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
