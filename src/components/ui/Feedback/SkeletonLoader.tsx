"use client";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "circular" | "rectangular" | "text";
}

export function SkeletonLoader({ className = "", variant = "rectangular" }: SkeletonLoaderProps) {
  const variantStyles = {
    circular: "rounded-full",
    rectangular: "rounded-2xl",
    text: "rounded-md h-4"
  };

  return (
    <div className={`shimmer ${variantStyles[variant]} ${className}`} />
  );
}
