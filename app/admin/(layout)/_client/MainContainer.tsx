"use client";
import { RootState, useAppSelector } from "@/store";
import React from "react";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const adminSetting = useAppSelector((state: RootState) => state.adminSetting);
  return (
    <div
      className={`${adminSetting.navbar} main-container min-h-screen text-black dark:text-white-dark`}
    >
      {children}
    </div>
  );
};

export default MainContainer;
