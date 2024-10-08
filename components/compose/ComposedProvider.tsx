"use client";

import { AppStore, makeStore } from "@/store";
import { Provider } from "react-redux";
import React, { PropsWithChildren, Suspense, useRef } from "react";
import ProgressBarProvider from "./ProgressBarProvider";
import SWRDefaultProvider from "./SWRDefaultProvider";
import "dayjs/locale/zh";
import "dayjs/locale/en";
import { DatesProvider } from "@mantine/dates";
import { MantineProvider } from "@mantine/core";

import configuraton, {
  PrimaryColors,
  BlackColors,
  WhiteColors,
} from "@/configuration.mjs";
import Loading from "../core/Loading";
import App from "./App";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import { setupListeners } from "@reduxjs/toolkit/query";

export default ({ children }: PropsWithChildren) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  useEffectOnce(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return (
    <MantineProvider
      theme={{
        primaryColor: "anthill-primary",
        black: "anthill-black",
        // white: "anthill-white",
        fontFamily: "var(--font-nunito)",
        colors: {
          "anthill-primary": PrimaryColors as any,
          "anthill-black": BlackColors as any,
          "anthill-white": WhiteColors as any,
        },
      }}
    >
      <DatesProvider settings={{ locale: "en" }}>
        <Provider store={storeRef.current}>
          <Suspense fallback={<Loading />}>
            <ProgressBarProvider>
              <SWRDefaultProvider>
                <App>{children}</App>
              </SWRDefaultProvider>
            </ProgressBarProvider>
          </Suspense>
        </Provider>
      </DatesProvider>
    </MantineProvider>
  );
};
