"use client";

import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Errors");
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold text-foreground">
        {t("errorTitle")}
      </h1>
      <p className="mt-3 text-muted">
        {error.message || t("errorFallback")}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex min-h-11 items-center rounded-md bg-accent-soft px-4 text-accent"
      >
        {t("tryAgain")}
      </button>
    </div>
  );
}
