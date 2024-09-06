import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ElementsBreadcrumbsArrowed from './ElementsBreadcrumbsArrowed';
import ElementsBreadcrumbsBasic from './ElementsBreadcrumbsBasic';
import ElementsBreadcrumbsDefault from './ElementsBreadcrumbsDefault';
import ElementsBreadcrumbsDottedSeperators from './ElementsBreadcrumbsDottedSeperators';
import ElementsBreadcrumbsWithIcon from './ElementsBreadcrumbsWithIcon';

export const metadata: Metadata = {
  title: "Breadcrumbs",
};

const Breadcrumbs = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Elements
          </Link>
        </li>
        <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
          <span>Breadcrumbs</span>
        </li>
      </ul>
      <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        <ElementsBreadcrumbsDefault />
        <ElementsBreadcrumbsBasic />
        <ElementsBreadcrumbsArrowed />
        <ElementsBreadcrumbsDottedSeperators />
        <ElementsBreadcrumbsWithIcon />
      </div>
    </div>
  );
};

export default Breadcrumbs;
