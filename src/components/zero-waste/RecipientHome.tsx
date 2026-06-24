"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Utensils, HeartHandshake, Package } from "lucide-react";

export function RecipientHome() {
  const setScreen = useAppStore((s) => s.setScreen);

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }} className="bg-[#F7F5F0] px-5 pt-12 pb-24">
      <h1 className="text-[28px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
        Welcome back
      </h1>
      <p className="mt-2 text-[15px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
        How can we help you today?
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <button
          onClick={() => setScreen("marketplace")}
          className="flex items-center gap-4 rounded-[24px] bg-white p-5 shadow-[0px_2px_16px_rgba(0,0,0,0.04)] transition-transform active:scale-95"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E0F2FE]">
            <Package size={28} className="text-[#0284C7]" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Buy Groceries</h3>
            <p className="mt-1 text-[13px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Affordable and fresh items directly from shops.</p>
          </div>
        </button>

        <button
          onClick={() => setScreen("foodRequest")}
          className="flex items-center gap-4 rounded-[24px] bg-white p-5 shadow-[0px_2px_16px_rgba(0,0,0,0.04)] transition-transform active:scale-95"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3]">
            <Utensils size={28} className="text-[#DB2777]" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Request Food</h3>
            <p className="mt-1 text-[13px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Send a request to nearby donors and NGOs.</p>
          </div>
        </button>

        <div className="mt-6 rounded-[24px] bg-[#FAF5FF] p-5 border border-[#E9D5FF]">
          <div className="flex items-center gap-3">
            <HeartHandshake size={24} className="text-[#6B21A8]" />
            <h3 className="text-[16px] font-bold text-[#6B21A8]" style={{ fontFamily: "var(--font-outfit)" }}>Community Support</h3>
          </div>
          <p className="mt-2 text-[14px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
            Our community is here to support you. Let us know what you need, and we will connect you with the right resources.
          </p>
        </div>
      </div>
    </div>
  );
}
