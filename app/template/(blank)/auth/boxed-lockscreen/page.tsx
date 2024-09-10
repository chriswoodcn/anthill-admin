import LanguageDropdown from "@/components/compose/LanguageDropdown";
import { Metadata } from "next";
import React from "react";
import ComponentsAuthUnlockForm from "../_client/ComponentsAuthUnlockForm";
import Image from "@/components/core/Image";

export const metadata: Metadata = {
  title: "Unlock Box",
};

const BoxedLockScreen = () => {
  return (
    <div>
      <div className="absolute inset-0">
        <Image
          src="/assets/images/template/auth/bg-gradient.png"
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative flex min-h-screen items-center justify-center bg-bg_map bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-black-8 sm:px-16">
        <Image
          autosize="true"
          src="/assets/images/template/auth/coming-soon-object1.png"
          alt="image"
          className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"
        />
        <Image
          autosize="true"
          src="/assets/images/template/auth/coming-soon-object2.png"
          alt="image"
          className="absolute left-24 top-0 h-40 md:left-[30%]"
        />
        <Image
          autosize="true"
          src="/assets/images/template/auth/coming-soon-object3.png"
          alt="image"
          className="absolute right-0 top-0 h-[300px]"
        />
        <Image
          autosize="true"
          src="/assets/images/template/auth/polygon-object.svg"
          alt="image"
          className="absolute bottom-0 end-[28%]"
        />
        <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-3 dark:bg-[linear-gradient(52.22deg,#363636_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#363636_100%)]">
          <div className="relative flex flex-col justify-center rounded-md bg-white/50 px-4 py-20 backdrop-blur-lg dark:bg-black-5/20 lg:min-h-[758px]">
            <div className="absolute end-6 top-6">
              <LanguageDropdown />
            </div>
            <div className="mx-auto w-full max-w-[440px]">
              <div className="mb-10 flex items-center">
                <div className="flex h-16 w-16 items-end justify-center overflow-hidden rounded-full bg-[#00AB55] ltr:mr-4 rtl:ml-4">
                  <Image
                    src="/assets/images/template/auth/user.png"
                    className="w-full object-cover"
                    alt="images"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl dark:text-white">Shaun Park</h4>
                  <p className="text-white-dark">
                    Enter your password to unlock your ID
                  </p>
                </div>
              </div>
              <ComponentsAuthUnlockForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxedLockScreen;
