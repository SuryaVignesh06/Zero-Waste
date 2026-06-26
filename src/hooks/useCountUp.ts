"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export function useCountUp(endValue: number, duration: number = 1.5) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, endValue, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [endValue, duration]);

  return value;
}
