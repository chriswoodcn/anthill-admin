import { fallbackLng, languages } from "@/i18n/settings";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { Button } from "@mantine/core";
import { getServerTranslations } from "@/i18n/server";
import { LangSelect } from "./LangSelect";

export async function generateMetadata({
  params: { lng },
}: {
  params: Record<string, string>;
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await getServerTranslations();
  return {
    title: t("home_title"),
  };
}

const PageTsx = async ({
  params: { lng },
}: {
  params: Record<string, string>;
}) => {
  const { t, i18n } = await getServerTranslations();
  const path = "/admin";
  return (
    <div className="bg-bg_login">
      <h1 className="text-center">{t("home_title")}</h1>
      <div className="flex flex-col justify-center items-center mt-10">
        <Button component={Link} href={`/${lng}/second`}>
          {t("to-second-page")}
        </Button>
        <Button className="mt-5" component={Link} href={`/${lng}/client`}>
          {t("to-client-page")}
        </Button>
      </div>
      <footer className="flex flex-col justify-center items-center mt-10">
        <Trans i18nKey="languageSwitcher" t={t}>
          Switch from <strong>{i18n.resolvedLanguage}</strong> to:{" "}
        </Trans>
        <LangSelect currentLanguage={lng} />
      </footer>
    </div>
  );
};

export default PageTsx;
