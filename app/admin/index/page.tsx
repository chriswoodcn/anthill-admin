"use client";

import { withBasePath } from "@/lib";
import { nextFetcher } from "@/lib/fetcher";
import { Button } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import configuraton from "@/configuration.mjs";
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
    <>
      <div>Index Page</div>
      <Button onClick={() => setLogoutAction(true)}>LOGOUT</Button>
    </>
  );
};
