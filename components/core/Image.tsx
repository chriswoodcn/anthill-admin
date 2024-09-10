"use client";

import { withBasePath } from "@/lib";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import { ReactElement, useRef, useState } from "react";

interface Props extends Record<string, any> {
  basePath?: boolean;
  src: string;
  showSkeleton?: boolean;
  autosize?: string;
  skeleton?: ReactElement;
}
export default (props: Props) => {
  const { basePath, src } = props;
  const needWithBasePath = basePath == false ? basePath : true;
  const [showSkeleton, setShowSkeleton] = useState(
    props.showSkeleton == undefined || props.showSkeleton
  );
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffectOnce(() => {
    if (imgRef.current) imgRef.current.onload = () => setLoaded(true);
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [imgRef.current]);
  const cover = props.skeleton ? (
    <div className="absolute left-0 right-0 top-0 bottom-0 rounded  animate-pulse">
      {props.skeleton}
    </div>
  ) : (
    <div className="absolute left-0 right-0 top-0 bottom-0 rounded bg-white-6 dark:bg-black-7 animate-pulse"></div>
  );
  return needWithBasePath ? (
    <div className={`relative ${props.autosize ? "" : "w-full h-full"}`}>
      {!loaded && showSkeleton && cover}
      <img ref={imgRef} {...props} src={withBasePath(src)} />
    </div>
  ) : (
    <div className={`relative ${props.autosize ? "" : "w-full h-full"}`}>
      {!loaded && showSkeleton && cover}
      <img ref={imgRef} {...props} />
    </div>
  );
};
