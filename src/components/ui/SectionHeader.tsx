"use client";

import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, action, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <h2 className="text-h2">{title}</h2>
      {action && (
        <div className="text-accent-gold-dark text-body-md font-semibold">
          {action}
        </div>
      )}
    </div>
  );
}
