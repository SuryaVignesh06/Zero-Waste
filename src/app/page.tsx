"use client";

import { AppShell } from "@/components/zero-waste/AppShell";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center sm:p-4 md:p-6" style={{ background: "#fcfcf9" }}>
      {/* Phone frame on desktop, full-screen on mobile — uses h-[100dvh] for proper mobile scroll */}
      <div
        className="relative flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-[#FCFCF9] sm:h-[860px] sm:max-h-[92vh] sm:rounded-[44px] sm:shadow-2xl"
        style={{ boxShadow: "0 20px 60px rgba(17, 24, 39, 0.12)" }}
      >
        <AppShell />
      </div>
    </main>
  );
}
