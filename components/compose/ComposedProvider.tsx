"use client";

import store from "@/store";
import { Provider } from "react-redux";
import React, { PropsWithChildren, Suspense } from "react";
import ProgressBarProvider from "./ProgressBarProvider";
import AuthProvider from "./AuthProvider";

import Loading from "../core/Loading";
import App from "./App";

export default ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <ProgressBarProvider>
            <App>{children}</App>
          </ProgressBarProvider>
        </Suspense>
      </AuthProvider>
    </Provider>
  );
};
