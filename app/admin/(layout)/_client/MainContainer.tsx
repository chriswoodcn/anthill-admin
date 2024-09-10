"use client";
import useAdminUserRouter from "@/lib/hooks/admin/userAdminUserRouter";
import { clearUserRouter, setUserRouter } from "@/store/slices/admin";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import logger from "@/lib/logger";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const adminSetting = useAppSelector((state: RootState) => state.adminSetting);
  const adminRouter = useAppSelector((state: RootState) => state.adminRouter);
  const dispatch = useAppDispatch();

  //进入路径变化后 主容器 每次需要检验下菜单权限
  const pathname = usePathname();
  const [doFetchMenuTree, setDoFetchMenuTree] = useState(false);
  useEffectOnce(() => {
    setDoFetchMenuTree(true);
  }, [pathname]);
  const { isLoading } = useAdminUserRouter(doFetchMenuTree, undefined, {
    onSuccess(res, key, config) {
      logger.debug("useAdminUserRouter res", res);
      if (res.code == 200) {
        dispatch(setUserRouter(res.data));
      } else {
        dispatch(clearUserRouter());
      }
      setDoFetchMenuTree(false);
    },
    onError(err, key, config) {
      logger.debug("useAdminUserRouter error", err);
      dispatch(clearUserRouter());
      setDoFetchMenuTree(false);
    },
  });
  return (
    <div
      className={`${adminSetting.navbar} main-container min-h-screen text-black dark:text-white-dark`}
    >
      {children}
    </div>
  );
};

export default MainContainer;
