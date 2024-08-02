"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import {
  toggleRTL,
  toggleTheme,
  toggleMenu,
  toggleLayout,
  toggleAnimation,
} from "@/store/slices/admin";

export default ({ children }: PropsWithChildren) => {
  const setting = useAppSelector((state: RootState) => state.adminSetting);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem("theme") || setting.theme));
    dispatch(toggleMenu(localStorage.getItem("menu") || setting.menu));
    dispatch(
      toggleLayout(localStorage.getItem("layout") || setting.layout)
    );
    dispatch(
      toggleRTL(localStorage.getItem("rtlClass") || setting.rtlClass)
    );
    dispatch(
      toggleAnimation(
        localStorage.getItem("animation") || setting.animation
      )
    );
    setIsLoading(false);
  }, [
    dispatch,
    setting.theme,
    setting.menu,
    setting.layout,
    setting.rtlClass,
    setting.animation,
    setting.locale,
  ]);

  return (
    <div
      className={`${(setting.sidebar && "toggle-sidebar") || ""} ${
        setting.menu
      } ${setting.layout} ${
        setting.rtlClass
      } main-section relative font-nunito text-sm font-normal antialiased`}
    >
      {children}
    </div>
  );
};
