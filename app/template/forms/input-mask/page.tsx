import IconBell from "@/components/icon/icon-bell";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ComponentsFormsInputMaskAlternate from "./ComponentsFormsInputMaskAlternate";
import ComponentsFormsInputMaskBasic from "./ComponentsFormsInputMaskBasic";
import ComponentsFormsInputMaskCurrency from "./ComponentsFormsInputMaskCurrency";
import ComponentsFormsInputMaskDate from "./ComponentsFormsInputMaskDate";
import ComponentsFormsInputMaskDynamic from "./ComponentsFormsInputMaskDynamic";
import ComponentsFormsInputMaskIp from "./ComponentsFormsInputMaskIp";
import ComponentsFormsInputMaskPhone from "./ComponentsFormsInputMaskPhone";

export const metadata: Metadata = {
  title: "Input Mask",
};

const InputMask = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Forms
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Input Mask</span>
        </li>
      </ul>

      <div className="flex-1 space-y-8 pt-5" id="basic">
        <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
          <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
            <IconBell />
          </div>
          <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
          <a
            href="https://www.npmjs.com/package/react-text-mask"
            target="_blank"
            className="block hover:underline"
            rel="noreferrer"
          >
            https://www.npmjs.com/package/react-text-mask
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <ComponentsFormsInputMaskBasic />
          <ComponentsFormsInputMaskAlternate />
          <ComponentsFormsInputMaskDynamic />
          <ComponentsFormsInputMaskDate />
          <ComponentsFormsInputMaskIp />
          <ComponentsFormsInputMaskPhone />
          <ComponentsFormsInputMaskCurrency />
        </div>
      </div>
    </div>
  );
};

export default InputMask;
