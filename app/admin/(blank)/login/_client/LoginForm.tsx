"use client";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
// custom
import logger from "@/lib/logger";
import { IconUser, IconX, IconEyeClosed, IconEye } from "@tabler/icons-react";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import { getAuthorizationInfoClient } from "@/lib/jwt";
import { useState } from "react";
import { SysLoginApi } from "@/lib/hooks/admin/adminApi";
import Toast from "@/lib/toast";
import { useAppDispatch } from "@/store";
import { aesDecrypt, aesEncrypt, isBrowser } from "@/lib";
import configuraton from "@/configuration.mjs";
import {
  clearAdminUserState,
  setToken,
  setUserInfo,
} from "@/store/slices/admin.userSlice";

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

export default () => {
  const { t } = useTranslation("admin_login");
  const { t: ct } = useTranslation("admin_common");
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

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
        .matches(
          /^\w{5,}$/gi,
          `${t("account")}  ${ct("validation_error.field_invalid")}`
        )
        .required(`${t("account")}  ${ct("validation_error.field_required")}`),
      password: Yup.string()
        .matches(
          /^\S{5,}$/gi,
          `${t("password")}  ${ct("validation_error.field_invalid")}`
        )
        .required(`${t("password")}  ${ct("validation_error.field_required")}`),
    }),
    onSubmit: async (values) => {
      logger.debug("onSubmit values=", values);
      const res = await SysLoginApi.login({
        username: formik.values.username,
        password: formik.values.password,
        remember: formik.values.remember,
        device: "WEB",
      });
      logger.debug("res", res);
      if (res.code == 200) {
        const authorizationInfo = getAuthorizationInfoClient();
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
        setStorageLoginForm({
          username: formik.values.username,
          password: formik.values.password,
          remember: formik.values.remember,
        });
        dispatch(setToken(authorizationInfo?.token));
        dispatch(setUserInfo(res.data));
      } else {
        Toast.fireErrorAction({
          html: <p className="text-2xl font-bold">{res.message}</p>,
          timer: 0,
        });
        dispatch(clearAdminUserState());
      }
      formik.setSubmitting(false);
    },
  });

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
              placeholder={ct("placeholder_input") + t("account")}
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
              placeholder={ct("placeholder_input") + t("password")}
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
        {formik.isSubmitting && (
          <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
        )}
        {t("login")}
      </button>
    </>
  );
};
