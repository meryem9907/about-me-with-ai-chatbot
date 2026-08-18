"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import LocaleSwitcher from "./locale-switcher";
import ThemeToggle from "./theme-toggle";

type MenuDropdownProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  menuId: string;
};

export default function MenuDropdown({
  isOpen,
  setOpen,
  menuId,
}: MenuDropdownProps) {
  const t = useTranslations("Nav");
  const navRef = useRef<HTMLElement | null>(null);

  const links = [
    { href: "/", label: t("home") },
    { href: "/chat-assistant", label: t("chatAssistant"), important: true },
    { href: "/projects", label: t("projects"), important: true },
    { href: "/imprint", label: t("imprint") },
    { href: "/privacy", label: t("privacy") },
    { href: "/terms-of-use", label: t("terms") },
    {
      href: "https://www.linkedin.com/in/meryem-unuvar",
      label: t("linkedin"),
      external: true,
    },
    {
      href: "https://github.com/meryem9907",
      label: t("github"),
      external: true,
    },
  ] as const;

  useEffect(() => {
    if (!isOpen || !navRef.current) return;
    const nav = navRef.current;
    const focusable = nav.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), select',
    );
    focusable[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={t("closeMenu")}
        className="fixed inset-0 z-40 bg-black/40"
        onClick={() => setOpen(false)}
      />
      <nav
        id={menuId}
        ref={navRef}
        aria-label={t("site")}
        className="fixed top-0 right-0 z-50 flex h-full w-64 flex-col gap-2
                   border-l border-border bg-surface p-4 pt-16 text-foreground shadow-lg"
      >
        {links.map((link) =>
          "external" in link && link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`min-h-11 rounded px-3 py-2 hover:bg-accent-soft ${
                "important" in link && link.important
                  ? "bg-accent-soft text-accent"
                  : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={`min-h-11 rounded px-3 py-2 hover:bg-accent-soft ${
                "important" in link && link.important
                  ? "bg-accent-soft text-accent"
                  : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ),
        )}
        <ThemeToggle variant="inline" />
        <LocaleSwitcher />
      </nav>
    </>
  );
}
