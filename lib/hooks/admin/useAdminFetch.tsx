import useSWR, { SWRConfiguration } from "swr";
import { adminFetcher } from "@/lib/fetcher";
import Toast from "@/lib/toast";
import { useTranslation } from "react-i18next";
interface AlertOptions {
  show: boolean;
  type?: "F" | "O";
  success?: string;
  error?: string;
}
export default function useAdminFetch(
  doAction: boolean,
  alert: AlertOptions = { show: false },
  params: Record<string, any>,
  config: SWRConfiguration | undefined = {},
  final: () => void | undefined = () => {}
) {
  const { t } = useTranslation();
  const combineConfig = Object.assign(
    {
      onSuccess(data: any, key: string, config: any) {
        if (alert.show && data.code == 200)
          if (alert.success) {
            Toast.fireSuccessAction({
              html: (
                <p className="text-black-7 dark:text-white-7 text-xl">
                  {t(alert.success)}
                </p>
              ),
            });
          } else {
            if (alert.type == "F") {
              Toast.fireSuccessAction({
                html: (
                  <p className="text-black-7 dark:text-white-7 text-xl">
                    {t("fetch_success")}
                  </p>
                ),
              });
            }
            if (alert.type == "O") {
              {
                Toast.fireSuccessAction({
                  html: (
                    <p className="text-black-7 dark:text-white-7 text-xl">
                      {t("operate_success")}
                    </p>
                  ),
                });
              }
            }
          }

        if (data.code != 200) {
          if (alert.error) {
            Toast.fireErrorAction({
              html: <p className="text-2xl font-bold">{t(alert.error)}</p>,
              timer: 0,
            });
          } else {
            if (alert.type == "F") {
              Toast.fireErrorAction({
                html: (
                  <p className="text-2xl font-bold">
                    {data.msg || t("fetch_error")}
                  </p>
                ),
                timer: 0,
              });
            }
            if (alert.type == "O") {
              Toast.fireErrorAction({
                html: (
                  <p className="text-2xl font-bold">
                    {data.msg || t("operate_error")}
                  </p>
                ),
                timer: 0,
              });
            }
          }
        }
        final();
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
        final();
      },
    },
    config
  );

  const { data, error, isLoading, mutate } = useSWR(
    doAction ? params : null,
    adminFetcher,
    combineConfig
  );

  return {
    data: data,
    error: error,
    isLoading,
    mutate,
  };
}
