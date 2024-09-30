"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { useTranslation } from "react-i18next";
import PanelUserList, { UserType } from "./PanelUserList";

const categories = [
  {
    name: "超管账号管理员",
    key: UserType.SuperAdmin,
    panel: <PanelUserList type={UserType.SuperAdmin} />,
  },
  {
    name: "超管账号普通用户",
    key: UserType.SuperUser,
    panel: <PanelUserList type={UserType.SuperUser} />,
  },
  {
    name: "维护账号管理员",
    key: UserType.MaintaineAdmin,
    panel: <PanelUserList type={UserType.MaintaineAdmin} />,
  },
  {
    name: "维护账号普通用户",
    key: UserType.MaintainUser,
    panel: <PanelUserList type={UserType.MaintainUser} />,
  },
  {
    name: "系统账号管理员",
    key: UserType.SystemAdmin,
    panel: <PanelUserList type={UserType.SystemAdmin} />,
  },
  {
    name: "系统账号普通用户",
    key: UserType.SystemUser,
    panel: <PanelUserList type={UserType.SystemUser} />,
  },
];

export default function SysuserCompanyUsersContent() {
  const { t } = useTranslation("admin_sysuser_company_users");

  return (
    <TabGroup>
      <TabList className="flex gap-2 p-3 flex-nowrap overflow-x-scroll">
        {categories.map(({ name }) => (
          <Tab
            key={name}
            className="rounded-lg shadow-lg py-2 px-6 text-sm/6 font-semibold bg-white focus:outline-none data-[selected]:bg-primary data-[selected]:text-white data-[hover]:bg-white/50 data-[selected]:data-[hover]:bg-primary/50 data-[focus]:outline-1 data-[focus]:outline-white text-nowrap"
          >
            {name}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-3">
        {categories.map(({ name, panel }) => (
          <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
            {panel}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
