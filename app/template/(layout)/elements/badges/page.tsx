import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import ElementsBadgesBasic from "./ElementsBadgesBasic";
import ElementsBadgesClassic from "./ElementsBadgesClassic";
import ElementsBadgesCustom from "./ElementsBadgesCustom";
import ElementsBadgesOutline from "./ElementsBadgesOutline";
import ElementsBadgesPills from "./ElementsBadgesPills";
import ElementsBadgesWithHeadings from "./ElementsBadgesWithHeadings";

export const metadata: Metadata = {
  title: "Badges",
};

const Badges = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Elements
          </Link>
        </li>
        <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
          <span>Badges</span>
        </li>
      </ul>
      <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        <ElementsBadgesBasic />
        <ElementsBadgesOutline />
        <ElementsBadgesPills />
        <ElementsBadgesClassic />
        <ElementsBadgesWithHeadings />
        <ElementsBadgesCustom />
      </div>
    </div>
  );
};

export default Badges;
