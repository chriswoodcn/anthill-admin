import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ComponentsFormsTouchspinButtonSpin from "./ComponentsFormsTouchspinButtonSpin";
import ComponentsFormsTouchspinChangeButtonClass from "./ComponentsFormsTouchspinChangeButtonClass";
import ComponentsFormsTouchspinInlineSpinButton from "./ComponentsFormsTouchspinInlineSpinButton";
import ComponentsFormsTouchspinSize from "./ComponentsFormsTouchspinSize";
import ComponentsFormsTouchspinSpinWithStep5 from "./ComponentsFormsTouchspinSpinWithStep5";
import ComponentsFormsTouchspinTextWithSpinButton from "./ComponentsFormsTouchspinTextWithSpinButton";
import ComponentsFormsTouchspinVerticalSpinButton from "./ComponentsFormsTouchspinVerticalSpinButton";
import ComponentsFormsTouchspinWrappingValueSpin from "./ComponentsFormsTouchspinWrappingValueSpin";

export const metadata: Metadata = {
  title: "TouchSpin",
};

const TouchSpin = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Forms
          </Link>
        </li>
        <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
          <span>TouchSpin</span>
        </li>
      </ul>
      <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        {/* Basic */}
        <ComponentsFormsTouchspinButtonSpin />
        {/* step of 5 */}
        <ComponentsFormsTouchspinSpinWithStep5 />
        {/* Wrapping value */}
        <ComponentsFormsTouchspinWrappingValueSpin />
        {/* Size  */}
        <ComponentsFormsTouchspinSize />
        {/* Inline Buttons */}
        <ComponentsFormsTouchspinInlineSpinButton />
        {/* Vertical Buttons */}
        <ComponentsFormsTouchspinVerticalSpinButton />
        {/* text with spin */}
        <ComponentsFormsTouchspinTextWithSpinButton />
        {/* Change Button Class */}
        <ComponentsFormsTouchspinChangeButtonClass />
      </div>
    </div>
  );
};

export default TouchSpin;
