"use client";

import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import { useAppStore } from "@/lib/store";

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: ReactNode;
  className?: string;
}

export function PageHeader({ title, onBack, rightElement, className = "" }: PageHeaderProps) {
  const { goBack } = useAppStore();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  return (
    <div className={`flex items-center justify-between py-6 px-6 ${className}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-bg-card-light shadow-button flex items-center justify-center text-text-primary hover:bg-bg-input transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-h1">{title}</h1>
      </div>
      {rightElement && (
        <div>{rightElement}</div>
      )}
    </div>
  );
}
