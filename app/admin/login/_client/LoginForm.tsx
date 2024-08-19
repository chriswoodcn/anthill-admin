"use client";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
// custom
import logger from "@/lib/logger";
import { aesDecrypt, aesEncrypt, withBasePath } from "@/lib";
import { IconUser, IconX, IconEyeClosed, IconEye } from "@tabler/icons-react";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import { useAppDispatch } from "@/store";
import useSWR from "swr";
import { nextFetcher } from "@/lib/fetcher";
import { getAuthorizationInfoClient } from "@/lib/jwt";
import configuraton from "@/configuration.mjs";
import {
  clearAdminUserState,
  setToken,
  setUserInfo,
} from "@/store/slices/admin";
import { useState } from "react";
import dayjs from "dayjs";
import Toast from "@/lib/toast";

interface LoginForm {
  username: string | undefined;
  password: string | undefined;
  remember: boolean;
}

const getStorageLoginForm = () => {
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
const setStorageLoginForm = ({ username, password, remember }: LoginForm) => {
  let target = {};
  if (remember == true && username && password) {
    target = { username: username, password: aesEncrypt(password), remember };
  } else {
    target = { remember: false };
  }
  if (typeof window !== "undefined") {
    if (password)
      window.localStorage.setItem("__admin_unlock_pwd__", aesEncrypt(password));
    window.localStorage.setItem("__admin_login_form__", JSON.stringify(target));
  }
};

export default () => {
  const { t } = useTranslation("admin_login");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const [loginAction, setLoginAction] = useState(false);
  const [inputType, setInputType] = useState<"password" | "text">("password");

  useEffectOnce(() => {
    const authorizationInfo = getAuthorizationInfoClient();
    logger.debug("authorizationInfo", authorizationInfo);
    logger.debug("query", searchParams);
  }, []);

  const initialForm: LoginForm = getStorageLoginForm();
  const formik = useFormik({
    initialValues: initialForm,
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .matches(/^\w{5,}$/gi, `${t("account")}  ${t("placeholder_invalid")}`)
        .required(t("placeholder_input") + t("account")),
      password: Yup.string()
        .matches(/^\S{5,}$/gi, `${t("password")}  ${t("placeholder_invalid")}`)
        .required(t("placeholder_input") + t("password")),
    }),
    onSubmit: async (values) => {
      logger.debug("onSubmit values=", values);
      setLoginAction(true);
    },
  });
  const { data, error, isLoading } = useSWR(
    loginAction
      ? {
          url: withBasePath("/api/auth/login"),
          method: "POST",
          params: {
            t: dayjs().valueOf(),
          },
          data: {
            username: formik.values.username,
            password: formik.values.password,
            device: "WEB",
          },
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
            setStorageLoginForm(formik.values);
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
        setLoginAction(false);
      },
      onError: (error) => {
        logger.debug("onError error", error);
        dispatch(clearAdminUserState());
        setLoginAction(false);
      },
    }
  );

  return (
    <>
      <form className="space-y-5 dark:text-white">
        <div className={formik.errors.username ? "has-error" : ""}>
          <label htmlFor="username">{t("account")}</label>
          <div className="relative text-white-1">
            <input
              name="username"
              type="text"
              id="username"
              placeholder={t("placeholder_input") + t("account")}
              className="form-input pr-10 ps-10 placeholder:text-white-dark"
              onChange={(e) => {
                formik.setFieldError("username", undefined);
                formik.setFieldValue(
                  "username",
                  e.target.value || undefined,
                  false
                );
              }}
              value={formik.values.username || ""}
            />
            <span className="absolute start-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <IconUser size={20} stroke={2} className="stroke-white-4" />
            </span>
            <span className="btn-click absolute end-4 top-1/2 -translate-y-1/2 flex items-center justify-end">
              {formik.values.username && (
                <IconX
                  size={20}
                  stroke={1}
                  onClick={() =>
                    formik.setFieldValue("username", undefined, false)
                  }
                />
              )}
            </span>
          </div>
          {formik.errors.username && (
            <div className="text-danger mt-1">
              {formik.errors.username as string}
            </div>
          )}
        </div>
        <div className={formik.errors.password ? "has-error" : ""}>
          <label htmlFor="password">{t("password")}</label>
          <div className="relative text-white-1">
            <input
              name="password"
              type={inputType}
              id="password"
              placeholder={t("placeholder_input") + t("password")}
              className="form-input pr-10 ps-10 placeholder:text-white-dark"
              onChange={(e) => {
                formik.setFieldError("password", undefined);
                formik.setFieldValue(
                  "password",
                  e.target.value || undefined,
                  false
                );
              }}
              value={formik.values.password || ""}
            />
            <span className="absolute start-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
              {inputType == "password" ? (
                <IconEyeClosed
                  size={20}
                  stroke={2}
                  className="stroke-white-4"
                  onClick={() => setInputType("text")}
                />
              ) : (
                <IconEye
                  size={20}
                  stroke={2}
                  className="stroke-white-4"
                  onClick={() => setInputType("password")}
                />
              )}
            </span>
            <span className="btn-click absolute end-4 top-1/2 -translate-y-1/2 flex items-center justify-end">
              {formik.values.password && (
                <IconX
                  size={20}
                  stroke={1}
                  onClick={() =>
                    formik.setFieldValue("password", undefined, false)
                  }
                />
              )}
            </span>
          </div>
          {formik.errors.password && (
            <div className="text-danger mt-1">
              {formik.errors.password as string}
            </div>
          )}
        </div>
        <div>
          <label className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="form-checkbox bg-white dark:bg-black-8"
              checked={formik.values.remember}
              onChange={(e) => {
                formik.setFieldValue(
                  "remember",
                  e.currentTarget.checked,
                  false
                );
              }}
            />
            <span className="text-white-dark">{t("remember")}</span>
          </label>
        </div>
      </form>
      <button
        type="submit"
        className="btn btn-gradient !mt-6 w-full border-0 uppercase"
        disabled={formik.isSubmitting}
        onClick={() => formik.submitForm()}
      >
        {isLoading && (
          <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
        )}
        {t("login")}
      </button>
    </>
  );
};
