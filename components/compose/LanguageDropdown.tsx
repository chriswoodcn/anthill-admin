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
  const adminSetting = useAppSelector((state: RootState) => state.adminSetting);

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
        <>
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
        </>
      );
    if (shape == "rounded")
      return (
        <div className="">
          <img
            src={withBasePath(
              `/assets/images/flags/${i18n.language.toUpperCase()}.svg`
            )}
            alt="image"
            className="w-[20px] h-[20px] rounded-full object-cover"
          />
        </div>
      );
    return null;
  };
  const renderButtonClassName = () => {
    if (shape == "rect")
      return "flex items-center gap-2 rounded-lg border border-white-7/30 dark:border-black-7/30 bg-white px-2 py-1.5 text-black-7 dark:text-white-7 hover:border-primary hover:text-primary dark:bg-black-8";
    if (shape == "rounded")
      return "block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60";
    return "";
  };
  return (
    <div className={`dropdown ${className}`}>
      {i18n.language && (
        <Dropdown
          offset={[0, 8]}
          placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
          btnClassName={renderButtonClassName()}
          button={renderButton()}
        >
          <PerfectScrollbar className="max-h-[300px] overflow-y-scroll">
            <ul className="grid w-[160px] grid-cols-1 space-y-2 font-semibold !p-2">
              {adminSetting.languageList.map((item: any) => {
                return (
                  <li key={item.code} className="group">
                    <button
                      type="button"
                      className={`flex w-full p-2 rounded-md  ${
                        i18n.language === item.code
                          ? "dark:bg-primary/50 bg-white-8 text-primary"
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
                      <span
                        className={`ltr:ml-3 rtl:mr-3 group-hover:!text-primary ${
                          i18n.language === item.code ? "text-primary" : ""
                        }`}
                      >
                        {item.name}
                      </span>
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
