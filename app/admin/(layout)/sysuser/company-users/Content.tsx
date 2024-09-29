"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import PanelAdminUser from "./PanelAdminUser";
import PanelRegularUser from "./PanelRegularUser";
import { useTranslation } from "react-i18next";

const categories = [
  {
    name: "管理员",
    key: "admin",
    panel: () => <PanelAdminUser />,
  },
  {
    name: "普通用户",
    key: "regular",
    panel: () => <PanelRegularUser />,
  },
];

export default function SysuserCompanyUsersContent() {
  const { t } = useTranslation("admin_sysuser_company_users");

  return (
    <TabGroup>
      <TabList className="flex gap-2 px-3">
        {categories.map(({ name }) => (
          <Tab
            key={name}
            className="rounded-lg shadow-lg py-2 px-6 text-sm/6 font-semibold bg-white focus:outline-none data-[selected]:bg-primary data-[selected]:text-white data-[hover]:bg-white/50 data-[selected]:data-[hover]:bg-primary/50 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            {name}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-3">
        {categories.map(({ name, panel }) => (
          <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
            {panel()}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
