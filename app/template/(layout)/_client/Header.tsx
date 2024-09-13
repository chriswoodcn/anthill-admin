"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import AnimateHeight from "react-animate-height";

import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { toggleRTL, toggleSidebar, toggleTheme } from "@/store/slices/admin";
import { TemplateMenuTree, TemplateMenuList } from "./menu";
import logger from "@/lib/logger";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import { isBrowser } from "@/lib";
import { Menu } from "@/lib/menu";

import Image from "@/components/core/Image";
import IconMenu from "@/components/icon/template/icon-menu";
import IconMenuIcon from "@/components/icon/icon-menu";
import IconCalendar from "@/components/icon/icon-calendar";
import IconEdit from "@/components/icon/icon-edit";
import IconChatNotification from "@/components/icon/icon-chat-notification";
import IconSearch from "@/components/icon/icon-search";
import IconXCircle from "@/components/icon/icon-x-circle";
import IconSun from "@/components/icon/icon-sun";
import IconMoon from "@/components/icon/icon-moon";
import IconLaptop from "@/components/icon/icon-laptop";
import IconMailDot from "@/components/icon/icon-mail-dot";
import IconArrowLeft from "@/components/icon/icon-arrow-left";
import IconInfoCircle from "@/components/icon/icon-info-circle";
import IconBellBing from "@/components/icon/icon-bell-bing";
import IconUser from "@/components/icon/icon-user";
import IconMail from "@/components/icon/icon-mail";
import IconLockDots from "@/components/icon/icon-lock-dots";
import IconLogout from "@/components/icon/icon-logout";
import IconMenuDashboard from "@/components/icon/menu/icon-menu-dashboard";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconMenuApps from "@/components/icon/menu/icon-menu-apps";
import IconMenuComponents from "@/components/icon/menu/icon-menu-components";
import IconMenuElements from "@/components/icon/menu/icon-menu-elements";
import IconMenuDatatables from "@/components/icon/menu/icon-menu-datatables";
import IconMenuForms from "@/components/icon/menu/icon-menu-forms";
import IconMenuPages from "@/components/icon/menu/icon-menu-pages";
import IconMenuMore from "@/components/icon/menu/icon-menu-more";
import Dropdown from "@/components/core/Dropdown";
import DropdownPortal from "@/components/core/DropdownPortal";
import LanguageDropdown from "@/components/compose/LanguageDropdown";
import Logo from "@/components/compose/Logo";

