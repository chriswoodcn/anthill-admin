"use client";

import Icon from "@/components/icon";
import { PropsWithChildren, useState } from "react";
import AnimateHeight from "react-animate-height";
import { useTranslation } from "react-i18next";

export default function (
  props: PropsWithChildren & {
    submit: Function;
    reset: Function;
  }
) {
  const { t } = useTranslation("admin_common");
  const { submit, reset, children } = props;
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  return (
    <div className="panel mb-2 print:hidden select-none">
      <div className="flex justify-between items-center" onClick={toggle}>
        <h3 className="font-mono text-base font-bold">
          {t("query_title")}
        </h3>
        <div>
          <Icon
            name="carets-down"
            className={`transition-all duration-200 ease-in-out ${
              show ? "" : "-rotate-90 "
            }`}
          ></Icon>
        </div>
      </div>
      <AnimateHeight duration={300} height={show ? "auto" : 0}>
        {children}
        <div className="flex flex-row justify-end items-center mt-4 space-x-2">
          <button className="btn btn-outline-primary" onClick={() => submit()}>
            {t("submit")}
          </button>
          <button className="btn btn-outline-info" onClick={() => reset()}>
            {t("reset")}
          </button>
        </div>
      </AnimateHeight>
    </div>
  );
}
