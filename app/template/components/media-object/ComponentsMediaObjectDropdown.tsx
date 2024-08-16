"use client";

import React from "react";

import { RootState, useAppSelector } from "@/store";

import IconBarChart from "@/components/icon/icon-bar-chart";
import IconChatDot from "@/components/icon/icon-chat-dot";
import IconHorizontalDots from "@/components/icon/icon-horizontal-dots";
import IconPhone from "@/components/icon/icon-phone";
import PanelCodeHighlight from "@/components/compose/PanelCodeHighlight";
import Dropdown from "@/components/core/Dropdown";
import Image from "@/components/core/Image";

const ComponentsMediaObjectDropdown = () => {
  const isRtl =
    useAppSelector((state: RootState) => state.adminSetting.rtlClass) === "rtl";
  return (
    <PanelCodeHighlight
      title="Dropdown List"
      codeHighlight={`import Dropdown from '@/components/Dropdown';

<div className="dropdown mb-5">
    <div className="flex">
        <div className="ltr:mr-4 rtl:ml-4">
            <Image src="/assets/images/template/profile-5.jpeg" alt="img" className="h-14 w-14 rounded" />
        </div>
        <div className="flex-1">
            <div className="mb-2 flex justify-between">
                <h4 className="text-lg font-semibold text-primary">Heading </h4>
                <div className="dropdown">
                    <Dropdown
                        offset={[0, 5]}
                        placement={\`\${isRtl ? 'bottom-start' : 'bottom-end'}\`}
                        btnClassName="text-white-dark"
                        button={<IconHorizontalDots className="text-white-dark opacity-70" />}
                    >
                        <ul className="!min-w-[130px]">
                            <li>
                                <button type="button">
                                    <IconChatDot className="ltr:mr-1 rtl:ml-1" />
                                    Start chat
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <IconPhone className="ltr:mr-1 rtl:ml-1" />
                                    Make a call
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <IconBarChart className="ltr:mr-1 rtl:ml-1" />
                                    Statistics
                                </button>
                            </li>
                        </ul>
                    </Dropdown>
                </div>
            </div>
            <p className="media-text">
                Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed dapibus nulla elementum, rutrum neque
                eu, gravida neque.
            </p>
        </div>
    </div>
</div>`}
    >
      <div className="dropdown mb-5">
        <div className="flex">
          <div className="ltr:mr-4 rtl:ml-4">
            <Image
              src="/assets/images/template/profile-5.jpeg"
              alt="img"
              className="h-14 w-14 rounded"
            />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex justify-between">
              <h4 className="text-lg font-semibold text-primary">Heading </h4>
              <div className="dropdown">
                <Dropdown
                  offset={[0, 5]}
                  placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                  btnClassName="text-white-dark"
                  button={
                    <IconHorizontalDots className="text-white-dark opacity-70" />
                  }
                >
                  <ul className="!min-w-[130px]">
                    <li>
                      <button type="button">
                        <IconChatDot className="ltr:mr-1 rtl:ml-1" />
                        Start chat
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <IconPhone className="ltr:mr-1 rtl:ml-1" />
                        Make a call
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <IconBarChart className="ltr:mr-1 rtl:ml-1" />
                        Statistics
                      </button>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </div>
            <p className="media-text">
              Fusce condimentum cursus mauris et ornare. Mauris fermentum mi id
              sollicitudin viverra. Aenean dignissim sed ante eget dapibus. Sed
              dapibus nulla elementum, rutrum neque eu, gravida neque.
            </p>
          </div>
        </div>
      </div>
    </PanelCodeHighlight>
  );
};

export default ComponentsMediaObjectDropdown;
