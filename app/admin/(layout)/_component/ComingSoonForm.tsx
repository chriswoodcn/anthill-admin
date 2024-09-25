"use client";

import React, { useEffect, useState } from "react";

export default function () {
  const [demo1, setDemo1] = useState<any>({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });
  const [timer1, setTimer1] = useState<any>(null);

  const setTimerDemo1 = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const countDownDate = date.getTime();

    let updatedValue: any = {};
    setTimer1(
      setInterval(() => {
        const now = new Date().getTime();

        const distance = countDownDate - now;

        updatedValue.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        updatedValue.hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        updatedValue.minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        updatedValue.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setDemo1((demo1: any) => ({
          ...demo1,
          ...updatedValue,
        }));

        if (distance < 0) {
          clearInterval(timer1);
        }
      }, 1000)
    );
  };

  useEffect(() => {
    setTimerDemo1();
    return () => {
      clearInterval(timer1);
    };
  }, []);

  return (
    <div className="mb-16 flex items-center justify-center gap-2 text-xl font-bold leading-none sm:text-2xl md:mb-24 md:gap-4 md:text-[50px]">
      <div className="relative inline-flex h-12 w-14 items-center justify-center rounded-md bg-primary-light p-2 sm:h-16 sm:w-16 md:h-24 md:min-w-[120px]">
        <div className="absolute inset-1 flex flex-col gap-1">
          <span className="h-full w-full rounded-md bg-primary/20"></span>
          <span className="h-full w-full rounded-md bg-white"></span>
        </div>
        <span className="relative text-primary">{demo1.days}</span>
      </div>
      <span>:</span>
      <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-light p-2 sm:h-16 sm:w-16 md:h-24 md:min-w-[96px]">
        <div className="absolute inset-1 flex flex-col gap-1">
          <span className="h-full w-full rounded-md bg-primary/20"></span>
          <span className="h-full w-full rounded-md bg-white"></span>
        </div>
        <span className="relative text-primary">{demo1.hours}</span>
      </div>
      <span>:</span>
      <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-light p-2 sm:h-16 sm:w-16 md:h-24 md:min-w-[96px]">
        <div className="absolute inset-1 flex flex-col gap-1">
          <span className="h-full w-full rounded-md bg-primary/20"></span>
          <span className="h-full w-full rounded-md bg-white"></span>
        </div>
        <span className="relative text-primary">{demo1.minutes}</span>
      </div>
      <span>:</span>
      <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-light p-2 sm:h-16 sm:w-16 md:h-24 md:min-w-[96px]">
        <div className="absolute inset-1 flex flex-col gap-1">
          <span className="h-full w-full rounded-md bg-primary/20"></span>
          <span className="h-full w-full rounded-md bg-white"></span>
        </div>
        <span className="relative text-primary">{demo1.seconds}</span>
      </div>
    </div>
  );
}
