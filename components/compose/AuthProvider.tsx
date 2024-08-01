"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import configuraton from "@/configuration.mjs";

export default function AuthProvider({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
