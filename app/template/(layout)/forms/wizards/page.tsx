import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ComponentsFormsWizardsCircleIcon from "./ComponentsFormsWizardsCircleIcon";
import ComponentsFormsWizardsCircleTextAndIcon from "./ComponentsFormsWizardsCircleTextAndIcon";
import ComponentsFormsWizardsPillsIcon from "./ComponentsFormsWizardsPillsIcon";
import ComponentsFormsWizardsPillsText from "./ComponentsFormsWizardsPillsText";
import ComponentsFormsWizardsPillsTextAndIcon from "./ComponentsFormsWizardsPillsTextAndIcon";
import ComponentsFormsWizardsSquareIcon from "./ComponentsFormsWizardsSquareIcon";
import ComponentsFormsWizardsSquareTextAndIcon from "./ComponentsFormsWizardsSquareTextAndIcon";

export const metadata: Metadata = {
  title: "Validation",
};

const Wizards = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Forms
          </Link>
        </li>
        <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
          <span>Wizards</span>
        </li>
      </ul>
      <div className="space-y-8 pt-5">
        <h4 className="badge mb-0 inline-block bg-primary text-base hover:top-0">
          Pills
        </h4>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/*  Basic */}
          <ComponentsFormsWizardsPillsText />

          {/* icon only */}
          <ComponentsFormsWizardsPillsIcon />

          {/* Text & Icon */}
          <ComponentsFormsWizardsPillsTextAndIcon />
        </div>

        {/* Circle */}
        <h4 className="badge mb-0 inline-block bg-primary text-base hover:top-0">
          Circle
        </h4>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* icon only */}
          <ComponentsFormsWizardsCircleIcon />
          {/* Text & Icon */}
          <ComponentsFormsWizardsCircleTextAndIcon />
        </div>

        {/* Square */}
        <h4 className="badge mb-0 inline-block bg-primary text-base hover:top-0">
          Square
        </h4>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* icon only */}
          <ComponentsFormsWizardsSquareIcon />

          {/* Text & Icon */}
          <ComponentsFormsWizardsSquareTextAndIcon />
        </div>
      </div>
    </div>
  );
};

export default Wizards;
