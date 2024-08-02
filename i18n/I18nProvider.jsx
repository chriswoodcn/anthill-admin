"use client";

import { i18next } from "./i18n";
import React, { useMemo } from "react";
import { I18nextProvider as Provider } from "react-i18next";

export function I18nProvider({ children, language }) {
  useMemo(() => {
    i18next.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Provider i18n={i18next}>{children}</Provider>;
}
