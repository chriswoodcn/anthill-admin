"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { useTranslation } from "react-i18next";
import PanelUserList from "./PanelUserList";
import { RootState, selectUserType, useAppSelector, UserType } from "@/store";
import { useEffect, useState } from "react";
import { log } from "console";

const categories = [
  {
    name: "SuperAdmin",
    key: UserType.SuperAdmin,
    panel: <PanelUserList type={UserType.SuperAdmin} />,
  },
  {
    name: "SuperUser",
    key: UserType.SuperUser,
    panel: <PanelUserList type={UserType.SuperUser} />,
  },
  {
    name: "MaintainAdmin",
    key: UserType.MaintaineAdmin,
    panel: <PanelUserList type={UserType.MaintaineAdmin} />,
  },
  {
    name: "MaintainUser",
    key: UserType.MaintainUser,
    panel: <PanelUserList type={UserType.MaintainUser} />,
  },
  {
    name: "SystemAdmin",
    key: UserType.SystemAdmin,
    panel: <PanelUserList type={UserType.SystemAdmin} />,
  },
  {
    name: "SystemUser",
    key: UserType.SystemUser,
    panel: <PanelUserList type={UserType.SystemUser} />,
  },
];

export default function SysuserCompanyUsersContent() {
  const { t } = useTranslation("admin_sysuser_company_users");
  const loginUserType = useAppSelector((state: RootState) =>
    selectUserType(state)
  );

  const [showCategories, setShowCategories] = useState<typeof categories>([]);
  useEffect(() => {
    getShowCategories();
  }, [loginUserType]);

  const getShowCategories = () => {
    setShowCategories(categories.filter((item) => item.key >= loginUserType));
  };

  return (
    <TabGroup>
      <TabList className="flex gap-2 p-3 flex-nowrap overflow-x-scroll">
        {showCategories.map(({ name }) => (
          <Tab
            key={name}
            className="rounded-lg shadow-lg py-2 px-6 text-sm/6 font-semibold bg-white focus:outline-none data-[selected]:bg-primary data-[selected]:text-white data-[hover]:bg-white/50 data-[selected]:data-[hover]:bg-primary/50 data-[focus]:outline-1 data-[focus]:outline-white text-nowrap"
          >
            {t(name)}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-3">
        {categories.map(({ name, panel }) => {
          return (
            <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
              {panel}
            </TabPanel>
          );
        })}
      </TabPanels>
    </TabGroup>
  );
}
