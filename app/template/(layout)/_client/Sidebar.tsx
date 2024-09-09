"use client";

import PerfectScrollbar from "react-perfect-scrollbar";
import Link from "next/link";
import AnimateHeight from "react-animate-height";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { toggleSidebar } from "@/store/slices/admin";
import { TemplateMenuTree, TemplateMenuList, Menu } from "./menu";

import Logo from "@/components/compose/Logo";
import IconCaretsDown from "@/components/icon/icon-carets-down";
import IconMenuDashboard from "@/components/icon/menu/icon-menu-dashboard";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconMinus from "@/components/icon/icon-minus";
import IconMenuChat from "@/components/icon/menu/icon-menu-chat";
import IconMenuMailbox from "@/components/icon/menu/icon-menu-mailbox";
import IconMenuTodo from "@/components/icon/menu/icon-menu-todo";
import IconMenuNotes from "@/components/icon/menu/icon-menu-notes";
import IconMenuScrumboard from "@/components/icon/menu/icon-menu-scrumboard";
import IconMenuContacts from "@/components/icon/menu/icon-menu-contacts";
import IconMenuInvoice from "@/components/icon/menu/icon-menu-invoice";
import IconMenuCalendar from "@/components/icon/menu/icon-menu-calendar";
import IconMenuComponents from "@/components/icon/menu/icon-menu-components";
import IconMenuElements from "@/components/icon/menu/icon-menu-elements";
import IconMenuTables from "@/components/icon/menu/icon-menu-tables";
import IconMenuDatatables from "@/components/icon/menu/icon-menu-datatables";
import IconMenuForms from "@/components/icon/menu/icon-menu-forms";
import IconMenuUsers from "@/components/icon/menu/icon-menu-users";
import IconMenuPages from "@/components/icon/menu/icon-menu-pages";
import IconMenuAuthentication from "@/components/icon/menu/icon-menu-authentication";
import IconMenuMore from "@/components/icon/menu/icon-menu-more";
import { isBrowser } from "@/lib";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import logger from "@/lib/logger";
import IconMenu from "@/components/icon/template/icon-menu";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const pathname = usePathname();
  const [initMenuBar, setInitMenuBar] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const [currentMenuList, setCurrentMenuList] = useState<string[]>([]);
  const [errorSubMenu, setErrorSubMenu] = useState(false);
  const adminSetting = useAppSelector((state: RootState) => state.adminSetting);
  const isDarkMode = useAppSelector(
    (state: RootState) => state.adminSetting.isDarkMode
  );
  const menu = useAppSelector((state: RootState) => state.adminSetting.menu);
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };
  const toggleMenuList = (value: string) => {
    logger.debug("toggleMenuList ", value);
    // currentMenuList包含当前的menuKey，截断当前的
    if (currentMenuList.includes(value)) {
      let index = currentMenuList.findIndex((m) => m == value);
      let newList = [...currentMenuList];
      newList.splice(index);
      setCurrentMenuList(newList);
    } else {
      const parentKey = findParentKey(value);
      if (parentKey == undefined) {
        setCurrentMenuList([value]);
      } else {
        const parentKeys = findMenuAllParentKey(value);
        // currentMenuList不包含当前的menuKey
        setCurrentMenuList([...parentKeys, value]);
      }
    }
  };
  /**
   * 查找上一级菜单的MenuKey
   */
  const findParentKey = (parentKey: string) => {
    const find = TemplateMenuList.find((item) => item.menuKey == parentKey);
    return find && find.parentKey ? find.parentKey : undefined;
  };
  /**
   * 查找出所有上级菜单的MenuKey
   */
  const findMenuAllParentKey = (menuKey: string) => {
    if (!menuKey) return [];
    const keys = [];
    const selectedMenu = TemplateMenuList.find(
      (m) => m.menuKey && m.menuKey == menuKey
    );
    if (!selectedMenu) return [];
    let key: string | undefined = selectedMenu.parentKey;
    while (key) {
      keys.push(key);
      key = findParentKey(key);
    }
    return keys;
  };

  useEffectOnce(() => {
    if (isBrowser()) {
      //标记 初始化菜单栏
      setInitMenuBar(true);
      const templateMenu = TemplateMenuList.find(
        (item) => item.path == pathname
      );
      if (templateMenu && templateMenu.menuKey) {
        const parentKeys = findMenuAllParentKey(templateMenu.menuKey);
        setCurrentMenuList([...parentKeys, templateMenu.menuKey]);
      }
    }
  }, [pathname]);
  useEffectOnce(() => {
    logger.debug("currentMenuList", currentMenuList);
    if (isBrowser() && initMenuBar && currentMenuList.length > 0) {
      const selector = document.querySelector(
        '.sidebar a[href="' + window.location.pathname + '"]'
      );
      logger.debug("scrollIntoView");
      setTimeout(() => {
        selector?.scrollIntoView({ behavior: "smooth", block: "center" });
        setInitMenuBar(false);
      }, 500);
    }
  }, [currentMenuList]);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && adminSetting.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll(".sidebar a.active");
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove("active");
    }
    const selector = document.querySelector(
      '.sidebar a[href="' + window.location.pathname + '"]'
    );
    selector?.classList.add("active");
  };
  const OriginSidebarMenuTree = () => (
    <ul className="relative space-y-0.5 p-2 py-0 pr-3 pb-24 font-semibold">
      <li className="menu nav-item">
        <button
          type="button"
          className={`${
            currentMenu === "dashboard" ? "active" : ""
          } nav-link group w-full`}
          onClick={() => toggleMenu("dashboard")}
        >
          <div className="flex items-center">
            <IconMenuDashboard className="shrink-0 group-hover:!text-primary" />
            <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
              {t("dashboard")}
            </span>
          </div>

          <div
            className={
              currentMenu !== "dashboard" ? "-rotate-90 rtl:rotate-90" : ""
            }
          >
            <IconCaretDown />
          </div>
        </button>

        <AnimateHeight
          duration={300}
          height={currentMenu === "dashboard" ? "auto" : 0}
        >
          <ul className="sub-menu text-gray-500">
            <li>
              <Link href="/template/index">{t("sales")}</Link>
            </li>
            <li>
              <Link href="/template/analytics">{t("analytics")}</Link>
            </li>
            <li>
              <Link href="/template/finance">{t("finance")}</Link>
            </li>
            <li>
              <Link href="/template/crypto">{t("crypto")}</Link>
            </li>
          </ul>
        </AnimateHeight>
      </li>

      <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
        <IconMinus className="hidden h-5 w-4 flex-none" />
        <span>{t("apps")}</span>
      </h2>

      <li className="nav-item">
        <ul>
          <li className="nav-item">
            <Link href="/template/apps/chat" className="group">
              <div className="flex items-center">
                <IconMenuChat className="shrink-0 group-hover:!text-primary" />
                <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                  {t("chat")}
                </span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/template/apps/mailbox" className="group">
              <div className="flex items-center">
                <IconMenuMailbox className="shrink-0 group-hover:!text-primary" />
                <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                  {t("mailbox")}
                </span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/template/apps/todolist" className="group">
              <div className="flex items-center">
                <IconMenuTodo className="shrink-0 group-hover:!text-primary" />
                <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                  {t("todo_list")}
                </span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/template/apps/notes" className="group">
              <div className="flex items-center">
                <IconMenuNotes className="shrink-0 group-hover:!text-primary" />
                <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                  {t("notes")}
                </span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/template/apps/scrumboard" className="group">
              <div className="flex items-center">
                <IconMenuScrumboard className="shrink-0 group-hover:!text-primary" />
                <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                  {t("scrumboard")}
                </span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/template/apps/contacts" className="group">
              <div className="flex items-center">
                <IconMenuContacts className="shrink-0 group-hover:!text-primary" />
                <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                  {t("contacts")}
                </span>
              </div>
            </Link>
          </li>

          <li className="menu nav-item">
            <button
              type="button"
              className={`${
                currentMenu === "invoice" ? "active" : ""
              } nav-link group w-full`}
              onClick={() => toggleMenu("invoice")}
            >
              <div className="flex items-center">
                <IconMenuInvoice className="shrink-0 group-hover:!text-primary" />
                <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                  {t("invoice")}
                </span>
              </div>

              <div
                className={
                  currentMenu !== "invoice" ? "-rotate-90 rtl:rotate-90" : ""
                }
              >
                <IconCaretDown />
              </div>
            </button>

            <AnimateHeight
              duration={300}
              height={currentMenu === "invoice" ? "auto" : 0}
            >
              <ul className="sub-menu text-gray-500">
                <li>
                  <Link href="/template/apps/invoice/list">{t("list")}</Link>
                </li>
                <li>
                  <Link href="/template/apps/invoice/preview">
                    {t("preview")}
                  </Link>
                </li>
                <li>
                  <Link href="/template/apps/invoice/add">{t("add")}</Link>
                </li>
                <li>
                  <Link href="/template/apps/invoice/edit">{t("edit")}</Link>
                </li>
              </ul>
            </AnimateHeight>
          </li>

          <li className="nav-item">
            <Link href="/template/apps/calendar" className="group">
              <div className="flex items-center">
                <IconMenuCalendar className="shrink-0 group-hover:!text-primary" />
                <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                  {t("calendar")}
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </li>

      <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
        <IconMinus className="hidden h-5 w-4 flex-none" />
        <span>{t("user_interface")}</span>
      </h2>

      <li className="menu nav-item" data-menu="component">
        <button
          type="button"
          className={`${
            currentMenu === "component" ? "active" : ""
          } nav-link group w-full`}
          onClick={() => toggleMenu("component")}
        >
          <div className="flex items-center">
            <IconMenuComponents className="shrink-0 group-hover:!text-primary" />
            <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
              {t("components")}
            </span>
          </div>

          <div
            className={
              currentMenu !== "component" ? "-rotate-90 rtl:rotate-90" : ""
            }
          >
            <IconCaretDown />
          </div>
        </button>

        <AnimateHeight
          duration={300}
          height={currentMenu === "component" ? "auto" : 0}
        >
          <ul className="sub-menu text-gray-500">
            <li>
              <Link href="/template/components/tabs">{t("tabs")}</Link>
            </li>
            <li>
              <Link href="/template/components/accordions">
                {t("accordions")}
              </Link>
            </li>
            <li>
              <Link href="/template/components/modals">{t("modals")}</Link>
            </li>
            <li>
              <Link href="/template/components/cards">{t("cards")}</Link>
            </li>
            <li>
              <Link href="/template/components/carousel">{t("carousel")}</Link>
            </li>
            <li>
              <Link href="/template/components/countdown">
                {t("countdown")}
              </Link>
            </li>
            <li>
              <Link href="/template/components/counter">{t("counter")}</Link>
            </li>
            <li>
              <Link href="/template/components/sweetalert">
                {t("sweet_alerts")}
              </Link>
            </li>
            <li>
              <Link href="/template/components/timeline">{t("timeline")}</Link>
            </li>
            <li>
              <Link href="/template/components/notifications">
                {t("notifications")}
              </Link>
            </li>
            <li>
              <Link href="/template/components/media-object">
                {t("media_object")}
              </Link>
            </li>
            <li>
              <Link href="/template/components/list-group">
                {t("list_group")}
              </Link>
            </li>
            <li>
              <Link href="/template/components/pricing-table">
                {t("pricing_tables")}
              </Link>
            </li>
            <li>
              <Link href="/template/components/lightbox">{t("lightbox")}</Link>
            </li>
          </ul>
        </AnimateHeight>
      </li>

      <li className="menu nav-item">
        <button
          type="button"
          className={`${
            currentMenu === "element" ? "active" : ""
          } nav-link group w-full`}
          onClick={() => toggleMenu("element")}
        >
          <div className="flex items-center">
            <IconMenuElements className="shrink-0 group-hover:!text-primary" />
            <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
              {t("elements")}
            </span>
          </div>

          <div
            className={
              currentMenu !== "element" ? "-rotate-90 rtl:rotate-90" : ""
            }
          >
            <IconCaretDown />
          </div>
        </button>

        <AnimateHeight
          duration={300}
          height={currentMenu === "element" ? "auto" : 0}
        >
          <ul className="sub-menu text-gray-500">
            <li>
              <Link href="/template/elements/alerts">{t("alerts")}</Link>
            </li>
            <li>
              <Link href="/template/elements/avatar">{t("avatar")}</Link>
            </li>
            <li>
              <Link href="/template/elements/badges">{t("badges")}</Link>
            </li>
            <li>
              <Link href="/template/elements/breadcrumbs">
                {t("breadcrumbs")}
              </Link>
            </li>
            <li>
              <Link href="/template/elements/buttons">{t("buttons")}</Link>
            </li>
            <li>
              <Link href="/template/elements/buttons-group">
                {t("button_groups")}
              </Link>
            </li>
            <li>
              <Link href="/template/elements/color-library">
                {t("color_library")}
              </Link>
            </li>
            <li>
              <Link href="/template/elements/dropdown">{t("dropdown")}</Link>
            </li>
            <li>
              <Link href="/template/elements/infobox">{t("infobox")}</Link>
            </li>
            <li>
              <Link href="/template/elements/jumbotron">{t("jumbotron")}</Link>
            </li>
            <li>
              <Link href="/template/elements/loader">{t("loader")}</Link>
            </li>
            <li>
              <Link href="/template/elements/pagination">
                {t("pagination")}
              </Link>
            </li>
            <li>
              <Link href="/template/elements/popovers">{t("popovers")}</Link>
            </li>
            <li>
              <Link href="/template/elements/progress-bar">
                {t("progress_bar")}
              </Link>
            </li>
            <li>
              <Link href="/template/elements/search">{t("search")}</Link>
            </li>
            <li>
              <Link href="/template/elements/tooltips">{t("tooltips")}</Link>
            </li>
            <li>
              <Link href="/template/elements/treeview">{t("treeview")}</Link>
            </li>
            <li>
              <Link href="/template/elements/typography">
                {t("typography")}
              </Link>
            </li>
          </ul>
        </AnimateHeight>
      </li>

      <li className="menu nav-item">
        <button
          type="button"
          className={`${
            currentMenu === "element" ? "active" : ""
          } nav-link group w-full`}
          onClick={() => toggleMenu("more")}
        >
          <div className="flex items-center">
            <IconMenuMore className="shrink-0 group-hover:!text-primary" />
            <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
              {t("more")}
            </span>
          </div>

          <div
            className={currentMenu !== "more" ? "-rotate-90 rtl:rotate-90" : ""}
          >
            <IconCaretDown />
          </div>
        </button>
        <AnimateHeight
          duration={300}
          height={currentMenu === "more" ? "auto" : 0}
        >
          <ul className="sub-menu text-gray-500">
            <li>
              <Link href="/template/more/charts" className="group">
                {/* <div className="flex items-center">
              <IconMenuCharts className="shrink-0 group-hover:!text-primary" />
              <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                {t("charts")}
              </span>
            </div> */}
                {t("charts")}
              </Link>
            </li>
            <li>
              <Link href="/template/more/font-icons" className="group">
                {/* <div className="flex items-center">
              <IconMenuFontIcons className="shrink-0 group-hover:!text-primary" />
              <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                {t("font_icons")}
              </span>
            </div> */}
                {t("font_icons")}
              </Link>
            </li>
            <li>
              <Link href="/template/more/dragndrop" className="group">
                {/* <div className="flex items-center">
              <IconMenuDragAndDrop className="shrink-0 group-hover:!text-primary" />
              <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                {t("drag_and_drop")}
              </span>
            </div> */}
                {t("drag_and_drop")}
              </Link>
            </li>
          </ul>
        </AnimateHeight>
      </li>

      {/* <li className="menu nav-item">
    <Link href="/template/widgets" className="group">
      <div className="flex items-center">
        <IconMenuWidgets className="shrink-0 group-hover:!text-primary" />
        <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
          {t("widgets")}
        </span>
      </div>
    </Link>
  </li> */}

      {/* <li className="menu nav-item">
    <Link href="/template/more/font-icons" className="group">
      <div className="flex items-center">
        <IconMenuFontIcons className="shrink-0 group-hover:!text-primary" />
        <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
          {t("font_icons")}
        </span>
      </div>
    </Link>
  </li> */}

      {/* <li className="menu nav-item">
    <Link href="/template/more/dragndrop" className="group">
      <div className="flex items-center">
        <IconMenuDragAndDrop className="shrink-0 group-hover:!text-primary" />
        <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
          {t("drag_and_drop")}
        </span>
      </div>
    </Link>
  </li> */}

      <h2 className="-mx-4 mb-1 flex items-center px-7 py-3 font-extrabold uppercase">
        <IconMinus className="hidden h-5 w-4 flex-none" />
        <span>{t("tables_and_forms")}</span>
      </h2>

      <li className="menu nav-item">
        <Link href="/template/tables" className="group">
          <div className="flex items-center">
            <IconMenuTables className="shrink-0 group-hover:!text-primary" />
            <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
              {t("tables")}
            </span>
          </div>
        </Link>
      </li>

      <li className="menu nav-item">
        <button
          type="button"
          className={`${
            currentMenu === "datalabel" ? "active" : ""
          } nav-link group w-full`}
          onClick={() => toggleMenu("datalabel")}
        >
          <div className="flex items-center">
            <IconMenuDatatables className="shrink-0 group-hover:!text-primary" />
            <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
              {t("datatables")}
            </span>
          </div>

          <div
            className={
              currentMenu !== "datalabel" ? "-rotate-90 rtl:rotate-90" : ""
            }
          >
            <IconCaretDown />
          </div>
        </button>

        <AnimateHeight
          duration={300}
          height={currentMenu === "datalabel" ? "auto" : 0}
        >
          <ul className="sub-menu text-gray-500">
            <li>
              <Link href="/template/datatables/basic">{t("basic")}</Link>
            </li>
            <li>
              <Link href="/template/datatables/advanced">{t("advanced")}</Link>
            </li>
            <li>
              <Link href="/template/datatables/skin">{t("skin")}</Link>
            </li>
            <li>
              <Link href="/template/datatables/order-sorting">
                {t("order_sorting")}
              </Link>
            </li>
            <li>
              <Link href="/template/datatables/multi-column">
                {t("multi_column")}
              </Link>
            </li>
            <li>
              <Link href="/template/datatables/multiple-tables">
                {t("multiple_tables")}
              </Link>
            </li>
            <li>
              <Link href="/template/datatables/alt-pagination">
                {t("alt_pagination")}
              </Link>
            </li>
            <li>
              <Link href="/template/datatables/checkbox">{t("checkbox")}</Link>
            </li>
            <li>
              <Link href="/template/datatables/range-search">
                {t("range_search")}
              </Link>
            </li>
            <li>
              <Link href="/template/datatables/export">{t("export")}</Link>
            </li>
            <li>
              <Link href="/template/datatables/column-chooser">
                {t("column_chooser")}
              </Link>
            </li>
          </ul>
        </AnimateHeight>
      </li>

      <li className="menu nav-item">
        <button
          type="button"
          className={`${
            currentMenu === "forms" ? "active" : ""
          } nav-link group w-full`}
          onClick={() => toggleMenu("forms")}
        >
          <div className="flex items-center">
            <IconMenuForms className="shrink-0 group-hover:!text-primary" />
            <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
              {t("forms")}
            </span>
          </div>

          <div
            className={
              currentMenu !== "forms" ? "-rotate-90 rtl:rotate-90" : ""
            }
          >
            <IconCaretDown />
          </div>
        </button>

        <AnimateHeight
          duration={300}
          height={currentMenu === "forms" ? "auto" : 0}
        >
          <ul className="sub-menu text-gray-500">
            <li>
              <Link href="/template/forms/basic">{t("basic")}</Link>
            </li>
            <li>
              <Link href="/template/forms/input-group">{t("input_group")}</Link>
            </li>
            <li>
              <Link href="/template/forms/layouts">{t("layouts")}</Link>
            </li>
            <li>
              <Link href="/template/forms/validation">{t("validation")}</Link>
            </li>
            <li>
              <Link href="/template/forms/input-mask">{t("input_mask")}</Link>
            </li>
            <li>
              <Link href="/template/forms/select2">{t("select2")}</Link>
            </li>
            <li>
              <Link href="/template/forms/touchspin">{t("touchspin")}</Link>
            </li>
            <li>
              <Link href="/template/forms/checkbox-radio">
                {t("checkbox_and_radio")}
              </Link>
            </li>
            <li>
              <Link href="/template/forms/switches">{t("switches")}</Link>
            </li>
            <li>
              <Link href="/template/forms/wizards">{t("wizards")}</Link>
            </li>
            <li>
              <Link href="/template/forms/file-upload">{t("file_upload")}</Link>
            </li>
            <li>
              <Link href="/template/forms/quill-editor">
                {t("quill_editor")}
              </Link>
            </li>
            <li>
              <Link href="/template/forms/markdown-editor">
                {t("markdown_editor")}
              </Link>
            </li>
            <li>
              <Link href="/template/forms/date-picker">
                {t("date_and_range_picker")}
              </Link>
            </li>
            <li>
              <Link href="/template/forms/clipboard">{t("clipboard")}</Link>
            </li>
          </ul>
        </AnimateHeight>
      </li>

      <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
        <IconMinus className="hidden h-5 w-4 flex-none" />
        <span>{t("user_and_pages")}</span>
      </h2>

      <li className="menu nav-item">
        <button
          type="button"
          className={`${
            currentMenu === "users" ? "active" : ""
          } nav-link group w-full`}
          onClick={() => toggleMenu("users")}
        >
          <div className="flex items-center">
            <IconMenuUsers className="shrink-0 group-hover:!text-primary" />
            <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
              {t("users")}
            </span>
          </div>

          <div
            className={
              currentMenu !== "users" ? "-rotate-90 rtl:rotate-90" : ""
            }
          >
            <IconCaretDown />
          </div>
        </button>

        <AnimateHeight
          duration={300}
          height={currentMenu === "users" ? "auto" : 0}
        >
          <ul className="sub-menu text-gray-500">
            <li>
              <Link href="/template/users/profile">{t("profile")}</Link>
            </li>
            <li>
              <Link href="/template/users/user-account-settings">
                {t("account_settings")}
              </Link>
            </li>
          </ul>
        </AnimateHeight>
      </li>

      <li className="menu nav-item" data-menu="page">
        <button
          type="button"
          className={`${
            currentMenu === "page" ? "active" : ""
          } nav-link group w-full`}
          onClick={() => toggleMenu("page")}
        >
          <div className="flex items-center">
            <IconMenuPages className="shrink-0 group-hover:!text-primary" />
            <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
              {t("pages")}
            </span>
          </div>

          <div
            className={currentMenu !== "page" ? "-rotate-90 rtl:rotate-90" : ""}
          >
            <IconCaretDown />
          </div>
        </button>

        <AnimateHeight
          duration={300}
          height={currentMenu === "page" ? "auto" : 0}
        >
          <ul className="sub-menu text-gray-500">
            <li>
              <Link href="/template/pages/knowledge-base">
                {t("knowledge_base")}
              </Link>
            </li>
            <li>
              <Link href="/template/pages/contact-us-boxed" target="_blank">
                {t("contact_us_boxed")}
              </Link>
            </li>
            <li>
              <Link href="/template/pages/contact-us-cover" target="_blank">
                {t("contact_us_cover")}
              </Link>
            </li>
            <li>
              <Link href="/template/pages/faq">{t("faq")}</Link>
            </li>
            <li>
              <Link href="/template/pages/coming-soon-boxed" target="_blank">
                {t("coming_soon_boxed")}
              </Link>
            </li>
            <li>
              <Link href="/template/pages/coming-soon-cover" target="_blank">
                {t("coming_soon_cover")}
              </Link>
            </li>
            <li className="menu nav-item">
              <button
                type="button"
                className={`${
                  errorSubMenu ? "open" : ""
                } w-full before:h-[5px] before:w-[5px] before:rounded before:bg-gray-300 hover:bg-gray-100 ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] dark:hover:bg-gray-900`}
                onClick={() => setErrorSubMenu(!errorSubMenu)}
              >
                {t("error")}
                <div
                  className={`${
                    errorSubMenu ? "-rotate-90 rtl:rotate-90" : ""
                  } ltr:ml-auto rtl:mr-auto`}
                >
                  <IconCaretsDown fill={true} className="h-4 w-4" />
                </div>
              </button>
              <AnimateHeight duration={300} height={errorSubMenu ? "auto" : 0}>
                <ul className="sub-menu text-gray-500">
                  <li>
                    <Link href="/template/pages/error404" target="_blank">
                      {t("404")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/template/pages/error500" target="_blank">
                      {t("500")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/template/pages/error503" target="_blank">
                      {t("503")}
                    </Link>
                  </li>
                </ul>
              </AnimateHeight>
            </li>

            <li>
              <Link href="/template/pages/maintenence" target="_blank">
                {t("maintenence")}
              </Link>
            </li>
          </ul>
        </AnimateHeight>
      </li>

      <li className="menu nav-item">
        <button
          type="button"
          className={`${
            currentMenu === "auth" ? "active" : ""
          } nav-link group w-full`}
          onClick={() => toggleMenu("auth")}
        >
          <div className="flex items-center">
            <IconMenuAuthentication className="shrink-0 group-hover:!text-primary" />
            <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
              {t("authentication")}
            </span>
          </div>

          <div
            className={currentMenu !== "auth" ? "-rotate-90 rtl:rotate-90" : ""}
          >
            <IconCaretDown />
          </div>
        </button>

        <AnimateHeight
          duration={300}
          height={currentMenu === "auth" ? "auto" : 0}
        >
          <ul className="sub-menu text-gray-500">
            <li>
              <Link href="/template/auth/boxed-signin" target="_blank">
                {t("login_boxed")}
              </Link>
            </li>
            <li>
              <Link href="/template/auth/boxed-signup" target="_blank">
                {t("register_boxed")}
              </Link>
            </li>
            <li>
              <Link href="/template/auth/boxed-lockscreen" target="_blank">
                {t("unlock_boxed")}
              </Link>
            </li>
            <li>
              <Link href="/template/auth/boxed-password-reset" target="_blank">
                {t("recover_id_boxed")}
              </Link>
            </li>
            <li>
              <Link href="/template/auth/cover-login" target="_blank">
                {t("login_cover")}
              </Link>
            </li>
            <li>
              <Link href="/template/auth/cover-register" target="_blank">
                {t("register_cover")}
              </Link>
            </li>
            <li>
              <Link href="/template/auth/cover-lockscreen" target="_blank">
                {t("unlock_cover")}
              </Link>
            </li>
            <li>
              <Link href="/template/auth/cover-password-reset" target="_blank">
                {t("recover_id_cover")}
              </Link>
            </li>
          </ul>
        </AnimateHeight>
      </li>

      {/* <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
    <IconMinus className="hidden h-5 w-4 flex-none" />
    <span>{t("supports")}</span>
  </h2>

  <li className="menu nav-item">
    <Link
      href="https://anthill.sbthemes.com"
      target="_blank"
      className="nav-link group"
    >
      <div className="flex items-center">
        <IconMenuDocumentation className="shrink-0 group-hover:!text-primary" />
        <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
          {t("documentation")}
        </span>
      </div>
    </Link>
  </li> */}
    </ul>
  );

  /**
   * 生成分类和下级
   */
  const generateSidebarMenuTree_Category = (menu: Menu) => {
    if (menu.type == "C") return null;
    //必需字段判空
    if (!menu.dialect) {
      logger.debug("M type menu dialect is blank - ", menu);
      return null;
    }
    return (
      <div key={menu.dialect}>
        <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
          <IconMinus className="hidden h-5 w-4 flex-none" />
          <span>{t(menu.dialect)}</span>
        </h2>
        {menu.children && menu.children?.length > 0
          ? menu.children.map((c) => generateSidebarMenuTree_All(c))
          : null}
      </div>
    );
  };

  /**
   * 生成菜单和下级
   */
  const generateSidebarMenuTree_Menu = (menu: Menu) => {
    if (menu.type == "M") return null;
    //必需字段判空
    if (!menu.menuKey) {
      logger.debug("C type menu menuKey is blank - ", menu);
      return null;
    }
    return (
      <div className="nav-item" key={menu.menuKey}>
        {menu.children && menu.children.length > 0 ? (
          // 有子级 是button和下拉
          <>
            <button
              type="button"
              className={`group ${
                currentMenuList.includes(menu.menuKey) ? "active" : ""
              } nav-link w-full`}
              onClick={() => toggleMenuList(menu.menuKey!!)}
            >
              <div className="flex items-center">
                {menu.icon && (
                  <IconMenu
                    name={menu.icon}
                    className="shrink-0 group-hover:!text-primary"
                  />
                )}
                <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                  {t(menu.menuKey)}
                </span>
              </div>

              <div
                className={`dark:text-white-4 group-focus:text-white-6 ${
                  !currentMenuList.includes(menu.menuKey)
                    ? "-rotate-90 rtl:rotate-90"
                    : ""
                }`}
              >
                <IconCaretDown />
              </div>
            </button>

            <AnimateHeight
              duration={300}
              height={currentMenuList.includes(menu.menuKey) ? "auto" : 0}
            >
              <ul className="sub-menu text-gray-500">
                {menu.children.map((c) => generateSidebarMenuTree_All(c))}
              </ul>
            </AnimateHeight>
          </>
        ) : (
          // 无子级 直接是链接
          <Link
            href={menu.path!!}
            className={`group ${
              currentMenuList.includes(menu.menuKey) ? "active" : ""
            }`}
          >
            <div className="flex items-center">
              <IconMenu
                name={menu.icon}
                className="shrink-0 group-hover:!text-primary"
              />
              <span className=" ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5">
                {t(menu.menuKey)}
              </span>
            </div>
          </Link>
        )}
      </div>
    );
  };
  /**
   * 根据 Menu 生成所有的本级菜单和子级菜单
   */
  const generateSidebarMenuTree_All = (menu: Menu) => {
    if (menu.type == "M") return generateSidebarMenuTree_Category(menu);
    if (menu.type == "C") return generateSidebarMenuTree_Menu(menu);
    return null;
  };
  const generateSidebarMenuTree = () => {
    return (
      <div className='relative space-y-0.5 p-2 py-0 pr-3 pb-24 font-semibold"'>
        {TemplateMenuTree.map((menu) => generateSidebarMenuTree_All(menu))}
      </div>
    );
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all  duration-300 ${
          isDarkMode ? "text-white-3" : "text-black-7"
        }`}
      >
        <div className="h-full bg-white dark:bg-black-8">
          <div className="flex items-center justify-between px-4 py-3">
            <Link
              href="/template/"
              className="main-logo flex shrink-0 items-center"
            >
              <Logo className="w-5 h-5 md:w-6 md:h-6  text-primary" />
              <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 -7 dark:text-white-7 lg:inline">
                Anthill
              </span>
            </Link>

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-7 dark:hover:bg-dark-light/10"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <div className="relative h-[calc(100vh-56px)] overflow-x-hidden overflow-y-scroll">
            {generateSidebarMenuTree()}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
