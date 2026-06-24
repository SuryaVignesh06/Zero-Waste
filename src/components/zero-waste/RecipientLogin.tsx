"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ChevronLeft, LogIn } from "lucide-react";

export function RecipientLogin() {
  const setScreen = useAppStore((s) => s.setScreen);
  const [phone, setPhone] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      // Direct login to recipient home for demo purposes
      setScreen("recipientHome" as any);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Top Header */}
      <div className="px-4 pt-12 pb-4">
        <button
          onClick={() => setScreen("recipient-auth-choice" as any)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ChevronLeft size={20} className="text-[#0A0A0A]" />
        </button>
      </div>

      <main className="flex-1 px-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5D0FE] mb-6"
        >
          <LogIn size={28} className="text-[#86198F]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[30px] font-bold text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-[15px] text-[#4A4A4A]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Enter your registered phone number to access your account.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleLogin}
          className="mt-10 flex flex-col gap-6"
        >
          <div>
            <label className="mb-2 block text-[13px] font-bold text-[#4A4A4A] uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-4 text-[16px] font-medium text-[#0A0A0A] focus:border-[#86198F] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={phone.length < 10}
            className="mt-4 flex h-14 w-full items-center justify-center rounded-full bg-[#86198F] text-[17px] font-bold text-white transition-opacity disabled:opacity-50 shadow-[0_8px_24px_rgba(134,25,143,0.25)]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Login
          </button>
        </motion.form>
      </main>
    </div>
  );
}
