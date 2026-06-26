"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface PrimaryButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function PrimaryButton({ children, icon, className = "", disabled, ...props }: PrimaryButtonProps) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`h-[44px] w-full bg-accent-gold text-text-primary rounded-[18px] px-6 text-body-lg font-semibold flex items-center justify-center gap-2 shadow-button transition-colors
        ${disabled ? "opacity-50 cursor-not-allowed shadow-none" : "hover:bg-[#FCECB1]"}
        ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}
