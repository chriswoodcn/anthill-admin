"use client";

import Link from "next/link";
import AnimateHeight from "react-animate-height";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { toggleSidebar } from "@/store/slices/admin";
import { isBrowser } from "@/lib";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import logger from "@/lib/logger";
import { Menu } from '@/lib/menu';

import Logo from "@/components/compose/Logo";
import IconCaretsDown from "@/components/icon/icon-carets-down";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconMinus from "@/components/icon/icon-minus";
import IconMenu from "@/components/icon/admin/icon-menu";

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
  const userRouterTree = useAppSelector(
    (state: RootState) => state.adminRouter.userRouterTree
  );
  const userRouterList = useAppSelector(
    (state: RootState) => state.adminRouter.userRouterList
  );
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
    const find = userRouterList.find((item) => item.menuKey == parentKey);
    return find && find.parentKey ? find.parentKey : undefined;
  };
  /**
   * 查找出所有上级菜单的MenuKey
   */
  const findMenuAllParentKey = (menuKey: string) => {
    if (!menuKey) return [];
    const keys = [];
    const selectedMenu = userRouterList.find(
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
      const templateMenu = userRouterList.find(
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

  /**
   * 生成分类和下级
   */
  const generateSidebarMenuTree_Category = (menu: Menu) => {
    if (menu.menuType == "C") return null;
    //必需字段判空
    if (!menu.menuKey) {
      logger.debug("M type menu menuKey is blank - ", menu);
      return null;
    }
    return (
      <div key={menu.menuKey}>
        <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
          <IconMinus className="hidden h-5 w-4 flex-none" />
          <span>{t(menu.menuKey)}</span>
        </h2>
        {menu.children && menu.children?.length > 0
          ? menu.children.map((c: Menu) => generateSidebarMenuTree_All(c))
          : null}
      </div>
    );
  };

  /**
   * 生成菜单和下级
   */
  const generateSidebarMenuTree_Menu = (menu: Menu) => {
    if (menu.menuType == "M") return null;
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
                {menu.children.map((c: Menu) => generateSidebarMenuTree_All(c))}
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
    if (menu.menuType == "M") return generateSidebarMenuTree_Category(menu);
    if (menu.menuType == "C") return generateSidebarMenuTree_Menu(menu);
    return null;
  };
  const generateSidebarMenuTree = () => {
    logger.debug("generateSidebarMenuTree ", userRouterTree);
    return (
      <div className='relative space-y-0.5 p-2 py-0 pr-3 pb-24 font-semibold"'>
        {userRouterTree.map((menu) => generateSidebarMenuTree_All(menu))}
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
