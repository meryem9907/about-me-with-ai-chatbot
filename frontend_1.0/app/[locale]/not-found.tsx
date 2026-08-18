import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("Errors");
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold text-foreground">
        {t("notFoundTitle")}
      </h1>
      <p className="mt-3 text-muted">{t("notFoundBody")}</p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center rounded-md bg-accent-soft px-4 text-accent"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
