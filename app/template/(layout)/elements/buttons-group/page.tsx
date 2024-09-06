import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ElementsButtonGroupHorizontal from "./ElementsButtonGroupHorizontal";
import ElementsButtonGroupInputGroup from "./ElementsButtonGroupInputGroup";
import ElementsButtonGroupVertical from "./ElementsButtonGroupVertical";

export const metadata: Metadata = {
  title: "Buttons Group",
};

const ButtonsGroup = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Elements
          </Link>
        </li>
        <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
          <span>Button Group</span>
        </li>
      </ul>
      <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        <ElementsButtonGroupHorizontal />
        <ElementsButtonGroupInputGroup />
        <ElementsButtonGroupVertical />
      </div>
    </div>
  );
};

export default ButtonsGroup;
