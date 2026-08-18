import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ToggleMenuBtn from "@/components/toggle-menu-btn";
import ThemeToggle from "@/components/theme-toggle";
import { ToastProvider } from "@/components/toast-provider";
import SetHtmlLang from "@/components/set-html-lang";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ??
        "https://about-me-with-ai-chatbot.onrender.com",
    ),
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations("Nav");

  return (
    <NextIntlClientProvider messages={messages}>
      <SetHtmlLang locale={locale} />
      <ToastProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[110] focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-foreground"
        >
          {t("skip")}
        </a>
        <ThemeToggle />
        <ToggleMenuBtn />
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </ToastProvider>
    </NextIntlClientProvider>
  );
}
