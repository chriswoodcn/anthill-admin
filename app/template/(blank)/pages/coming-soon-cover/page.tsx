import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ComponentsPagesComingSoonForm from "./ComponentsPagesComingSoonForm";
import Image from "@/components/core/Image";
import Logo from "@/components/compose/Logo";

export const metadata: Metadata = {
  title: "Coming Soon Cover",
};

const ComingSoonCover = () => {
  return (
    <div>
      <div className="absolute inset-0">
        <Image
          src="/assets/images/template/auth/bg-gradient.png"
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative flex min-h-screen items-center justify-center bg-bg_map bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
      <Image
          auto
          src="/assets/images/template/auth/coming-soon-object1.png"
          alt="image"
          className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"
        />
        <Image
          auto
          src="/assets/images/template/auth/coming-soon-object2.png"
          alt="image"
          className="absolute left-24 top-0 h-40 md:left-[30%]"
        />
        <Image
          auto
          src="/assets/images/template/auth/coming-soon-object3.png"
          alt="image"
          className="absolute right-0 top-0 h-[300px]"
        />
        <Image
          auto
          src="/assets/images/template/auth/polygon-object.svg"
          alt="image"
          className="absolute bottom-0 end-[28%]"
        />
        <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 text-center backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
          <div
            className="relative hidden w-full items-center justify-center p-5 lg:inline-flex lg:max-w-[835px] ltr:xl:-ml-24 ltr:xl:skew-x-[14deg] rtl:xl:-mr-24 rtl:xl:skew-x-[-14deg]"
            style={{
              background:
                "linear-gradient(225deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)",
            }}
          >
            <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
            <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
              <Link href="/" className="mx-auto block w-48 lg:w-72 2xl:m-0">
                <Logo className="w-48 h-48  text-white" />
              </Link>
              <div className="mt-24 hidden w-full max-w-[430px] rtl:rotate-y-180 lg:block">
                <Image
                  src="/assets/images/template/auth/coming-soon-cover.svg"
                  alt="Cover Image"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="relative w-full px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
            <div className="mx-auto mt-5 w-full max-w-[550px] lg:mt-16">
              <Link href="/" className="mb-8 block lg:hidden">
                <Logo className="w-16 h-16  text-primary m-auto" />
              </Link>
              <div className="mb-12">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
                  Coming Soon
                </h1>
                <p className="text-base font-bold leading-normal text-white-dark">
                  We will be here in a shortwhile.....
                </p>
              </div>
              <ComponentsPagesComingSoonForm />
            </div>
            <p className="absolute bottom-6 w-full text-center dark:text-white">
              © {new Date().getFullYear()}.Anthill All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCover;
