import useSWR, { SWRConfiguration } from "swr";
import { adminFetcher } from "@/lib/fetcher";
import Toast from "@/lib/toast";
import { useTranslation } from "react-i18next";

export default function useAdminFetch(
  doAction: boolean,
  params: Record<string, any>,
  config: SWRConfiguration
) {
  const { t } = useTranslation();
  const combineConfig = Object.assign(
    {
      onSuccess(data: any, key: string, config: any) {
        Toast.fireSuccessAction({
          html: (
            <p className="text-black-7 dark:text-white-7 text-xl">
              {t("fetch_success")}
            </p>
          ),
        });
      },
      onError(err: any, key: string, config: any) {
        Toast.fireErrorAction({
          html: (
            <p className="text-2xl font-bold">
              {err.message || t("fetch_error")}
            </p>
          ),
          timer: 0,
        });
      },
    },
    config
  );

  const { data, error, isLoading } = useSWR(
    doAction ? params : null,
    adminFetcher,
    combineConfig
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
