"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import NoData from "../../_component/NoData";
import PanelAdminUser from "../company-users/PanelAdminUser";

const categories = [
  {
    name: "超管账号管理员",
    key: "super-admin",
    panel: (comId: string) => <PanelAdminUser comId={comId} />,
  },
  {
    name: "超管账号普通用户",
    key: "super-regular",
    panel: (comId: string) => <PanelAdminUser comId={comId} />,
  },
  {
    name: "维护账号管理员",
    key: "maintain-admin",
    panel: (comId: string) => <PanelAdminUser comId={comId} />,
  },
  {
    name: "维护账号普通用户",
    key: "maintain-regular",
    panel: (comId: string) => <PanelAdminUser comId={comId} />,
  },
  {
    name: "系统账号管理员",
    key: "sysuser-admin",
    panel: (comId: string) => <PanelAdminUser comId={comId} />,
  },
  {
    name: "系统账号普通用户",
    key: "sysuser-regular",
    panel: (comId: string) => <PanelAdminUser comId={comId} />,
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
            {name}
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
