"use client";
import { RootState, useAppSelector, useAppDispatch } from "@/store";
import { toggleSidebar } from "@/store/slices/admin.settingSlice";

const Overlay = () => {
  const adminSetting = useAppSelector((state: RootState) => state.adminSetting);
  const dispatch = useAppDispatch();
  return (
    <>
      {/* sidebar menu overlay */}
      <div
        className={`${
          (!adminSetting.sidebar && "hidden") || ""
        } fixed inset-0 z-50 bg-[black]/60 lg:hidden`}
        onClick={() => dispatch(toggleSidebar())}
      ></div>
    </>
  );
};

export default Overlay;