const Header = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const isRtl =
    useAppSelector((state: RootState) => state.adminSetting.rtlClass) === "rtl";

  const adminSetting = useAppSelector((state: RootState) => state.adminSetting);

  function createMarkup(messages: any) {
    return { __html: messages };
  }
  const [messages, setMessages] = useState([
    {
      id: 1,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
      title: "Congratulations!",
      message: "Your OS has been updated.",
      time: "1hr",
    },
    {
      id: 2,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
      title: "Did you know?",
      message: "You can switch between artboards.",
      time: "2hr",
    },
    {
      id: 3,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
      title: "Something went wrong!",
      message: "Send Reposrt",
      time: "2days",
    },
    {
      id: 4,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
      title: "Warning",
      message: "Your password strength is low.",
      time: "5days",
    },
  ]);

  const removeMessage = (value: number) => {
    setMessages(messages.filter((user) => user.id !== value));
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      profile: "profile-1.jpeg",
      message:
        '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
      time: "45 min ago",
    },
    {
      id: 2,
      profile: "profile-34.jpeg",
      message:
        '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
      time: "9h Ago",
    },
    {
      id: 3,
      profile: "profile-16.jpeg",
      message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
      time: "9h Ago",
    },
  ]);

  const removeNotification = (value: number) => {
    setNotifications(notifications.filter((user) => user.id !== value));
  };

  const [search, setSearch] = useState(false);

  const OriginHorizontalMenuTree = () => (
    <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white px-6 py-1.5 font-semibold text-black rtl:space-x-reverse dark:border-[#191e3a] dark:bg-black-8 dark:text-white-6 lg:space-x-1.5 xl:space-x-8">
      <li className="menu-item">
        <DropdownPortal
          button={
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuDashboard className="shrink-0" />
                <span className="px-1">{t("dashboard")}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
          }
        >
          <ul className="horizontal-menu sub-menu">
            <li>
              <Link href="/template/">{t("sales")}</Link>
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
        </DropdownPortal>
      </li>
      <li className="menu-item">
        <DropdownPortal
          button={
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuApps className="shrink-0" />
                <span className="px-1">{t("apps")}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
          }
        >
          <ul className="horizontal-menu sub-menu">
            <li>
              <Link href="/template/apps/chat">{t("chat")}</Link>
            </li>
            <li>
              <Link href="/template/apps/mailbox">{t("mailbox")}</Link>
            </li>
            <li>
              <Link href="/template/apps/todolist">{t("todo_list")}</Link>
            </li>
            <li>
              <Link href="/template/apps/notes">{t("notes")}</Link>
            </li>
            <li>
              <Link href="/template/apps/scrumboard">{t("scrumboard")}</Link>
            </li>
            <li>
              <Link href="/template/apps/contacts">{t("contacts")}</Link>
            </li>
            <li className="relative">
              <DropdownPortal
                placement="right-start"
                button={
                  <button type="button">
                    {t("invoice")}
                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                      <IconCaretDown />
                    </div>
                  </button>
                }
              >
                <ul className="horizontal-menu sub-menu">
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
              </DropdownPortal>
            </li>
            <li>
              <Link href="/template/apps/calendar">{t("calendar")}</Link>
            </li>
          </ul>
        </DropdownPortal>
      </li>
      <li className="menu-item">
        <DropdownPortal
          button={
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuComponents className="shrink-0" />
                <span className="px-1">{t("components")}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
          }
        >
          <ul className="horizontal-menu sub-menu">
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
        </DropdownPortal>
      </li>
      <li className="menu-item">
        <DropdownPortal
          button={
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuElements className="shrink-0" />
                <span className="px-1">{t("elements")}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
          }
        >
          <ul className="horizontal-menu sub-menu">
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
        </DropdownPortal>
      </li>
      <li className="menu-item">
        <DropdownPortal
          button={
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuDatatables className="shrink-0" />
                <span className="px-1">{t("tables")}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
          }
        >
          <ul className="horizontal-menu sub-menu">
            <li>
              <Link href="/template/tables">{t("tables")}</Link>
            </li>
            <li className="relative">
              <DropdownPortal
                placement="right-start"
                button={
                  <button type="button">
                    {t("datatables")}
                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                      <IconCaretDown />
                    </div>
                  </button>
                }
              >
                <ul className="horizontal-menu sub-menu">
                  <li>
                    <Link href="/template/datatables/basic">{t("basic")}</Link>
                  </li>
                  <li>
                    <Link href="/template/datatables/advanced">
                      {t("advanced")}
                    </Link>
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
                    <Link href="/template/datatables/checkbox">
                      {t("checkbox")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/template/datatables/range-search">
                      {t("range_search")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/template/datatables/export">
                      {t("export")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/template/datatables/column-chooser">
                      {t("column_chooser")}
                    </Link>
                  </li>
                </ul>
              </DropdownPortal>
            </li>
          </ul>
        </DropdownPortal>
      </li>
      <li className="menu-item">
        <DropdownPortal
          button={
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuForms className="shrink-0" />
                <span className="px-1">{t("forms")}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
          }
        >
          <ul className="horizontal-menu sub-menu">
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
        </DropdownPortal>
      </li>
      <li className="menu-item">
        <DropdownPortal
          button={
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuPages className="shrink-0" />
                <span className="px-1">{t("pages")}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
          }
        >
          <ul className="horizontal-menu sub-menu">
            <li className="relative">
              <DropdownPortal
                placement="right-start"
                button={
                  <button type="button">
                    {t("users")}
                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                      <IconCaretDown />
                    </div>
                  </button>
                }
              >
                <ul className="horizontal-menu sub-menu">
                  <li>
                    <Link href="/template/users/profile">{t("profile")}</Link>
                  </li>
                  <li>
                    <Link href="/template/users/user-account-settings">
                      {t("account_settings")}
                    </Link>
                  </li>
                </ul>
              </DropdownPortal>
            </li>
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
            <li>
              <Link href="/template/pages/maintenence" target="_blank">
                {t("maintenence")}
              </Link>
            </li>
            <li className="relative">
              <DropdownPortal
                placement="right-start"
                button={
                  <button type="button">
                    {t("error")}
                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                      <IconCaretDown />
                    </div>
                  </button>
                }
              >
                <ul className="horizontal-menu sub-menu">
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
              </DropdownPortal>
            </li>
            <li className="relative">
              <DropdownPortal
                placement="right-start"
                button={
                  <button type="button">
                    {t("login")}
                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                      <IconCaretDown />
                    </div>
                  </button>
                }
              >
                <ul className="horizontal-menu sub-menu">
                  <li>
                    <Link href="/template/auth/cover-login" target="_blank">
                      {t("login_cover")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/template/auth/boxed-signin" target="_blank">
                      {t("login_boxed")}
                    </Link>
                  </li>
                </ul>
              </DropdownPortal>
            </li>
            <li className="relative">
              <DropdownPortal
                placement="right-start"
                button={
                  <button type="button">
                    {t("register")}
                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                      <IconCaretDown />
                    </div>
                  </button>
                }
              >
                <ul className="horizontal-menu sub-menu">
                  <li>
                    <Link href="/template/auth/cover-register" target="_blank">
                      {t("register_cover")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/template/auth/boxed-signup" target="_blank">
                      {t("register_boxed")}
                    </Link>
                  </li>
                </ul>
              </DropdownPortal>
            </li>
            <li className="relative">
              <DropdownPortal
                placement="right-start"
                button={
                  <button type="button">
                    {t("password_recovery")}
                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                      <IconCaretDown />
                    </div>
                  </button>
                }
              >
                <ul className="horizontal-menu sub-menu">
                  <li>
                    <Link
                      href="/template/auth/cover-password-reset"
                      target="_blank"
                    >
                      {t("recover_id_cover")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/template/auth/boxed-password-reset"
                      target="_blank"
                    >
                      {t("recover_id_boxed")}
                    </Link>
                  </li>
                </ul>
              </DropdownPortal>
            </li>
            <li className="relative">
              <DropdownPortal
                placement="right-start"
                button={
                  <button type="button">
                    {t("lockscreen")}
                    <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                      <IconCaretDown />
                    </div>
                  </button>
                }
              >
                <ul className="horizontal-menu sub-menu">
                  <li>
                    <Link
                      href="/template/auth/cover-lockscreen"
                      target="_blank"
                    >
                      {t("unlock_cover")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/template/auth/boxed-lockscreen"
                      target="_blank"
                    >
                      {t("unlock_boxed")}
                    </Link>
                  </li>
                </ul>
              </DropdownPortal>
            </li>
          </ul>
        </DropdownPortal>
      </li>
      <li className="menu-item">
        <DropdownPortal
          button={
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuMore className="shrink-0" />
                <span className="px-1">{t("more")}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
          }
        >
          <ul className="horizontal-menu sub-menu">
            <li>
              <Link href="/template/more/dragndrop">{t("drag_and_drop")}</Link>
            </li>
            <li>
              <Link href="/template/more/charts">{t("charts")}</Link>
            </li>
            <li>
              <Link href="/template/more/font-icons">{t("font_icons")}</Link>
            </li>
          </ul>
        </DropdownPortal>
      </li>
    </ul>
  );

  const [currentMenuList, setCurrentMenuList] = useState<string[]>([]);
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
      logger.debug("初始化菜单栏");
      //标记 初始化菜单栏
      const templateMenu = TemplateMenuList.find(
        (item) => item.path == pathname
      );
      if (templateMenu && templateMenu.menuKey) {
        const parentKeys = findMenuAllParentKey(templateMenu.menuKey);
        setCurrentMenuList([...parentKeys, templateMenu.menuKey]);
      }
    }
  }, [pathname]);

  /**
   * 生成分类和下级
   */
  const generateHorizontalMenuTree_Category = (menu: Menu) => {
    if (menu.type == "C") return null;
    //必需字段判空
    if (!menu.menuKey) {
      logger.debug("M type menu menuKey is blank - ", menu);
      return null;
    }
    return (
      <div key={"horizontal-" + menu.menuKey}>
        <DropdownPortal
          placement="bottom-start"
          button={
            <div className="nav-link cursor-pointer">
              <div className="flex items-center w-full group min-w-20">
                {menu.icon && (
                  <IconMenu
                    name={menu.icon!!}
                    className="shrink-0 group-hover:!text-primary"
                  />
                )}
                <span className="px-1">{t(menu.menuKey)}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </div>
          }
        >
          <ul className="bg-white dark:bg-black-7 shadow-lg rounded-lg min-w-20">
            {menu.children && menu.children?.length > 0
              ? menu.children.map((c) => generateHorizontalMenuTree_All(c))
              : null}
          </ul>
        </DropdownPortal>
      </div>
    );
  };
  /**
   * 生成菜单和下级
   */
  const generateHorizontalMenuTree_Menu = (menu: Menu) => {
    if (menu.type == "M") return null;
    //必需字段判空
    if (!menu.menuKey) {
      logger.debug("C type menu menuKey is blank - ", menu);
      return null;
    }
    return (
      <li
        className={`px-4 py-2 min-w-32 nav-link ${
          menu.children && menu.children.length > 0 ? "relative" : ""
        } ${currentMenuList.includes(menu.menuKey) ? "active" : ""}`}
        key={"horizontal-" + menu.menuKey}
      >
        {menu.children && menu.children.length > 0 ? (
          // 有子级 是button和下拉
          <>
            <div
              className={`cursor-pointer group flex items-center nav-link ${
                currentMenuList.includes(menu.menuKey) ? "active" : ""
              }`}
              onClick={() => toggleMenuList(menu.menuKey!!)}
            >
              <div className="flex-1 flex items-center">
                {menu.icon && (
                  <IconMenu
                    name={menu.icon}
                    className="shrink-0 group-hover:!text-primary"
                  />
                )}
                <span className="ltr:pl-3 rtl:pr-3 dark:group-hover:text-white-5 group-hover:!text-primary">
                  {t(menu.menuKey)}
                </span>
              </div>

              <div
                className={`dark:text-white-4 group-focus:text-white-6 group-hover:!text-primary ${
                  !currentMenuList.includes(menu.menuKey)
                    ? "-rotate-90 rtl:rotate-90"
                    : ""
                }`}
              >
                <IconCaretDown />
              </div>
            </div>

            <div className="max-h-48 overflow-y-scroll">
              <AnimateHeight
                duration={300}
                height={currentMenuList.includes(menu.menuKey) ? "auto" : 0}
              >
                <ul
                  className="sub-menu text-gray-500 py-2"
                  key={"horizontal-" + menu.menuKey}
                >
                  {menu.children.map((c) => generateHorizontalMenuTree_Menu(c))}
                </ul>
              </AnimateHeight>
            </div>
          </>
        ) : (
          menu.path && (
            <Link className="w-full" href={menu.path}>
              <div className="flex items-center group">
                {menu.icon && (
                  <IconMenu
                    name={menu.icon}
                    className="shrink-0 group-hover:!text-primary"
                  />
                )}
                <span className="flex-1 ltr:pl-3 rtl:pr-3  dark:group-hover:text-white-5 group-hover:!text-primary text-sm">
                  {t(menu.menuKey)}
                </span>
              </div>
            </Link>
          )
        )}
      </li>
    );
  };
  const generateHorizontalMenuTree_All = (menu: Menu) => {
    if (menu.type == "M") return generateHorizontalMenuTree_Category(menu);
    if (menu.type == "C") return generateHorizontalMenuTree_Menu(menu);
    return null;
  };
  const generateHorizontalMenuTree = () => {
    return (
      <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white px-6 py-1.5 font-semibold text-black rtl:space-x-reverse dark:border-[#191e3a] dark:bg-black-8 dark:text-white-6 lg:space-x-1.5 xl:space-x-8">
        {TemplateMenuTree.map((menu) => generateHorizontalMenuTree_All(menu))}
      </ul>
    );
  };

  return (
    <header
      className={`z-40 ${
        adminSetting.isDarkMode && adminSetting.menu === "horizontal"
          ? "dark"
          : ""
      }`}
    >
      <div className="shadow-md">
        {/* #region origin header */}
        <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black-8">
          <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
            <Link
              href="/template/"
              className="main-logo flex shrink-0 items-center"
            >
              <Logo className="w-5 h-5 md:w-6 md:h-6  text-primary" />
              <span className="hidden align-middle text-2xl font-semibold  transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-6 md:inline">
                Anthill
              </span>
            </Link>
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconMenuIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="hidden ltr:mr-2 rtl:ml-2 sm:block">
            <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
              <li>
                <Link
                  href="/template/apps/calendar"
                  className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                >
                  <IconCalendar />
                </Link>
              </li>
              <li>
                <Link
                  href="/template/apps/todolist"
                  className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                >
                  <IconEdit />
                </Link>
              </li>
              <li>
                <Link
                  href="/template/apps/chat"
                  className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                >
                  <IconChatNotification />
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
              <form
                className={`${
                  search && "!block"
                } absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0`}
                onSubmit={() => setSearch(false)}
              >
                <div className="relative">
                  <input
                    type="text"
                    className="peer form-input bg-gray-100 placeholder:tracking-widest ltr:pl-9 ltr:pr-9 rtl:pl-9 rtl:pr-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4"
                    placeholder="Search..."
                  />
                  <button
                    type="button"
                    className="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto"
                  >
                    <IconSearch className="mx-auto" />
                  </button>
                  <button
                    type="button"
                    className="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 ltr:right-2 rtl:left-2 sm:hidden"
                    onClick={() => setSearch(false)}
                  >
                    <IconXCircle />
                  </button>
                </div>
              </form>
              <button
                type="button"
                onClick={() => setSearch(!search)}
                className="search_btn rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 sm:hidden"
              >
                <IconSearch className="mx-auto h-4.5 w-4.5 dark:text-[#d0d2d6]" />
              </button>
            </div>
            <div>
              {adminSetting.theme === "light" ? (
                <button
                  className={`${
                    adminSetting.theme === "light" &&
                    "flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => dispatch(toggleTheme("dark"))}
                >
                  <IconSun />
                </button>
              ) : (
                ""
              )}
              {adminSetting.theme === "dark" && (
                <button
                  className={`${
                    adminSetting.theme === "dark" &&
                    "flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => dispatch(toggleTheme("auto"))}
                >
                  <IconMoon />
                </button>
              )}
              {adminSetting.theme === "auto" && (
                <button
                  className={`${
                    adminSetting.theme === "auto" &&
                    "flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => dispatch(toggleTheme("light"))}
                >
                  <IconLaptop />
                </button>
              )}
            </div>
            <LanguageDropdown className="shrink-0" shape="rounded" />
            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={<IconMailDot />}
              >
                <ul className="w-[300px] !p-0 text-xs text-black-7 dark:text-white-6 sm:w-[375px]">
                  <li className="mb-5" onClick={(e) => e.stopPropagation()}>
                    <div className="relative !h-[68px] w-full overflow-hidden rounded-t-md text-white hover:!bg-transparent">
                      <div className="bg-absolute inset-0 h-full w-full bg-bg_message_box bg-cover bg-center bg-no-repeat"></div>
                      <h4 className="relative z-10 text-lg font-semibold">
                        Messages
                      </h4>
                    </div>
                  </li>
                  {messages.length > 0 ? (
                    <>
                      <li onClick={(e) => e.stopPropagation()}>
                        {messages.map((message) => {
                          return (
                            <div
                              key={message.id}
                              className="flex items-center px-5 py-3"
                            >
                              <div
                                dangerouslySetInnerHTML={createMarkup(
                                  message.image
                                )}
                              ></div>
                              <span className="px-3 dark:text-gray-500">
                                <div className="text-sm font-semibold dark:text-white-7/90">
                                  {message.title}
                                </div>
                                <div>{message.message}</div>
                              </span>
                              <span className="whitespace-pre rounded bg-white-dark/20 px-1 font-semibold text-black-7/60 ltr:ml-auto ltr:mr-2 rtl:ml-2 rtl:mr-auto dark:text-white-6">
                                {message.time}
                              </span>
                              <button
                                type="button"
                                className="text-neutral-300 hover:text-danger"
                                onClick={() => removeMessage(message.id)}
                              >
                                <IconXCircle />
                              </button>
                            </div>
                          );
                        })}
                      </li>
                      <li className="mt-5 border-t text-center dark:border-white/10">
                        <button
                          type="button"
                          className="group !h-[48px] justify-center !py-4 px-5 font-semibold text-primary dark:text-gray-400"
                        >
                          <span className="group-hover:underline ltr:mr-1 rtl:ml-1">
                            VIEW ALL ACTIVITIES
                          </span>
                          <IconArrowLeft className="transition duration-300 group-hover:translate-x-1 ltr:ml-1 rtl:mr-1" />
                        </button>
                      </li>
                    </>
                  ) : (
                    <li className="mb-5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent"
                      >
                        <div className="mx-auto mb-4 rounded-full text-white ring-4 ring-primary/30">
                          <IconInfoCircle fill={true} className="h-10 w-10" />
                        </div>
                        No data available.
                      </button>
                    </li>
                  )}
                </ul>
              </Dropdown>
            </div>
            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                  <span>
                    <IconBellBing />
                    <span className="absolute top-0 flex h-3 w-3 ltr:right-0 rtl:left-0">
                      <span className="absolute -top-[3px] inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-75 ltr:-left-[3px] rtl:-right-[3px]"></span>
                      <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-success"></span>
                    </span>
                  </span>
                }
              >
                <ul className="w-[300px] divide-y !py-0 text-black-7 dark:divide-white/10 dark:text-white-6 sm:w-[350px] bg-white shadow-lg rounded-lg">
                  <li onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between px-4 py-2 font-semibold">
                      <h4 className="text-lg">Notification</h4>
                      {notifications.length ? (
                        <span className="badge bg-primary/80">
                          {notifications.length}New
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                  {notifications.length > 0 ? (
                    <>
                      {notifications.map((notification) => {
                        return (
                          <li
                            key={notification.id}
                            className="dark:text-white-7/90"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="group flex items-center px-4 py-2">
                              <div className="grid place-content-center rounded">
                                <div className="relative h-12 w-12">
                                  <Image
                                    className="h-12 w-12 rounded-full object-cover"
                                    alt="profile"
                                    src={`/assets/images/profile/${notification.profile}`}
                                  />
                                  <span className="absolute bottom-0 right-[6px] block h-2 w-2 rounded-full bg-success"></span>
                                </div>
                              </div>
                              <div className="flex flex-auto ltr:pl-3 rtl:pr-3">
                                <div className="ltr:pr-3 rtl:pl-3">
                                  <h6
                                    dangerouslySetInnerHTML={{
                                      __html: notification.message,
                                    }}
                                  ></h6>
                                  <span className="block text-xs font-normal dark:text-gray-500">
                                    {notification.time}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  className="text-neutral-300 opacity-0 hover:text-danger group-hover:opacity-100 ltr:ml-auto rtl:mr-auto"
                                  onClick={() =>
                                    removeNotification(notification.id)
                                  }
                                >
                                  <IconXCircle />
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                      <li>
                        <div className="p-4">
                          <button className="btn btn-primary btn-small block w-full">
                            Read All Notifications
                          </button>
                        </div>
                      </li>
                    </>
                  ) : (
                    <li onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent"
                      >
                        <div className="mx-auto mb-4 rounded-full ring-4 ring-primary/30">
                          <IconInfoCircle
                            fill={true}
                            className="h-10 w-10 text-primary"
                          />
                        </div>
                        No data available.
                      </button>
                    </li>
                  )}
                </ul>
              </Dropdown>
            </div>
            <div className="dropdown flex shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                btnClassName="relative group block"
                button={
                  <Image
                    className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    src="/assets/images/profile/profile-1.jpeg"
                    alt="userProfile"
                  />
                }
              >
                <ul className="w-[230px] !py-0 font-semibold text-black-7 dark:text-white-6 dark:text-white-7/90 bg-white shadow-lg rounded-lg">
                  <li>
                    <div className="flex items-center">
                      <Image
                        autosize="true"
                        className="h-10 w-10 rounded-md object-cover"
                        src="/assets/images/profile/profile-1.jpeg"
                        alt="userProfile"
                      />
                      <div className="truncate ltr:pl-4 rtl:pr-4">
                        <h4 className="text-base">
                          John Doe
                          <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">
                            Pro
                          </span>
                        </h4>
                        <button
                          type="button"
                          className="hover:text-primary dark:hover:text-white"
                        >
                          johndoe@gmail.com
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link
                      href="/users/profile"
                      className="hover:text-primary dark:hover:text-white flex justify-start items-center"
                    >
                      <IconUser className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/apps/mailbox"
                      className="hover:text-primary dark:hover:text-white flex justify-start items-center"
                    >
                      <IconMail className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                      Inbox
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/boxed-lockscreen"
                      className="hover:text-primary dark:hover:text-white flex justify-start items-center"
                    >
                      <IconLockDots className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                      Lock Screen
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <Link
                      href="/auth/boxed-signin"
                      className="!py-3 text-danger flex justify-start items-center"
                    >
                      <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
        {/* #endregion*/}

        {/* #region horizontal menu */}
        {generateHorizontalMenuTree()}
        {/* #endregion*/}
      </div>
    </header>
  );
};

export default Header;
