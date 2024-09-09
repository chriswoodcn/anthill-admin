import PanelCodeHighlight from "@/components/compose/PanelCodeHighlight";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Switches",
};

const Switches = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="#" className="text-primary hover:underline">
            Forms
          </Link>
        </li>
        <li className="before:content-['/'] dark:text-white-7 ltr:before:mr-2 rtl:before:ml-2">
          <span>Switches</span>
        </li>
      </ul>
      <div className="space-y-8 pt-5">
        <div className="space-y-8" id="icons">
          <h4 className="badge inline-block bg-primary text-base hover:top-0">
            Icon
          </h4>
          {/* Icons */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PanelCodeHighlight
              title="Default"
              codeHighlight={`<label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />

    <span className={\`outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300\`}></span>
</label>`}
            >
              <div className="mb-5">
                <label className="relative block h-6 w-12">
                  <input
                    type="checkbox"
                    className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                    id="custom_switch_checkbox1"
                  />

                  <span
                    className={`outline_checkbox block h-full rounded-sm border-2 border-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:bg-[#ebedf2] before:bg-bg_checbox_close before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary peer-checked:before:bg-bg_checbox_checked dark:border-black-6 dark:before:bg-black-6`}
                  ></span>
                </label>
              </div>
            </PanelCodeHighlight>

            <PanelCodeHighlight
              title="Rounded"
              codeHighlight={`<label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
    <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-black-6 block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-black-6 before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-bg_checbox_close before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-bg_checbox_checked peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
</label>`}
            >
              <div className="mb-5">
                <label className="relative block h-6 w-12">
                  <input
                    type="checkbox"
                    className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                    id="custom_switch_checkbox1"
                  />
                  <span className="outline_checkbox block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:bg-bg_checbox_close before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary peer-checked:before:bg-bg_checbox_checked dark:border-black-7 dark:before:bg-black-7"></span>
                </label>
              </div>
            </PanelCodeHighlight>
          </div>
        </div>
        <div className="space-y-8" id="solid">
          <h4 className="badge inline-block bg-primary text-base hover:top-0">
            Solid
          </h4>
          {/* Solid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PanelCodeHighlight
              title="Default"
              codeHighlight={`<label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
    <span className="bg-[#ebedf2] dark:bg-dark block h-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300 "></span>
</label>`}
            >
              <div className="mb-5">
                <label className="relative block h-6 w-12">
                  <input
                    type="checkbox"
                    className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                    id="custom_switch_checkbox1"
                  />
                  <span className="block h-full bg-white-6 rounded-sm before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-black-6 dark:before:bg-white-dark dark:peer-checked:before:bg-white "></span>
                </label>
              </div>
            </PanelCodeHighlight>

            <PanelCodeHighlight
              title="Rounded"
              codeHighlight={`<label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
</label>`}
            >
              <div className="mb-5">
                <label className="relative block h-6 w-12">
                  <input
                    type="checkbox"
                    className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                    id="custom_switch_checkbox1"
                  />
                  <span className="block h-full rounded-full bg-white-6 before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-black-6 dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                </label>
              </div>
            </PanelCodeHighlight>
          </div>
        </div>
        <div className="space-y-8" id="outline">
          <h4 className="badge inline-block bg-primary text-base hover:top-0">
            Outline
          </h4>
          {/* Outline */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PanelCodeHighlight
              title="Default"
              codeHighlight={`<label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
    <span className="outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 peer-checked:before:left-7 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
</label>`}
            >
              <div className="mb-5">
                <label className="relative block h-6 w-12">
                  <input
                    type="checkbox"
                    className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                    id="custom_switch_checkbox1"
                  />
                  <span className="outline_checkbox block h-full border-2 border-white-6 before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:bg-black-3 before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary dark:border-black-6 dark:before:bg-black-3"></span>
                </label>
              </div>
            </PanelCodeHighlight>

            <PanelCodeHighlight
              title="Rounded"
              codeHighlight={`<label className="w-12 h-6 relative">
    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
    <span className="outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
</label>`}
            >
              <div className="mb-5">
                <label className="relative block h-6 w-12">
                  <input
                    type="checkbox"
                    className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                    id="custom_switch_checkbox1"
                  />
                  <span className="outline_checkbox block h-full rounded-full border-2 border-white-6 before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-black-3 before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary dark:border-white-dark dark:before:bg-white-dark"></span>
                </label>
              </div>
            </PanelCodeHighlight>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Switches;
