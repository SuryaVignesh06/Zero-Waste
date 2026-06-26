"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { springDefault } from "@/lib/animations";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className = "" }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springDefault}
      className={`flex flex-col items-center justify-center p-8 text-center bg-bg-card-light rounded-2xl border border-border-light shadow-card ${className}`}
    >
      {icon && (
        <div className="w-16 h-16 rounded-full bg-bg-input flex items-center justify-center text-accent-gold-dark mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-h3 mb-2">{title}</h3>
      <p className="text-body mb-6">{description}</p>
      {action && <div>{action}</div>}
    </motion.div>
  );
}
