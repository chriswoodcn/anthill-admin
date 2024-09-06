import IconBellBing from "@/components/icon/icon-bell-bing";
import PanelCodeHighlight from "@/components/compose/PanelCodeHighlight";
import React from "react";

const ComponentsFormsInputGroupSimpleIcon = () => {
  return (
    <PanelCodeHighlight
      title="Simple Icon"
      codeHighlight={`{/*left*/}
<div className="flex">
    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-black-7">
        <svg> ... </svg>
    </div>
    <input id="iconLeft" type="text" placeholder="Notification" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
</div>

{/*right*/}
<div className="flex">
    <input id="iconRight" type="text" placeholder="Notification" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-black-7">
        <svg> ... </svg>
    </div>
</div>`}
    >
      <div className="mb-5">
        <div className="mb-5">
          <label htmlFor="iconLeft">Left</label>
          <div className="flex">
            <div className="flex items-center justify-center border border-white-light bg-[#eee] px-3 font-semibold ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0 dark:border-[#17263c] dark:bg-black-7">
              <IconBellBing className="text-white-dark" />
            </div>
            <input
              id="iconLeft"
              type="text"
              placeholder="Notification"
              className="form-input ltr:rounded-l-none rtl:rounded-r-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="iconRight">Right</label>
          <div className="flex">
            <input
              id="iconRight"
              type="text"
              placeholder="Notification"
              className="form-input ltr:rounded-r-none rtl:rounded-l-none"
            />
            <div className="flex items-center justify-center border border-white-light bg-[#eee] px-3 font-semibold ltr:rounded-r-md ltr:border-l-0 rtl:rounded-l-md rtl:border-r-0 dark:border-[#17263c] dark:bg-black-7">
              <IconBellBing className="text-white-dark" />
            </div>
          </div>
        </div>
      </div>
    </PanelCodeHighlight>
  );
};

export default ComponentsFormsInputGroupSimpleIcon;
