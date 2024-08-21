"use client";

import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ContentAnimation = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const adminSetting = useSelector((state: RootState) => state.adminSetting);
  const [animation, setAnimation] = useState(adminSetting.animation);

  useEffect(() => {
    setAnimation(adminSetting.animation);
  }, [adminSetting.animation]);

  useEffect(() => {
    setAnimation(adminSetting.animation);
    setTimeout(() => {
      setAnimation("");
    }, 1100);
  }, [pathname]);
  return (
    <>
      {/* BEGIN CONTENT AREA */}
      <div className={`${animation} animate__animated p-6`}>{children}</div>
      {/* END CONTENT AREA */}
    </>
  );
};

export default ContentAnimation;
