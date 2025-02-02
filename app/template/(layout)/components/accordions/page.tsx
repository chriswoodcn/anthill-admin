import IconBell from "@/components/icon/icon-bell";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ComponentsAccordionsBasic from "./ComponentsAccordionsBasic";
import ComponentsAccordionsWithoutSpacing from "./ComponentsAccordionsWithoutSpacing";
import ComponentsAccordionsIcons from "./ComponentsAccordionsIcons";
import ComponentsAccordionsNoIcons from "./ComponentsAccordionsNoIcons";

export const metadata: Metadata = {
  title: "Accordions",
};

const Accordions = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Components
          </Link>
        </li>
        <li className="before:content-['/'] dark:text-white-7 before:dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
          <span>Accordions</span>
        </li>
      </ul>
      <div className="space-y-8 pt-5">
        <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
          <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
            <IconBell />
          </div>
          <span className="ltr:mr-3 rtl:ml-3">Documentation: </span>
          <a
            href="https://www.npmjs.com/package/react-animate-height"
            target="_blank"
            className="block hover:underline"
            rel="noreferrer"
          >
            https://www.npmjs.com/package/react-animate-height
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentsAccordionsBasic />
          <ComponentsAccordionsWithoutSpacing />
          <ComponentsAccordionsIcons />
          <ComponentsAccordionsNoIcons />
        </div>
      </div>
    </div>
  );
};

export default Accordions;
