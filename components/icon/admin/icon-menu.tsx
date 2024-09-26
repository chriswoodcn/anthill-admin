import { FC, ReactNode } from "react";
import IconMenuSystemMenu from "./icon-menu-system-menu";
import IconMenuSystemDict from "./icon-menu-system-dict";
import IconMenuSystemParam from "./icon-menu-system-param";
import IconMenuSystemConfig from "./icon-menu-system-config";
import IconMenuSysuserList from "./icon-menu-sysuser-list";
import IconMenuSysuserRole from "./icon-menu-sysuser-role";
import IconMenuSystoolJob from "./icon-menu-systool-job";
import IconMenuSysmonitorOnline from "./icon-menu-sysmonitor-online";
import IconMenuLog from "./icon-menu-log";
import IconMenuDashboard from "../menu/icon-menu-dashboard";
import IconMenuSysuserTemplate from "./icon-menu-sysuser-template";
import IconMenuSysuserCompany from "./icon-menu-sysuser-company";

interface MenuProps {
  className?: string;
}
interface MenuOptions extends MenuProps {
  name?: string;
  defaultValue?: ReactNode;
}
const MenuTemplateMap: Record<string, FC<MenuProps>> = {
  default: IconMenuSystemMenu,
  "admin-home": IconMenuDashboard,
  "system-menu": IconMenuSystemMenu,
  "system-dict": IconMenuSystemDict,
  "system-param": IconMenuSystemParam,
  "system-config": IconMenuSystemConfig,
  "sysuser-list": IconMenuSysuserList,
  "sysuser-role": IconMenuSysuserRole,
  "sysuser-template": IconMenuSysuserTemplate,
  "sysuser-company": IconMenuSysuserCompany,
  "systool-job": IconMenuSystoolJob,
  "sysmonitor-online": IconMenuSysmonitorOnline,
  "sysmonitor-loginLog": IconMenuLog,
  "sysmonitor-operLog": IconMenuLog,
};
const switchIcon = (
  name: string,
  defaultValue: ReactNode = null,
  props: MenuOptions
) => {
  const El = MenuTemplateMap[name];
  return El ? (
    <El {...props} />
  ) : defaultValue ? (
    defaultValue
  ) : (
    <IconMenuSystemMenu />
  );
};
const IconMenu = (options: MenuOptions) => {
  const { name, defaultValue } = options;
  const copyOpt = { ...options };
  const props = Object.assign(copyOpt, {
    name: undefined,
    defaultValue: undefined,
  });
  if (name == undefined) return null;
  return <>{switchIcon(name, defaultValue, props)}</>;
};

export default IconMenu;
