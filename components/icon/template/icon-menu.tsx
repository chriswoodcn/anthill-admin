import { FC, ReactNode } from "react";
import IconMenuDashboard from "../menu/icon-menu-dashboard";
import IconMenuChat from "../menu/icon-menu-chat";
import IconMenuMailbox from "../menu/icon-menu-mailbox";
import IconMenuTodo from "../menu/icon-menu-todo";
import IconMenuNotes from "../menu/icon-menu-notes";
import IconMenuScrumboard from "../menu/icon-menu-scrumboard";
import IconMenuContacts from "../menu/icon-menu-contacts";
import IconMenuInvoice from "../menu/icon-menu-invoice";
import IconMenuCalendar from "../menu/icon-menu-calendar";
import IconMenuComponents from "../menu/icon-menu-components";
import IconMenuElements from "../menu/icon-menu-elements";
import IconMenuMore from "../menu/icon-menu-more";
import IconMenuTables from "../menu/icon-menu-tables";
import IconMenuDatatables from "../menu/icon-menu-datatables";
import IconMenuForms from "../menu/icon-menu-forms";
import IconMenuUsers from "../menu/icon-menu-users";
import IconMenuPages from "../menu/icon-menu-pages";
import IconMenuAuthentication from "../menu/icon-menu-authentication";
import IconMenuCrypto from "../menu/icon-menu-crypto";
import IconMenuFinance from "../menu/icon-menu-finance";
import IconMenuAnalytics from "../menu/icon-menu-analytics";
import IconMenuSales from "../menu/icon-menu-sales";

interface MenuProps {
  className?: string;
}
interface MenuOptions extends MenuProps {
  name?: string;
  defaultValue?: ReactNode;
}
const MenuTemplateMap: Record<string, FC<MenuProps>> = {
  default: IconMenuDashboard,
  "menu-template-dashboard": IconMenuDashboard,
  "menu-template-chat": IconMenuChat,
  "menu-template-mailbox": IconMenuMailbox,
  "menu-template-todolist": IconMenuTodo,
  "menu-template-notes": IconMenuNotes,
  "menu-template-scrumboard": IconMenuScrumboard,
  "menu-template-contacts": IconMenuContacts,
  "menu-template-invoice": IconMenuInvoice,
  "menu-template-calendar": IconMenuCalendar,
  "menu-template-components": IconMenuComponents,
  "menu-template-elements": IconMenuElements,
  "menu-template-more": IconMenuMore,
  "menu-template-tables": IconMenuTables,
  "menu-template-datatables": IconMenuDatatables,
  "menu-template-forms": IconMenuForms,
  "menu-template-users": IconMenuUsers,
  "menu-template-pages": IconMenuPages,
  "menu-template-authentication": IconMenuAuthentication,
  "menu-template-crypto": IconMenuCrypto,
  "menu-template-finance": IconMenuFinance,
  "menu-template-analytics": IconMenuAnalytics,
  "menu-template-sales": IconMenuSales,
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
    <IconMenuDashboard />
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
