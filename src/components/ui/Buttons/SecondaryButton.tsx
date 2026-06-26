"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface SecondaryButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function SecondaryButton({ children, icon, className = "", disabled, ...props }: SecondaryButtonProps) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`h-[44px] w-full glass-panel text-text-secondary rounded-[18px] px-6 text-body-lg font-semibold flex items-center justify-center gap-2 transition-colors
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:text-text-primary"}
        ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}
