import useSWR from "swr";
import dayjs from "dayjs";
import { aesDecrypt, aesEncrypt, isBrowser, withBasePath } from "@/lib";
import { nextFetcher } from "@/lib/fetcher";
import logger from "@/lib/logger";
import Toast from "@/lib/toast";
import { getAuthorizationInfoClient } from "@/lib/jwt";
import configuraton from "@/configuration.mjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store";
import {
  clearAdminUserState,
  setToken,
  setUserInfo,
} from "@/store/slices/admin.userSlice";
import { useTranslation } from "react-i18next";

export interface LoginForm {
  username: string | undefined;
  password: string | undefined;
  remember: boolean;
}

export const getStorageLoginForm = () => {
  const emptyForm: LoginForm = {
    username: undefined,
    password: undefined,
    remember: false,
  };
  if (typeof window != "undefined") {
    let jsonStr = window.localStorage.getItem("__admin_login_form__");
    if (!jsonStr) return emptyForm;
    let target = JSON.parse(jsonStr);
    if (!target.remember) return emptyForm;
    if (target.password) target.password = aesDecrypt(target.password);
    return target as LoginForm;
  }
  return emptyForm;
};

export const setStorageLoginForm = ({
  username,
  password,
  remember,
}: LoginForm) => {
  let target = {};
  if (remember == true && username && password) {
    target = { username: username, password: aesEncrypt(password), remember };
  } else {
    target = { remember: false };
  }
  if (isBrowser()) {
    if (password)
      window.localStorage.setItem("__admin_unlock_pwd__", aesEncrypt(password));
    window.localStorage.setItem("__admin_login_form__", JSON.stringify(target));
  }
};

export default function useAdminUserLogin(
  doAction: boolean,
  params: LoginForm & Record<string, any>,
  final: () => void = () => {}
) {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const { data, error, isLoading } = useSWR(
    doAction
      ? {
          url: withBasePath("/api/auth/login"),
          method: "POST",
          params: {
            t: dayjs().valueOf(),
          },
          data: params,
        }
      : null,
    nextFetcher,
    {
      onSuccess: (data) => {
        logger.debug("onSuccess data", data);
        const authorizationInfo = getAuthorizationInfoClient();
        if (data) {
          if (data.code == 200) {
            Toast.fireSuccessAction({
              html: (
                <p className="text-black-7 dark:text-white-7 text-xl">
                  {t("toast_success_login")}
                </p>
              ),
              callback: () => {
                if (searchParams.get("redirect")) {
                  router.replace(searchParams.get("redirect")!!);
                } else {
                  router.replace(configuraton.PathAlias.Admin.Root);
                }
              },
            });
            setStorageLoginForm(params);
            dispatch(setToken(authorizationInfo?.token));
            dispatch(setUserInfo(data.data));
          } else {
            Toast.fireErrorAction({
              html: <p className="text-2xl font-bold">{data.message}</p>,
              timer: 0,
            });
            dispatch(clearAdminUserState());
          }
        }
        final();
      },
      onError: (error) => {
        logger.debug("onError error", error);
        Toast.fireErrorAction({
          html: (
            <p className="text-2xl font-bold">
              {error.message || t("fetch_error")}
            </p>
          ),
          timer: 0,
        });
        dispatch(clearAdminUserState());
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
