import { Metadata } from "next";
import Link from "next/link";
import React from "react";

import IconBell from "@/components/icon/icon-bell";
import ComponentsModalBasic from "./ComponentsModalBasic";
import ComponentsModalCustom from "./ComponentsModalCustom";
import ComponentsModalAnimationStyle from "./ComponentsModalAnimationStyle";
import ComponentsModalVideo from "./ComponentsModalVideo";
import ComponentsModalVerticallyCenter from "./ComponentsModalVerticallyCenter";
import ComponentsModalStatic from "./ComponentsModalStatic";
import ComponentsModalRemoveAnimation from "./ComponentsModalRemoveAnimation";
import ComponentsModalOptionalSizes from "./ComponentsModalOptionalSizes";

export const metadata: Metadata = {
  title: "Modals",
};

const Modals = async () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Components
          </Link>
        </li>
        <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
          <span>Modals</span>
        </li>
      </ul>
      <div className="space-y-8 pt-5">
        <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
          <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
            <IconBell />
          </div>
          <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
          <a
            href="https://headlessui.com/react/dialog"
            target="_blank"
            className="block hover:underline"
            rel="noreferrer"
          >
            https://headlessui.com/react/dialog
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ComponentsModalBasic />
          <ComponentsModalVerticallyCenter />
          <ComponentsModalStatic />
          <ComponentsModalRemoveAnimation />
          <ComponentsModalOptionalSizes />
          <ComponentsModalVideo />
          <ComponentsModalAnimationStyle />
          <ComponentsModalCustom />
        </div>
      </div>
    </div>
  );
};

export default Modals;
