import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const useEffectOnce = process.env.NODE_ENV == "development" ? (cb: EffectCallback, dependencies: DependencyList | undefined) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      return cb();
    }
    mounted.current = true;
  }, dependencies);
} : useEffect

export default useEffectOnce;
