"use client";

import { InputHTMLAttributes, ReactNode } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
  rightElement?: ReactNode;
  containerClassName?: string;
}

export function InputField({ 
  label, 
  icon, 
  error, 
  rightElement,
  containerClassName = "", 
  className = "", 
  ...props 
}: InputFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && <label className="text-body-md text-text-primary ml-1">{label}</label>}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-text-muted flex items-center justify-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`w-full glass-panel text-text-primary rounded-[30px] border-none h-[56px] ${icon ? 'pl-12' : 'pl-6'} ${rightElement ? 'pr-12' : 'pr-6'} focus:ring-2 focus:ring-accent-gold outline-none transition-shadow text-body-lg placeholder:text-text-muted ${error ? 'ring-2 ring-color-urgent' : ''} ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-4 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && <span className="text-caption text-color-urgent ml-1">{error}</span>}
    </div>
  );
}
