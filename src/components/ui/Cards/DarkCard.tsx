import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface DarkCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export function DarkCard({ children, className = "", ...props }: DarkCardProps) {
  return (
    <motion.div
      className={`bg-bg-card-dark text-text-on-dark rounded-[32px] p-[24px] shadow-none shrink-0 w-full ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
