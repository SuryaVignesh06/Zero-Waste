"use client";

import { motion } from "framer-motion";

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className = "" }: StepperProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {steps.map((step, idx) => {
        const isActive = idx === currentStep;
        const isCompleted = idx < currentStep;

        return (
          <div key={idx} className="flex-1 flex flex-col gap-1.5">
            <div className={`h-1.5 rounded-full w-full transition-colors ${isActive || isCompleted ? "bg-accent-gold" : "bg-bg-input"}`} />
            <span className={`text-[10px] uppercase font-bold tracking-wider ${isActive ? "text-text-primary" : "text-text-muted"}`}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
