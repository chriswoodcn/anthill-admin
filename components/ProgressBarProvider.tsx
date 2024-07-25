'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode } from 'react';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar height="4px" color="#fffd00" options={{ showSpinner: false }} shallowRouting />
    </>
  );
};

export default Providers;
