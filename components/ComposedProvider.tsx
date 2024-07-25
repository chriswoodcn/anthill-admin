"use client";

import store from "@/store";
import { Provider } from "react-redux";
import React, { ReactNode, Suspense } from "react";

import Loading from "@/components/Loading";
import App from '@/components/App';

interface IProps {
  children?: ReactNode;
}

export default ({ children }: IProps) => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <App>{children}</App>
      </Suspense>
    </Provider>
  );
};
