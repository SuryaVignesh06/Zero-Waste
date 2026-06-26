"use client";

import { ReactNode } from "react";

export function ScreenWrapper({ 
  children, 
  className = "", 
  floatingContent,
  scrollable = true 
}: { 
  children: ReactNode; 
  className?: string; 
  floatingContent?: ReactNode;
  scrollable?: boolean;
}) {
  return (
    <div className={`relative flex-1 w-full overflow-hidden bg-transparent flex flex-col ${className}`}>
      {/* Background Orbs for soft glassmorphism depth */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-accent-gold/20 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-color-info/10 rounded-full blur-[100px] pointer-events-none z-0" />
      
      {/* Content Area with exact scroll padding */}
      <div className={`relative z-10 w-full h-full ${scrollable ? 'overflow-y-auto px-[24px] pt-[24px] pb-[32px]' : 'overflow-hidden flex flex-col'} scroll-smooth`}>
        {children}
      </div>

      {floatingContent && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {floatingContent}
        </div>
      )}
    </div>
  );
}
