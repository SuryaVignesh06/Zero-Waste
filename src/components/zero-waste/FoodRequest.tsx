"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export function FoodRequest() {
  const setScreen = useAppStore((s) => s.setScreen);
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#F7F5F0] px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-[#C8E8D0]"
        >
          <CheckCircle2 size={48} className="text-[#1A6B3C]" />
        </motion.div>
        <h2 className="mt-6 text-[24px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Request Sent</h2>
        <p className="mt-2 text-[15px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Nearby NGOs and donors have been notified of your request.
        </p>
        <button
          onClick={() => setScreen("recipientHome")}
          className="mt-8 flex h-14 w-full max-w-[200px] items-center justify-center rounded-full bg-[#1A6B3C] text-[16px] font-bold text-white shadow-sm"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }} className="bg-[#F7F5F0]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[rgba(247,245,240,0.95)] backdrop-blur-md px-5 pt-12 pb-4 flex items-center">
        <button
          onClick={() => setScreen("recipientHome")}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ArrowLeft size={20} className="text-[#0A0A0A]" />
        </button>
        <h1 className="ml-4 text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Request Food</h1>
      </div>

      <div className="px-5 pt-6 pb-24">
        <div className="rounded-[24px] bg-white p-6 shadow-sm">
          <label className="text-[14px] font-bold text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>What do you need?</label>
          <textarea
            rows={4}
            placeholder="e.g. Need 5 daily meals for my family, or dry ration."
            className="mt-2 w-full resize-none rounded-[16px] border border-[#E8E8E4] p-4 text-[16px] focus:border-[#6B21A8] focus:outline-none"
          />

          <label className="mt-6 block text-[14px] font-bold text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Urgency</label>
          <div className="mt-2 flex gap-3">
            {["High", "Medium", "Low"].map((u, i) => (
              <button
                key={u}
                className={`flex-1 rounded-[16px] border py-3 text-[14px] font-bold transition-colors ${
                  i === 0 ? "border-[#6B21A8] bg-[#FAF5FF] text-[#6B21A8]" : "border-[#E8E8E4] text-[#8A8A8A]"
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSuccess(true)}
            className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-[#6B21A8] text-[16px] font-bold text-white shadow-[0px_8px_24px_rgba(107,33,168,0.25)]"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}
