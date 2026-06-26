"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  barClassName?: string;
}

export function ProgressBar({ progress, className = "", barClassName = "bg-accent-gold" }: ProgressBarProps) {
  return (
    <div className={`w-full h-2 bg-bg-input rounded-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full rounded-full ${barClassName}`}
      />
    </div>
  );
}
