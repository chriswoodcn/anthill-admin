import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ElementsAvatarAnimateXAxis from "./ElementsAvatarAnimateXAxis";
import ElementsAvatarAnimateYAxis from "./ElementsAvatarAnimateYAxis";
import ElementsAvatarBasic from "./ElementsAvatarBasic";
import ElementsAvatarGroup from "./ElementsAvatarGroup";
import ElementsAvatarIndicators from "./ElementsAvatarIndicators";
import ElementsAvatarInitials from "./ElementsAvatarInitials";
import ElementsAvatarShapes from "./ElementsAvatarShapes";
import ElementsAvatarTooltip from "./ElementsAvatarTooltip";

export const metadata: Metadata = {
  title: "Avatar",
};

const Avatar = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Elements
          </Link>
        </li>
        <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
          <span>Avatar</span>
        </li>
      </ul>
      <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        <ElementsAvatarBasic />
        <ElementsAvatarIndicators />
        <ElementsAvatarShapes />
        <ElementsAvatarInitials />
        <ElementsAvatarGroup />
        <ElementsAvatarAnimateYAxis />
        <ElementsAvatarAnimateXAxis />
        <ElementsAvatarTooltip />
      </div>
    </div>
  );
};

export default Avatar;
