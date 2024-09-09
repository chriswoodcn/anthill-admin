import IconBell from "@/components/icon/icon-bell";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ElementsDropdownsBasic from "./ElementsDropdownsBasic";
import ElementsDropdownsCustom from "./ElementsDropdownsCustom";
import ElementsDropdownsDropLeft from "./ElementsDropdownsDropLeft";
import ElementsDropdownsDropRight from "./ElementsDropdownsDropRight";
import ElementsDropdownsDropUp from "./ElementsDropdownsDropUp";
import ElementsDropdownsGroupedBtn from "./ElementsDropdownsGroupedBtn";
import ElementsDropdownsLargeBtn from "./ElementsDropdownsLargeBtn";
import ElementsDropdownsSmallBtn from "./ElementsDropdownsSmallBtn";
import ElementsDropdownsSplit from "./ElementsDropdownsSplit";

export const metadata: Metadata = {
  title: "Dropdown",
};

const Dropdown = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Elements
          </Link>
        </li>
        <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
          <span>Dropdowns</span>
        </li>
      </ul>
      <div className="space-y-8 pt-5">
        <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
          <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
            <IconBell />
          </div>
          <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
          <a
            href="https://www.npmjs.com/package/react-popper"
            target="_blank"
            className="block hover:underline"
            rel="noreferrer"
          >
            https://www.npmjs.com/package/react-popper
          </a>
        </div>
        {/* Basic */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ElementsDropdownsBasic />
          <ElementsDropdownsDropUp />
          <ElementsDropdownsDropRight />
          <ElementsDropdownsDropLeft />
          <ElementsDropdownsSmallBtn />
          <ElementsDropdownsLargeBtn />
          <ElementsDropdownsGroupedBtn />
          <ElementsDropdownsSplit />
          <ElementsDropdownsCustom />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
