import { useTranslation } from "@/i18n";
import { fallbackLng, languages } from "@/i18n/settings";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";

export async function generateMetadata({
  params: { lng },
}: {
  params: Record<string, string>;
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng);
  return {
    title: t("second_title"),
  };
}
const PageTsx = async ({
  params: { lng },
}: {
  params: Record<string, string>;
}) => {
  const { t } = await useTranslation(lng);
  const path = "/second";
  return (
    <>
      <h1 className="text-center">{t("second_title")}</h1>
      <footer className="flex flex-col justify-center items-center mt-10">
        <Trans i18nKey="languageSwitcher" t={t}>
          Switch from <strong>{{ lng }}</strong> to:{" "}
        </Trans>
        {languages
          .filter((l) => lng !== l)
          .map((l, index) => {
            return (
              <span key={l}>
                {index > 0 && " or "}
                <Link href={`/${l}${path}`}>{l}</Link>
              </span>
            );
          })}
      </footer>
    </>
  );
};

export default PageTsx;
