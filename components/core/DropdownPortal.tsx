"use client";

import useEffectOnce from "@/lib/hooks/useEffectOnce";
import { Popover } from "@mantine/core";
import { cloneElement, forwardRef, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import logger from "@/lib/logger";

const DropdownPortal = (props: any, forwardedRef: any) => {
  const [opened, setOpened] = useState(false);
  const memPathname = useRef("");
  const pathname = usePathname();
  useEffectOnce(() => {
    memPathname.current = pathname;
  }, []);
  useEffectOnce(() => {
    if (pathname !== memPathname.current) {
      memPathname.current = pathname;
      setOpened(false);
    }
  }, [pathname]);

  return (
    <Popover
      width={200}
      position={props.placement || "bottom-start"}
      shadow="lg"
      offset={1}
      // clickOutsideEvents={["mouseup", "touchend"]}
      // closeOnClickOutside={false}
      opened={opened}
      onChange={setOpened}
      keepMounted
    >
      <Popover.Target>
        {!props.onClick
          ? cloneElement(props.button, {
              onClick: () => setOpened((o) => !o),
            })
          : props.button}
      </Popover.Target>
      <Popover.Dropdown>{props.children}</Popover.Dropdown>
    </Popover>
  );
};

export default forwardRef(DropdownPortal);
