"use client";

import MenuIcon from "@/icons/menu-icon";
import MenuDropdown from "./menu-dropdown";
import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ToggleMenuBtn() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const mobileButtonRef = useRef<HTMLButtonElement | null>(null);
  const desktopButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;
        (isDesktop ? desktopButtonRef : mobileButtonRef).current?.focus();
      }
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div>
      <button
        ref={mobileButtonRef}
        type="button"
        aria-label={open ? t("closeMenu") : t("openMenu")}
        aria-expanded={open}
        aria-controls={menuId}
        className="fixed top-4 right-4 z-40 min-h-11 min-w-11 cursor-pointer rounded-md border border-border bg-menu-surface p-2 text-foreground dark:bg-surface"
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </button>

      <nav
        aria-label={t("primary")}
        className="fixed top-4 right-4 z-40 hidden items-center gap-4 lg:flex "
      >
        <DesktopLink href="/">{t("home")}</DesktopLink>
        <DesktopLink href="/chat-assistant">{t("chat")}</DesktopLink>
        <DesktopLink href="/projects">{t("projects")}</DesktopLink>
        <button
          ref={desktopButtonRef}
          type="button"
          aria-label={open ? t("closeMenu") : t("openMore")}
          aria-expanded={open}
          aria-controls={menuId}
          className="min-h-11 min-w-11 cursor-pointer rounded-md border border-border bg-menu-surface p-2 text-foreground dark:bg-surface"
          onClick={() => setOpen(!open)}
        >
          <MenuIcon />
        </button>
      </nav>

      {open && (
        <MenuDropdown isOpen={open} setOpen={setOpen} menuId={menuId} />
      )}
    </div>
  );
}

function DesktopLink({
  href,
  children,
}: {
  href: "/" | "/chat-assistant" | "/projects";
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center rounded-md  px-3 text-sm text-foreground hover:bg-accent-soft"
    >
      {children}
    </Link>
  );
}
