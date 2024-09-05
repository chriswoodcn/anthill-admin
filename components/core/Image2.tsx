"use client";

import { withBasePath } from "@/lib";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import { useRef, useState } from "react";

interface Props extends Record<string, any> {
  basePath?: boolean;
  src: string;
}
export default (props: Props) => {
  const { basePath, src } = props;
  const needWithBasePath = basePath == false ? basePath : true;
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffectOnce(() => {
    if (imgRef.current) imgRef.current.onload = () => setLoaded(true);
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [imgRef.current]);
  const copyProps = { ...props };
  const convertProps = Object.assign(copyProps, {
    className: undefined,
  });
  return needWithBasePath ? (
    <img
      ref={imgRef}
      {...convertProps}
      className={`${
        loaded ? "before:hidden" : "before:absolute"
      } before:animate-pulse before:bg-black-3 before:dark:bg-black-7 before:left-0 before:right-0 before:top-0 before:bottom-0 relative ${
        props.className
      }`}
      src={withBasePath(src)}
    />
  ) : (
    <img
      ref={imgRef}
      {...convertProps}
      className={`${
        loaded ? "before:hidden" : "before:absolute"
      } before:animate-pulse before:bg-black-3 before:dark:bg-black-7 before:left-0 before:right-0 before:top-0 before:bottom-0 relative ${
        props.className
      }`}
    />
  );
};
