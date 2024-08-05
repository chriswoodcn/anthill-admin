"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import React, { PropsWithChildren, Suspense } from "react";
import ProgressBarProvider from "./ProgressBarProvider";
import AxiosDefaultProvider from "./AxiosDefaultProvider";

import Loading from "../core/Loading";
import App from "./App";

export default ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <ProgressBarProvider>
          <AxiosDefaultProvider>
            <App>{children}</App>
          </AxiosDefaultProvider>
        </ProgressBarProvider>
      </Suspense>
    </Provider>
  );
};
