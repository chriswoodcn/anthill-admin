import useSWR from "swr";
import dayjs from "dayjs";
import { withBasePath } from "@/lib";
import { nextFetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import configuraton from "@/configuration.mjs";
import { useTranslation } from "react-i18next";
import Toast from "@/lib/toast";
import { useAppDispatch } from "@/store";
import { clearAdminUserState } from "@/store/slices/admin.userSlice";

export default function useAdminUserLogout(
  doAction: boolean,
  final: () => void = () => {}
) {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useSWR(
    doAction
      ? {
          url: withBasePath("/api/auth/logout"),
          method: "GET",
          params: {
            t: dayjs().valueOf(),
          },
        }
      : null,
    nextFetcher,
    {
      onSuccess: (data: any, key: string, config: any) => {
        if (data.code == 200) {
          dispatch(clearAdminUserState());
          router.replace(configuraton.PathAlias.Admin.Login);
        }
        final();
      },
      onError: (err: any, key: string, config: any) => {
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
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}
