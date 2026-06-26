import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface DarkCardRowProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export function DarkCardRow({ children, className = "", ...props }: DarkCardRowProps) {
  return (
    <motion.div
      className={`bg-bg-card-mid rounded-lg p-4 flex items-center justify-between ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
