"use client";

import { withBasePath } from "@/lib";
import { nextFetcher } from "@/lib/fetcher";
import { Button } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import configuraton from "@/configuration.mjs";
import Image from "@/components/core/Image";

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
      onError: () => {},
    }
  );
  return (
    <div className="w-full h-[calc(100vh-10rem)] bg-bg_home bg-center rounded-lg relative">
      <div className="hidden dark:block absolute left-0 right-0 top-0 bottom-0 bg-black/50 z-[2] rounded-lg"></div>
      <div className='w-full h-full flex flex-col items-center justify-center relative z-10'>
        <div className="text-white dark:text-white-7 text-5xl font-semibold leading-normal">
          欢迎使用Anthill Admin后管
        </div>
        <div className="text-white dark:text-white-7 text-xl leading-normal">
          version: 1.0.0 dolphin
        </div>
      </div>
    </div>
  );
};
