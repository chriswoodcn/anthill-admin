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
      logger.debug("DropdownPortal watch pathname", pathname);
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
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        {cloneElement(props.button, {
          onClick: () => setOpened((o) => !o),
        })}
      </Popover.Target>
      <Popover.Dropdown>{props.children}</Popover.Dropdown>
    </Popover>
  );
};

export default forwardRef(DropdownPortal);
