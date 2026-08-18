import { getTranslations } from "next-intl/server";

export default async function Imprint() {
  const t = await getTranslations("Imprint");
  return (
    <div className="break-words text-center font-sans text-foreground mt-20">

      <h1 className="py-4 text-xl">{t("title")}</h1>
      <div className="px-4">
        <p className="pb-2">
          Meryem Ünüvar
          <br />
          {t("address")} <> </>
          Fatih Mahallesi Şehit Asteğmen Köksal Tekel Sk. Maliye Lojmanı No 7
          Daire 6
          <br />
          17760 Gökçeada / Çanakkale
        </p>

        <h2>{t("contact")}:</h2>
        <p className="pb-2">
          {t("mobile")}{" "}
          <a className="text-accent underline" href="tel:+905347863658">
            +90 534 7863658
          </a>
          <br />
          {t("email")}{" "}
          <a
            className="break-all text-accent underline"
            href="mailto:meryem9907@googlemail.com"
          >
            meryem9907@googlemail.com
          </a>
        </p>

        <h2>{t("responsible")}</h2>
        <p>Meryem Ünüvar</p>
      </div>
    </div>
  );
}
