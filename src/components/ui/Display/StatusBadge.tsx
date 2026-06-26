"use client";

import { ReactNode } from "react";

export type BadgeVariant = "urgent" | "warning" | "success" | "info" | "neutral" | "gold";

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: ReactNode;
  className?: string;
}

export function StatusBadge({ label, variant = "neutral", icon, className = "" }: StatusBadgeProps) {
  const variantStyles = {
    urgent: "bg-color-urgent-bg text-color-urgent",
    warning: "bg-color-warning-bg text-color-warning",
    success: "bg-color-success-bg text-color-success",
    info: "bg-color-info-bg text-color-info",
    neutral: "bg-bg-input text-text-secondary",
    gold: "bg-accent-gold/20 text-accent-gold-dark"
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption-bold ${variantStyles[variant]} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {label}
    </div>
  );
}
