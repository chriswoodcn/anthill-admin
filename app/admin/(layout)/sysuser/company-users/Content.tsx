"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import PanelAdminUser from "./PanelAdminUser";
import PanelRegularUser from "./PanelRegularUser";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import NoData from "../../_component/NoData";
import { UserType } from '@/store';

const categories = [
  {
    name: UserType[4],
    key: "admin",
    panel: (comId: string) => <PanelAdminUser comId={comId} />,
  },
  {
    name: UserType[5],
    key: "regular",
    panel: (comId: string) => <PanelRegularUser comId={comId} />,
  },
];

export default function SysuserCompanyUsersContent() {
  const searchParams = useSearchParams();
  const { t } = useTranslation("admin_sysuser_company_users");

  return (
    <TabGroup>
      <TabList className="flex gap-2 px-3 flex-wrap">
        {categories.map(({ name }) => (
          <Tab
            key={name}
            className="rounded-lg shadow-lg py-2 px-6 text-sm/6 font-semibold bg-white focus:outline-none data-[selected]:bg-primary data-[selected]:text-white data-[hover]:bg-white/50 data-[selected]:data-[hover]:bg-primary/50 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            {t(name)}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-3">
        {categories.map(({ name, panel }) => (
          <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
            {searchParams.get("comId") ? (
              panel(searchParams.get("comId")!!)
            ) : (
              <div className="panel">
                <NoData title={t("invalid_com_id")} />
              </div>
            )}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
