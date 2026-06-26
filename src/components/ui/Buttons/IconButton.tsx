"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface IconButtonProps extends HTMLMotionProps<"button"> {
  icon: ReactNode;
  className?: string;
  variant?: "light" | "dark" | "ghost" | "gold";
  disabled?: boolean;
}

export function IconButton({ icon, className = "", variant = "light", disabled, ...props }: IconButtonProps) {
  const baseClasses = "w-[40px] h-[40px] rounded-full flex items-center justify-center transition-colors flex-shrink-0";
  
  const variantClasses = {
    light: "glass-panel text-text-primary",
    dark: "bg-bg-card-dark text-text-on-dark shadow-dark hover:bg-bg-card-mid",
    ghost: "bg-transparent text-text-primary hover:bg-black/5",
    gold: "bg-accent-gold text-text-primary shadow-button hover:bg-[#FCECB1]"
  };

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon}
    </motion.button>
  );
}
