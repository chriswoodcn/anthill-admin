"use client";

import { Tab, TabGroup, TabPanel, TabPanels, TabList } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";

import useEffectOnce from '@/lib/useEffectOnce';

import PanelCodeHighlight from '@/components/compose/PanelCodeHighlight';
import Image from "@/components/core/Image";

const ComponentsTabsSimple = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffectOnce(() => {
    setIsMounted(true);
  }, []);

  return (
    <PanelCodeHighlight
      title="Simple Tabs"
      codeHighlight={`import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Fragment } from 'react';

<TabGroup>
    <TabList className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
        <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={\`\${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                    dark:hover:border-b-black -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary\`}>
                    Home
                </button>
            )}
        </Tab>
        <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={\`\${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                    dark:hover:border-b-black -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary\`}>
                    Profile
                </button>
            )}
        </Tab>
        <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={\`\${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''}
                    dark:hover:border-b-black -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary\`}>
                    Contact
                </button>
            )}
        </Tab>
        <Tab className="pointer-events-none -mb-[1px] block p-3.5 py-2 text-white-light outline-none dark:text-dark">Disabled</Tab>
    </TabList>
</TabGroup>
<TabPanels>
    <TabPanel>
        <div className="active pt-5">
            <h4 className="mb-4 text-2xl font-semibold">We move your world!</h4>
            <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </div>
    </TabPanel>
    <TabPanel>
        <div>
            <div className="flex items-start pt-5">
                <div className="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
                    <img
                        src="/assets/images/profile-34.jpeg"
                        alt="img"
                        className="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark"
                    />
                </div>
                <div className="flex-auto">
                    <h5 className="mb-4 text-xl font-medium">Media heading</h5>
                    <p className="text-white-dark">
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at,
                        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </p>
                </div>
            </div>
        </div>
    </TabPanel>
    <TabPanel>
        <div className="pt-5">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
            </p>
        </div>
    </TabPanel>
    <TabPanel>Disabled</TabPanel>
</TabPanels>`}
    >
      <div className="mb-5">
        {isMounted && (
          <TabGroup>
            <TabList className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? "!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black "
                        : ""
                    } -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                  >
                    Home
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? "!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black "
                        : ""
                    } -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                  >
                    Profile
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? "!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black "
                        : ""
                    } -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                  >
                    Contact
                  </button>
                )}
              </Tab>
              <Tab className="pointer-events-none -mb-[1px] block p-3.5 py-2 text-white-light outline-none dark:text-dark">
                Disabled
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="active pt-5">
                  <h4 className="mb-4 text-2xl font-semibold">
                    We move your world!
                  </h4>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <div className="flex items-start pt-5">
                    <div className="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
                      <Image
                        src="/assets/images/template/profile-34.jpeg"
                        alt="img"
                        className="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark"
                      />
                    </div>
                    <div className="flex-auto">
                      <h5 className="mb-4 text-xl font-medium">
                        Media heading
                      </h5>
                      <p className="text-white-dark">
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel
                        metus scelerisque ante sollicitudin. Cras purus odio,
                        vestibulum in vulputate at, tempus viverra turpis. Fusce
                        condimentum nunc ac nisi vulputate fringilla. Donec
                        lacinia congue felis in faucibus.
                      </p>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="pt-5">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </TabPanel>
              <TabPanel>Disabled</TabPanel>
            </TabPanels>
          </TabGroup>
        )}
      </div>
    </PanelCodeHighlight>
  );
};

export default ComponentsTabsSimple;
