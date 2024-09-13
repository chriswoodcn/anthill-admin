"use client";

import { withBasePath } from "@/lib";
import { nextFetcher } from "@/lib/fetcher";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import configuraton from "@/configuration.mjs";
import Toast from '@/lib/toast';

export default () => {
  const router = useRouter();
  const [logoutAction, setLogoutAction] = useState(false);
  const { data, error, isLoading } = useSWR(
    logoutAction
      ? {
          url: withBasePath("/api/auth/logout"),
          method: "GET",
        }
      : null,
    nextFetcher,
    {
      onSuccess: (data) => {
        if (data.code == 200) {
          router.replace(configuraton.PathAlias.Admin.Login);
        }
      },
      onError: (err) => {
        Toast.fireErrorAction({
          html: (
            <p className="text-2xl font-bold">
              {err.message || t("fetch_error")}
            </p>
          ),
          timer: 0,
        });
      },
    }
  );
  return (
    <div className="w-full h-[calc(100vh-10rem)] bg-bg_home bg-center rounded-lg relative">
      <div className="hidden dark:block absolute left-0 right-0 top-0 bottom-0 bg-black/50 z-[2] rounded-lg"></div>
      <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
        <div className="text-white dark:text-white-7 text-5xl font-semibold leading-normal">
          欢迎使用Anthill Admin后管
        </div>
        <div className="text-white dark:text-white-7 text-xl leading-normal">
          VERSION: {configuraton.Version}
        </div>
        <div className="text-white dark:text-white-7 text-xl leading-normal">
          {configuraton.VersionCode}
        </div>
      </div>
    </div>
  );
};
