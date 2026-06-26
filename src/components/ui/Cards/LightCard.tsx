import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface LightCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hasLeftAccent?: boolean;
}

export function LightCard({ children, className = "", hasLeftAccent = false, ...props }: LightCardProps) {
  return (
    <motion.div
      className={`relative rounded-[28px] p-[20px] overflow-hidden shrink-0 w-full ${className}`}
      style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(32px) saturate(1.6)",
        WebkitBackdropFilter: "blur(32px) saturate(1.6)",
        border: "1px solid rgba(255,255,255,0.60)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.95)",
        ...(props.style || {}),
      }}
      {...props}
    >
      {hasLeftAccent && (
        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-accent-gold rounded-l-[28px]" />
      )}
      {children}
    </motion.div>
  );
}
