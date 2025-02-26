"use client";
import useAdminUserRouter from "@/lib/hooks/admin/useAdminUserRouter";
import { clearUserRouter, setUserRouter } from "@/store/slices/admin";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import logger from "@/lib/logger";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Toast from "@/lib/toast";

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
        Toast.fireErrorAction({
          html: (
            <p className="text-black-7 dark:text-white-7 text-xl">
              {res.msg}
            </p>
          ),
        });
        dispatch(clearUserRouter());
      }
    },
    onError(err, key, config) {
      logger.debug("useAdminUserRouter error", err);
      dispatch(clearUserRouter());
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
