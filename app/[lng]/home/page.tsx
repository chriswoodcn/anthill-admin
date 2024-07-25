import { useTranslation } from "@/i18n";
import { fallbackLng, languages } from "@/i18n/settings";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { Button } from "@mantine/core";

export async function generateMetadata({
  params: { lng },
}: {
  params: Record<string, string>;
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng);
  return {
    title: t("home_title"),
  };
}

const PageTsx = async ({
  params: { lng },
}: {
  params: Record<string, string>;
}) => {
  const { t } = await useTranslation(lng);
  const path = "/home";
  return (
    <>
      <h1 className="text-center">{t("home_title")}</h1>
      <div className="flex flex-col justify-center items-center mt-10">
        <Button component={Link} href={`/${lng}/second`}>
          {t("to-second-page")}
        </Button>
        <Button component={Link} href={`/${lng}/client`}>
          {t("to-client-page")}
        </Button>
      </div>
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
