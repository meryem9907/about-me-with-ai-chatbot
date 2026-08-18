"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { nextTheme, type ThemePreference } from "@/lib/theme";
import {
  getThemeServerSnapshot,
  getThemeSnapshot,
  setThemePreference,
  subscribeTheme,
} from "@/lib/theme-store";

type ThemeToggleProps = {
  /** floating = fixed corner (md+); inline = menu drawer control */
  variant?: "floating" | "inline";
};

/** false on SSR/hydration, true after client takes over — avoids flashing "System". */
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function ThemeToggle({ variant = "floating" }: ThemeToggleProps) {
  const t = useTranslations("Theme");
  const hydrated = useHydrated();
  const preference = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  function cycle() {
    setThemePreference(nextTheme(preference));
  }

  function onSelect(value: string) {
    setThemePreference(value as ThemePreference);
  }

  const modeLabel = t(preference);
  const controlClassName =
    "rounded-md border border-border bg-background px-2 py-2 text-foreground [color-scheme:light] dark:bg-surface dark:[color-scheme:dark]";

  if (variant === "inline") {
    return (
      <label className="mt-2 flex min-h-11 flex-col gap-1 px-3 text-sm text-foreground">
        <span className="text-muted">{t("label")}</span>
        {hydrated ? (
          <select
            className={controlClassName}
            value={preference}
            onChange={(e) => onSelect(e.target.value)}
            aria-label={t("aria", { mode: modeLabel })}
          >
            <option value="light">{t("light")}</option>
            <option value="dark">{t("dark")}</option>
            <option value="system">{t("system")}</option>
          </select>
        ) : (
          <select
            className={`${controlClassName} invisible`}
            disabled
            aria-hidden
            tabIndex={-1}
          >
            <option>—</option>
          </select>
        )}
      </label>
    );
  }

  return (
    <button
      type="button"
      onClick={cycle}
      disabled={!hydrated}
      aria-label={hydrated ? t("aria", { mode: modeLabel }) : t("label")}
      title={hydrated ? t("title", { mode: modeLabel }) : t("label")}
      className="fixed top-4 left-4 z-40 hidden min-h-11 min-w-11 rounded-md border border-border
                 bg-surface px-3 py-2 text-sm text-foreground focus-visible:outline-2
                 focus-visible:outline-offset-2 focus-visible:outline-accent md:block"
    >
      {/* Reserve space so the control doesn’t jump when the real label appears */}
      <span className={hydrated ? undefined : "invisible"} aria-hidden={!hydrated}>
        {hydrated ? modeLabel : t("system")}
      </span>
    </button>
  );
}
