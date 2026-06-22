"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Info } from "lucide-react";

export function Login() {
  const setScreen = useAppStore((s) => s.setScreen);
  const setPhoneNumber = useAppStore((s) => s.setPhoneNumber);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = phone.length === 10;

  const handleSendOtp = () => {
    if (!isValid) return;
    setLoading(true);
    setPhoneNumber(phone);
    setTimeout(() => {
      setLoading(false);
      setScreen("otp");
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col" style={{ background: "#F7F5F0" }}>
      {/* Top visual zone — 44% */}
      <div
        className="relative flex flex-col items-center justify-center gap-4"
        style={{
          height: "44%",
          background: "linear-gradient(180deg, #0A2E1A 0%, #1A6B3C 80%, #F7F5F0 100%)",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px",
        }}
      >
        {/* Logo mark — diamond shape */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex h-14 w-14 items-center justify-center"
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <rect x="14" y="14" width="28" height="28" rx="8" transform="rotate(45 28 28)" fill="white" />
            <path d="M28 20 L33 28 L28 36 L23 28 Z" fill="#1A6B3C" />
          </svg>
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[24px] font-extrabold text-white"
          style={{ fontFamily: "var(--font-outfit)", letterSpacing: "3px" }}
        >
          ZERO WASTE
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[14px] text-white/75"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Food should feed people.
        </motion.span>
      </div>

      {/* Bottom auth panel */}
      <div
        className="flex flex-1 flex-col px-8 pt-9"
        style={{
          background: "#FFFFFF",
          borderTopLeftRadius: "32px",
          borderTopRightRadius: "32px",
          marginTop: "-32px",
          boxShadow: "0px -8px 40px rgba(0,0,0,0.08)",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[28px] font-bold text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Welcome back.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-[15px] text-[#4A4A4A]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Enter your mobile number to continue.
        </motion.p>

        {/* Phone input */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex h-[60px] items-center"
          style={{
            borderRadius: "16px",
            border: `2px solid ${phone ? "#1A6B3C" : "#E8E8E4"}`,
            background: "#FAFAF8",
            transition: "border-color 200ms",
          }}
        >
          <span className="px-4 text-[17px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)", borderRight: "1px solid #E8E8E4", height: "60%", display: "flex", alignItems: "center" }}>
            +91
          </span>
          <input
            type="tel"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="Mobile number"
            className="h-full flex-1 bg-transparent px-4 text-[17px] font-medium text-[#0A0A0A] placeholder:text-[#8A8A8A] focus:outline-none"
            style={{ fontFamily: "var(--font-outfit)" }}
          />
        </motion.div>

        {/* Send OTP button */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSendOtp}
          disabled={!isValid || loading}
          className="mt-5 flex h-14 w-full items-center justify-center rounded-full text-[17px] font-semibold transition-all"
          style={{
            background: isValid ? "#1A6B3C" : "#E8E8E4",
            color: isValid ? "#FFFFFF" : "#8A8A8A",
            boxShadow: isValid ? "0px 8px 24px rgba(26,107,60,0.25)" : "none",
            fontFamily: "var(--font-outfit)",
          }}
        >
          {loading ? (
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  className="h-2 w-2 rounded-full bg-white"
                />
              ))}
            </div>
          ) : (
            "Send OTP"
          )}
        </motion.button>

        {/* Aadhaar note */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          <Info size={12} className="text-[#8A8A8A]" />
          <span className="text-[12px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
            Aadhaar verification for NGOs — coming soon
          </span>
        </div>

        {/* Terms */}
        <p className="mt-4 text-center text-[11px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
          By continuing you agree to our{" "}
          <span className="underline text-[#1A6B3C]">Terms</span> and{" "}
          <span className="underline text-[#1A6B3C]">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
