import PanelCodeHighlight from '@/components/compose/PanelCodeHighlight';
import React from "react";
import Image from "@/components/core/Image";

const ElementsAvatarAnimateYAxis = () => {
  return (
    <PanelCodeHighlight
      title="Animate Y-axis"
      codeHighlight={`<div className="flex items-center justify-center -space-x-4 rtl:space-x-reverse text-white">
    <Image
        className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-white-dark relative transition-all duration-300 hover:hover:translate-y-2"
        src="/assets/images/template/profile-12.jpeg"
        alt="img"
    />
    <Image
        className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-white-dark relative transition-all duration-300 hover:hover:translate-y-2"
        src="/assets/images/template/profile-12.jpeg"
        alt="img"
    />
    <Image
        className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-white-dark relative transition-all duration-300 hover:hover:translate-y-2"
        src="/assets/images/template/profile-12.jpeg"
        alt="img"
    />
    <span className="flex justify-center items-center w-12 h-12 text-center rounded-full object-cover bg-info text-base ring-2 ring-white dark:ring-white-dark relative transition-all duration-300 hover:hover:translate-y-2">
        AG
    </span>
</div>`}
    >
      <div className="mb-5">
        <div className="flex items-center justify-center -space-x-4 text-white rtl:space-x-reverse">
          <Image
            className="relative h-12 w-12 rounded-full object-cover ring-2 ring-white transition-all duration-300 hover:hover:translate-y-2 dark:ring-white-dark"
            src="/assets/images/template/profile-12.jpeg"
            alt="img"
          />
          <Image
            className="relative h-12 w-12 rounded-full object-cover ring-2 ring-white transition-all duration-300 hover:hover:translate-y-2 dark:ring-white-dark"
            src="/assets/images/template/profile-12.jpeg"
            alt="img"
          />
          <Image
            className="relative h-12 w-12 rounded-full object-cover ring-2 ring-white transition-all duration-300 hover:hover:translate-y-2 dark:ring-white-dark"
            src="/assets/images/template/profile-12.jpeg"
            alt="img"
          />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-info object-cover text-center text-base ring-2 ring-white transition-all duration-300 hover:hover:translate-y-2 dark:ring-white-dark">
            AG
          </span>
        </div>
      </div>
    </PanelCodeHighlight>
  );
};

export default ElementsAvatarAnimateYAxis;
