"use client";

import { AppShell } from "@/components/zero-waste/AppShell";

export default function Home() {
  return (
    <div
      style={{
        background: "#F7F5F0",
        height: "100dvh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "100dvh",
          width: "100%",
          maxWidth: "390px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#F7F5F0",
        }}
        className="sm:rounded-[44px] sm:shadow-2xl sm:border sm:border-black/5 sm:h-[844px] sm:max-h-[94vh]"
      >
        {/* Status bar simulation */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1" style={{ height: "44px", flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-outfit)", fontSize: "15px", fontWeight: 600, color: "#0A0A0A" }}>
            9:41
          </span>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M2 22h2M6 18h2M10 14h2M14 10h2M18 6h2" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="22" height="16" viewBox="0 0 24 16" fill="none">
              <rect x="1" y="2" width="20" height="12" rx="3" stroke="#0A0A0A" strokeWidth="1.5"/>
              <rect x="3" y="4" width="14" height="8" rx="1" fill="#0A0A0A"/>
              <rect x="22" y="6" width="1.5" height="4" rx="0.5" fill="#0A0A0A"/>
            </svg>
          </div>
        </div>

        <AppShell />
      </div>
    </div>
  );
}
