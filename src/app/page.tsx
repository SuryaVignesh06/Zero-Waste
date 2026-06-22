"use client";

import { AppShell } from "@/components/zero-waste/AppShell";

export default function Home() {
  return (
    <div
      style={{
        background: "#f5f1ed",
        height: "100dvh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Phone frame — uses 100dvh on mobile, fixed size on desktop */}
      <div
        style={{
          position: "relative",
          height: "100dvh",
          width: "100%",
          maxWidth: "440px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#f5f1ed",
        }}
        className="sm:rounded-[44px] sm:shadow-2xl sm:border sm:border-black/5 sm:h-[860px] sm:max-h-[94vh]"
      >
        <AppShell />
      </div>
    </div>
  );
}
