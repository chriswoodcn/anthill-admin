"use client";

import PerfectScrollbar from "react-perfect-scrollbar";
import { IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { toggleRTL } from "../../store/slices/admin";
import { useRouter } from "next/navigation";
import React from "react";
import { withBasePath } from "../../lib";
import Dropdown from "../core/Dropdown";

interface LanguageDropdownProps {
  className?: string;
  shape?: "rect" | "rounded";
}

const LanguageDropdown = ({
  className = "",
  shape = "rect",
}: LanguageDropdownProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { i18n } = useTranslation();
  const isRtl =
    useAppSelector((state: RootState) => state.adminSetting.rtlClass) === "rtl";
  const themeConfig = useAppSelector((state: RootState) => state.adminSetting);

  const setLocale = (flag: string) => {
    if (flag.toLowerCase() === "ae") {
      dispatch(toggleRTL("rtl"));
    } else {
      dispatch(toggleRTL("ltr"));
    }
    router.refresh();
  };
  const renderButton = () => {
    if (shape == "rect")
      return (
        <div className="flex items-center gap-2 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-black-7 dark:text-white-7 hover:border-primary hover:text-primary dark:bg-black">
          <div>
            <img
              src={withBasePath(
                `/assets/images/flags/${i18n.language.toUpperCase()}.svg`
              )}
              alt="image"
              className="h-5 w-5 rounded-full object-cover"
            />
          </div>
          <div className="text-base font-bold uppercase">{i18n.language}</div>
          <span className="shrink-0">
            <IconChevronDown stroke={1} size={20} />
          </span>
        </div>
      );
    if (shape == "rounded")
      return (
        <div className="flex justify-center items-center w-[36px] h-[36px] ">
          <div className="rounded-full bg-white text-white-dark border hover:border-primary hover:text-primary dark:bg-black">
            <img
              src={withBasePath(
                `/assets/images/flags/${i18n.language.toUpperCase()}.svg`
              )}
              alt="image"
              className="w-[20px] h-[20px] rounded-full object-cover"
            />
          </div>
        </div>
      );
    return null;
  };
  return (
    <div className={`dropdown ${className}`}>
      {i18n.language && (
        <Dropdown
          offset={[0, 4]}
          placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
          btnClassName=""
          button={renderButton()}
        >
          <PerfectScrollbar className="max-h-[300px] overflow-y-scroll rounded-lg shadow-sm bg-white dark:bg-black">
            <ul className="grid w-[160px] grid-cols-1 gap-2 p-2 font-semibold text-black-7 dark:text-white-7 ">
              {themeConfig.languageList.map((item: any) => {
                return (
                  <li key={item.code}>
                    <button
                      type="button"
                      className={`flex w-full p-2 rounded-md hover:text-primary ${
                        i18n.language === item.code
                          ? "bg-primary/10 text-primary"
                          : ""
                      }`}
                      onClick={() => {
                        i18n.changeLanguage(item.code);
                        setLocale(item.code);
                      }}
                    >
                      <img
                        src={withBasePath(
                          `/assets/images/flags/${item.code.toUpperCase()}.svg`
                        )}
                        alt="flag"
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </PerfectScrollbar>
        </Dropdown>
      )}
    </div>
  );
};

export default LanguageDropdown;
