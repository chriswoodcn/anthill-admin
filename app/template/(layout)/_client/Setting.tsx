"use client";
import { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import {
  toggleAnimation,
  toggleLayout,
  toggleMenu,
  toggleNavbar,
  toggleRTL,
  toggleTheme,
  resetToggleSidebar,
} from "@/store/slices/admin";
import PerfectScrollbar from "react-perfect-scrollbar";
import IconSettings from "@/components/icon/icon-settings";
import IconX from "@/components/icon/icon-x";
import IconSun from "@/components/icon/icon-sun";
import IconMoon from "@/components/icon/icon-moon";
import IconLaptop from "@/components/icon/icon-laptop";

const Setting = () => {
  const adminSetting = useAppSelector((state: RootState) => state.adminSetting);
  const dispatch = useAppDispatch();

  const [showCustomizer, setShowCustomizer] = useState(false);

  return (
    <div>
      <div
        className={`${
          (showCustomizer && "!block") || ""
        } fixed inset-0 z-[51] hidden bg-[black]/60 px-4 transition-[display]`}
        onClick={() => setShowCustomizer(false)}
      ></div>

      <nav
        className={`${
          (showCustomizer && "ltr:!right-0 rtl:!left-0") || ""
        } fixed bottom-0 top-0 z-[51] w-full max-w-[375px] bg-white p-4 pr-1 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 ltr:-right-[375px] rtl:-left-[375px] dark:bg-black-8`}
      >
        <button
          type="button"
          className="absolute bottom-0 top-0 my-auto flex h-10 w-12 cursor-pointer items-center justify-center bg-primary text-white ltr:-left-12 ltr:rounded-bl-full ltr:rounded-tl-full rtl:-right-12 rtl:rounded-br-full rtl:rounded-tr-full"
          onClick={() => setShowCustomizer(!showCustomizer)}
        >
          <IconSettings className="h-6 w-6 animate-[spin_3s_linear_infinite]" />
        </button>

        <PerfectScrollbar className="pr-4">
          <div className="relative pb-5 text-center">
            <button
              type="button"
              className="absolute top-0 opacity-30 hover:opacity-100 ltr:right-0 rtl:left-0 dark:text-white"
              onClick={() => setShowCustomizer(false)}
            >
              <IconX className="h-5 w-5" />
            </button>

            <h4 className="mb-1 dark:text-white">TEMPLATE CUSTOMIZER</h4>
            <p className="text-white-dark">
              Set preferences that will be cookied for your live preview
              demonstration.
            </p>
          </div>

          <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-black-7">
            <h5 className="mb-1 text-base leading-none dark:text-white">
              Color Scheme
            </h5>
            <p className="text-xs text-white-dark">
              Overall light or dark presentation.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                type="button"
                className={`${
                  adminSetting.theme === "light"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn`}
                onClick={() => dispatch(toggleTheme("light"))}
              >
                <IconSun className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                Light
              </button>

              <button
                type="button"
                className={`${
                  adminSetting.theme === "dark"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn`}
                onClick={() => dispatch(toggleTheme("dark"))}
              >
                <IconMoon className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                Dark
              </button>

              <button
                type="button"
                className={`${
                  adminSetting.theme === "system"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn`}
                onClick={() => dispatch(toggleTheme("system"))}
              >
                <IconLaptop className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                System
              </button>
            </div>
          </div>

          <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-black-7">
            <h5 className="mb-1 text-base leading-none dark:text-white">
              Navigation Position
            </h5>
            <p className="text-xs text-white-dark">
              Select the primary navigation paradigm for your app.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button
                type="button"
                className={`${
                  adminSetting.menu === "horizontal"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn`}
                onClick={() => {
                  dispatch(toggleMenu("horizontal"));
                  dispatch(resetToggleSidebar());
                }}
              >
                Horizontal
              </button>

              <button
                type="button"
                className={`${
                  adminSetting.menu === "vertical"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn`}
                onClick={() => {
                  dispatch(toggleMenu("vertical"));
                  dispatch(resetToggleSidebar());
                }}
              >
                Vertical
              </button>

              <button
                type="button"
                className={`${
                  adminSetting.menu === "collapsible-vertical"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn`}
                onClick={() => {
                  dispatch(toggleMenu("collapsible-vertical"));
                  dispatch(resetToggleSidebar());
                }}
              >
                Collapsible
              </button>
            </div>
            {/* <div className="mt-5 text-primary">
              <label className="mb-0 inline-flex">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={adminSetting.semidark}
                  onChange={(e) => dispatch(toggleSemidark(e.target.checked))}
                />
                <span>Semi Dark (Sidebar & Header)</span>
              </label>
            </div> */}
          </div>

          <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-black-7">
            <h5 className="mb-1 text-base leading-none dark:text-white">
              Layout Style
            </h5>
            <p className="text-xs text-white-dark">
              Select the primary layout style for your app.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className={`${
                  adminSetting.layout === "boxed-layout"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn flex-auto`}
                onClick={() => dispatch(toggleLayout("boxed-layout"))}
              >
                Box
              </button>

              <button
                type="button"
                className={`${
                  adminSetting.layout === "full"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn flex-auto`}
                onClick={() => dispatch(toggleLayout("full"))}
              >
                Full
              </button>
            </div>
          </div>

          <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-black-7">
            <h5 className="mb-1 text-base leading-none dark:text-white">
              Direction
            </h5>
            <p className="text-xs text-white-dark">
              Select the direction for your app.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className={`${
                  adminSetting.rtlClass === "ltr"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn flex-auto`}
                onClick={() => dispatch(toggleRTL("ltr"))}
              >
                LTR
              </button>

              <button
                type="button"
                className={`${
                  adminSetting.rtlClass === "rtl"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn flex-auto`}
                onClick={() => dispatch(toggleRTL("rtl"))}
              >
                RTL
              </button>
            </div>
          </div>

          <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-black-7">
            <h5 className="mb-1 text-base leading-none dark:text-white">
              Navbar Type
            </h5>
            <p className="text-xs text-white-dark">Sticky or Floating.</p>
            <div className="mt-3 flex items-center gap-3 text-primary">
              <label className="mb-0 inline-flex">
                <input
                  type="radio"
                  checked={adminSetting.navbar === "navbar-sticky"}
                  value="navbar-sticky"
                  className="form-radio"
                  onChange={() => dispatch(toggleNavbar("navbar-sticky"))}
                />
                <span>Sticky</span>
              </label>
              <label className="mb-0 inline-flex">
                <input
                  type="radio"
                  checked={adminSetting.navbar === "navbar-floating"}
                  value="navbar-floating"
                  className="form-radio"
                  onChange={() => dispatch(toggleNavbar("navbar-floating"))}
                />
                <span>Floating</span>
              </label>
              <label className="mb-0 inline-flex">
                <input
                  type="radio"
                  checked={adminSetting.navbar === "navbar-static"}
                  value="navbar-static"
                  className="form-radio"
                  onChange={() => dispatch(toggleNavbar("navbar-static"))}
                />
                <span>Static</span>
              </label>
            </div>
          </div>

          <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-black-7">
            <h5 className="mb-1 text-base leading-none dark:text-white">
              Router Transition
            </h5>
            <p className="text-xs text-white-dark">
              Animation of main content.
            </p>
            <div className="mt-3">
              <select
                className="form-select border-primary text-primary"
                value={adminSetting.animation}
                onChange={(e) => dispatch(toggleAnimation(e.target.value))}
              >
                <option value=" ">None</option>
                <option value="animate__fadeIn">Fade</option>
                <option value="animate__fadeInDown">Fade Down</option>
                <option value="animate__fadeInUp">Fade Up</option>
                <option value="animate__fadeInLeft">Fade Left</option>
                <option value="animate__fadeInRight">Fade Right</option>
                <option value="animate__slideInDown">Slide Down</option>
                <option value="animate__slideInUp">Slide Up</option>
                <option value="animate__slideInLeft">Slide Left</option>
                <option value="animate__slideInRight">Slide Right</option>
                <option value="animate__zoomIn">Zoom In</option>
              </select>
            </div>
          </div>
        </PerfectScrollbar>
      </nav>
    </div>
  );
};

export default Setting;
