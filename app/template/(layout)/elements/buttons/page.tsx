import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import ElementsButtonsBlock from './ElementsButtonsBlock';
import ElementsButtonsDefault from './ElementsButtonsDefault';
import ElementsButtonsOutline from './ElementsButtonsOutline';
import ElementsButtonsRounded from './ElementsButtonsRounded';
import ElementsButtonsSizes from './ElementsButtonsSizes';
import ElementsButtonsSolid from './ElementsButtonsSolid';
import ElementsButtonsWithIcons from './ElementsButtonsWithIcons';

export const metadata: Metadata = {
  title: "Buttons",
};
const Buttons = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Elements
          </Link>
        </li>
        <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
          <span>Buttons</span>
        </li>
      </ul>
      <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        <ElementsButtonsDefault />
        <ElementsButtonsRounded />
        <ElementsButtonsSolid />
        <ElementsButtonsOutline />
        <ElementsButtonsSizes />
        <ElementsButtonsWithIcons />
        <ElementsButtonsBlock />
      </div>
    </div>
  );
};

export default Buttons;
