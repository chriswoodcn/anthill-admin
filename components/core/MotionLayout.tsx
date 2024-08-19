"use client";

import useEffectOnce from "@/lib/hooks/useEffectOnce";
import { motion } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";
import { useImmer } from "use-immer";

interface MotionParams {
  variants?: Record<string, any>;
  duration?: number;
  ease?: string;
}
const DEFAULT_PARAMS: MotionParams = {
  variants: {
    hidden: { opacity: 0, x: 200 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  },
  duration: 0.5,
  ease: "easeInOut",
};
export default function MotionLayout(props: PropsWithChildren & MotionParams) {
  const { children } = props;
  const [motionParams, setMotionParams] = useImmer(DEFAULT_PARAMS);

  useEffectOnce(() => {
    if (props.variants) {
      setMotionParams((params) => {
        const vars = {
          ...params.variants,
          ...props.variants,
        };
        params.variants = vars;
      });
    }
    if (props.duration) {
      setMotionParams((params) => {
        params.duration = props.duration;
      });
    }
    if (props.ease) {
      setMotionParams((params) => {
        params.ease = props.ease;
      });
    }
  }, []);

  return (
    <motion.main
      data-scroll
      className="motion-layout"
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={motionParams.variants}
      transition={{ duration: motionParams.duration, ease: motionParams.ease }}
    >
      {children}
    </motion.main>
  );
}
