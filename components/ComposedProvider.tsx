"use client";

import store from "@/store";
import { Provider } from "react-redux";
import React, { PropsWithChildren, Suspense } from "react";
import ProgressBarProvider from "./ProgressBarProvider";

import Loading from "@/components/Loading";
import App from "@/components/App";

export default ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <ProgressBarProvider>
          <App>{children}</App>
        </ProgressBarProvider>
      </Suspense>
    </Provider>
  );
};
