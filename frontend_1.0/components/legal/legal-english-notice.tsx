"use client";

import { useLocale, useTranslations } from "next-intl";

export default function LegalEnglishNotice() {
  const locale = useLocale();
  const t = useTranslations("Legal");
  if (locale === "en") return null;
  return (
    <p
      role="note"
      className="mx-auto mb-4 max-w-2xl rounded-md border border-border bg-surface px-4 py-3 text-sm text-muted"
    >
      {t("englishOnly")}
    </p>
  );
}
