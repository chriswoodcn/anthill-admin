"use client";

import useEffectOnce from "@/lib/hooks/useEffectOnce";
import logger from "@/lib/logger";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { usePopper } from "react-popper";

const Dropdown = (props: any, forwardedRef: any) => {
  const [visibility, setVisibility] = useState<any>(false);

  const referenceRef = useRef<any>();
  const popperRef = useRef<any>();

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: props.placement || "bottom-end",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: props.offset || [0],
          },
        },
      ],
    }
  );

  const handleDocumentClick = (event: any) => {
    if (
      referenceRef.current.contains(event.target) ||
      popperRef.current.contains(event.target)
    ) {
      return;
    }

    setVisibility(false);
  };

  useEffectOnce(() => {
    if (typeof document !== undefined)
      document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      if (typeof document !== undefined)
        document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  useImperativeHandle(forwardedRef, () => ({
    close() {
      setVisibility(false);
    },
  }));

  return (
    <>
      <button
        ref={referenceRef}
        type="button"
        className={props.btnClassName}
        onClick={(e) => {
          console.log("button e", e.currentTarget);
          setVisibility(!visibility);
        }}
      >
        {props.button}
      </button>

      <div
        ref={popperRef}
        style={styles.popper}
        {...attributes.popper}
        className="z-[999] shadow-lg"
        onClick={(e) => {
          console.log("popperRef e", e.currentTarget);
          setVisibility(!visibility);
        }}
      >
        {visibility && props.children}
      </div>
    </>
  );
};

export default forwardRef(Dropdown);
