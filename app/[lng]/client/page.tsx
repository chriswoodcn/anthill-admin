"use client";

import { useTranslation } from "@/i18n/client";
import { languages } from "@/i18n/settings";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import logger,{Logger} from "@/lib/logger";
import { useEffect } from "react";

const PageTsx = ({ params: { lng } }: { params: Record<string, string> }) => {
  const { t } = useTranslation(lng);
  const path = "/client";
  useEffect(() => {
    logger.setLevel(Logger.Levels.WARN);
    logger.trace("debug");
    logger.debug("debug");
    logger.info("info");
    logger.warn("warn");
    logger.error("error");
  }, []);
  return (
    <>
      <h1>{t("second_title")}</h1>
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
