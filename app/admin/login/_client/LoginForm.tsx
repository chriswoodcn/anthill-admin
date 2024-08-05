"use client";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
// custom
import logger from "@/lib/logger";
import { aesDecrypt, aesEncrypt, withBasePath } from "@/lib";
import { IconUser, IconX, IconEyeClosed } from "@tabler/icons-react";
import useEffectOnce from "@/lib/useEffectOnce";
import { useAppDispatch } from "@/store";
import useSWR from "swr";
import { nextFetcher } from "@/lib/fetcher";
import { decodeAuthorization } from '@/lib/jwt';

interface LoginForm {
  account: string | undefined;
  password: string | undefined;
  remember: boolean;
}

const getStorageLoginForm = () => {
  const emptyForm = {
    account: undefined,
    password: undefined,
    remember: false,
  };
  if (typeof window != "undefined") {
    let jsonStr = window.localStorage.getItem("__admin_login_form__");
    if (!jsonStr) return emptyForm;
    let target = JSON.parse(jsonStr);
    if (!target.remember) return emptyForm;
    if (target.password) target.password = aesDecrypt(target.password);
    return target;
  }
  return emptyForm;
};
const setStorageLoginForm = ({ account, password, remember }: LoginForm) => {
  let target = {};
  if (remember == true && account && password) {
    target = { account: account, password: aesEncrypt(password), remember };
  } else {
    target = { remember: false };
  }
  logger.debug("setStorageLoginForm window", window);
  if (typeof window !== "undefined") {
    if (password)
      window.localStorage.setItem("__admin_unlock_pwd__", aesEncrypt(password));
    window.localStorage.setItem("__admin_login_form__", JSON.stringify(target));
  }
};

export default () => {
  const { t } = useTranslation("admin_login");
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffectOnce(() => {}, []);

  const initialForm: LoginForm = {
    account: undefined,
    password: undefined,
    remember: false,
  };
  const formik = useFormik({
    initialValues: initialForm,
    validationSchema: Yup.object().shape({
      account: Yup.string()
        .matches(/^\w{5,}$/gi, `${t("account")}  ${t("placeholder_invalid")}`)
        .required(t("placeholder_input") + t("account")),
      password: Yup.string()
        .matches(/^\S{5,}$/gi, `${t("password")}  ${t("placeholder_invalid")}`)
        .required(t("placeholder_input") + t("password")),
    }),
    onSubmit: async (values) => {
      logger.debug("onSubmit values=", values);
    },
  });
  const { data, error, isLoading } = useSWR(
    formik.isValid && formik.isSubmitting
      ? {
          url: withBasePath("/api/auth/login"),
          method: "POST",
          data: {
            username: formik.values.account,
            password: formik.values.password,
            device: "WEB",
          },
        }
      : null,
    nextFetcher
  );
  useEffectOnce(() => {
    logger.debug("isLoading", isLoading);
  }, [isLoading]);
  useEffectOnce(() => {
    logger.debug("login data", data);

    logger.debug("Authorization", Cookies.get("Authorization"));
    logger.debug("info",decodeAuthorization(Cookies.get("Authorization")))
  }, [data]);
  useEffectOnce(() => {
    logger.debug("login error", error);
  }, [error]);

  return (
    <>
      <form className="space-y-5 dark:text-white">
        <div className={formik.errors.account ? "has-error" : ""}>
          <label htmlFor="account">{t("account")}</label>
          <div className="relative text-white-1">
            <input
              name="account"
              type="text"
              id="account"
              placeholder={t("placeholder_input") + t("account")}
              className="form-input pr-10 ps-10 placeholder:text-white-dark"
              onChange={(e) => {
                formik.setFieldError("account", undefined);
                formik.setFieldValue(
                  "account",
                  e.target.value || undefined,
                  false
                );
              }}
              value={formik.values.account || ""}
            />
            <span className="absolute start-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <IconUser size={20} stroke={2} className="stroke-white-4" />
            </span>
            <span className="btn-click absolute end-4 top-1/2 -translate-y-1/2 flex items-center justify-end">
              {formik.values.account && (
                <IconX
                  size={20}
                  stroke={1}
                  onClick={() =>
                    formik.setFieldValue("account", undefined, false)
                  }
                />
              )}
            </span>
          </div>
          {formik.errors.account && (
            <div className="text-danger mt-1">
              {formik.errors.account as string}
            </div>
          )}
        </div>
        <div className={formik.errors.password ? "has-error" : ""}>
          <label htmlFor="password">{t("password")}</label>
          <div className="relative text-white-1">
            <input
              name="password"
              type="text"
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
              <IconEyeClosed size={20} stroke={2} className="stroke-white-4" />
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
              className="form-checkbox bg-white dark:bg-black"
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
        {formik.isSubmitting && (
          <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
        )}
        {t("login")}
      </button>
    </>
  );
};
