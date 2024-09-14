"use client";

import logger from "@/lib/logger";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { SWRConfig } from "swr";

export default ({ children }: PropsWithChildren) => {
  const { i18n } = useTranslation();
  return (
    <SWRConfig
      value={{
        loadingTimeout: 10 * 1000,
        onSuccess: (data, key, config) => {
          return data;
        },
        onError: (err, key, config) => {
          return err;
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
