"use client";

import { motion } from "framer-motion";

interface AvatarProps {
  src?: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Avatar({ src, fallback, size = "md", className = "" }: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
    xl: "w-24 h-24 text-xl"
  };

  return (
    <div className={`relative rounded-full overflow-hidden flex items-center justify-center bg-accent-gold-light text-text-primary font-bold ${sizeClasses[size]} ${className}`}>
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
