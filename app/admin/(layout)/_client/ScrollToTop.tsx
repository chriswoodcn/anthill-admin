"use client";
import { isBrowser } from '@/lib';
import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  const goToTop = () => {
    if (typeof document !== undefined) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };

  const onScrollHandler = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    if (isBrowser()) {
      window.addEventListener("scroll", onScrollHandler);
    }
    return () => {
      if (isBrowser()) {
        window.removeEventListener("onscroll", onScrollHandler);
      }
    };
  });

  return (
    <div className="fixed bottom-6 z-50 ltr:right-6 rtl:left-6">
      {showTopButton && (
        <button
          type="button"
          className="btn border-0 animate-pulse rounded-full text-white bg-primary hover:bg-primary/50 p-2 dark:bg-primary-8 dark:hover:bg-primary-8/50"
          onClick={goToTop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10.586 3l-6.586 6.586a2 2 0 0 0 -.434 2.18l.068 .145a2 2 0 0 0 1.78 1.089h2.586v7a2 2 0 0 0 2 2h4l.15 -.005a2 2 0 0 0 1.85 -1.995l-.001 -7h2.587a2 2 0 0 0 1.414 -3.414l-6.586 -6.586a2 2 0 0 0 -2.828 0z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
