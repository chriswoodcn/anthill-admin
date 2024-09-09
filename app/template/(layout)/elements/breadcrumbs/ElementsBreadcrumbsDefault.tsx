import IconHome from "@/components/icon/icon-home";
import PanelCodeHighlight from '@/components/compose/PanelCodeHighlight';
import React from "react";

const ElementsBreadcrumbsDefault = () => {
  return (
    <PanelCodeHighlight
      title="Default"
      codeHighlight={`<ol className="flex text-gray-500 font-semibold dark:text-white-dark">
    <li>
        <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
        <svg>...</svg>
        </button>
    </li>
    <li className="before:content-['/'] dark:text-white-7 before:px-1.5">
        <button type="button">Components</button>
    </li>
    <li className="before:content-['/'] dark:text-white-7 before:px-1.5">
        <button className="text-black dark:text-white-7 hover:text-black/70 dark:hover:text-white-7">UI Kit</button>
    </li>
</ol>`}
    >
      <div className="mb-5">
        <ol className="flex font-semibold text-gray-500 dark:text-white-dark">
          <li>
            <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
              <IconHome className="h-4 w-4" />
            </button>
          </li>
          <li className="before:px-1.5 before:content-['/'] dark:text-white-7">
            <button type="button">Components</button>
          </li>
          <li className="before:px-1.5 before:content-['/'] dark:text-white-7">
            <button className="text-black hover:text-black/70 dark:text-white-7 dark:hover:text-white-7">
              UI Kit
            </button>
          </li>
        </ol>
      </div>
    </PanelCodeHighlight>
  );
};

export default ElementsBreadcrumbsDefault;
