"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft } from "lucide-react";

export function Otp() {
  const setScreen = useAppStore((s) => s.setScreen);
  const phoneNumber = useAppStore((s) => s.phoneNumber);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [countdown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    setError(false);

    if (val && i < 3) {
      inputRefs.current[i + 1]?.focus();
    }

    // Auto-submit when all 4 digits filled
    if (newOtp.every((d) => d) && newOtp.join("").length === 4) {
      setTimeout(() => handleVerify(newOtp.join("")), 300);
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handleVerify = (code: string) => {
    // Accept any 4-digit code for demo (or specific code like "1234")
    if (code.length === 4) {
      setSuccess(true);
      setTimeout(() => {
        setScreen("role-select");
      }, 1200);
    } else {
      setError(true);
    }
  };

  const maskedPhone = phoneNumber
    ? `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`
    : "+91 XXXXX XXXXX";

  return (
    <div className="relative flex h-full flex-col items-center" style={{ background: "#F7F5F0" }}>
      {/* Back button */}
      <button
        onClick={() => setScreen("login")}
        className="absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white"
        style={{ boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)" }}
      >
        <ArrowLeft size={20} className="text-[#0A0A0A]" />
      </button>

      {/* Header */}
      <div className="mt-20 px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[30px] font-bold text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Verify your number
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-[16px] font-medium text-[#4A4A4A]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {maskedPhone}
        </motion.p>
        <button
          onClick={() => setScreen("login")}
          className="mt-2 text-[14px] font-medium text-[#1A6B3C] underline"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Change mobile number
        </button>
      </div>

      {/* OTP input grid */}
      <div className="mt-12 flex justify-center gap-3">
        {otp.map((digit, i) => (
          <motion.input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: error ? 1 : 1,
              opacity: 1,
              x: error ? [0, -6, 6, -4, 4, 0] : 0,
            }}
            transition={{ delay: i * 0.05, duration: error ? 0.3 : 0.4 }}
            type="tel"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-[76px] w-[68px] rounded-[16px] text-center text-[32px] font-bold text-[#0A0A0A] focus:outline-none"
            style={{
              fontFamily: "var(--font-outfit)",
              border: `2px solid ${error ? "#DC2626" : digit ? "#1A6B3C" : "#E8E8E4"}`,
              background: digit ? "#F0F7F2" : "#FFFFFF",
              boxShadow: digit ? "0 0 0 4px rgba(26,107,60,0.12)" : "0px 2px 16px rgba(0,0,0,0.06)",
            }}
          />
        ))}
      </div>

      {/* Resend row */}
      <div className="mt-8">
        {countdown > 0 ? (
          <p className="text-[14px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
            Resend OTP in 0:{countdown.toString().padStart(2, "0")}
          </p>
        ) : (
          <button
            onClick={() => { setCountdown(30); setOtp(["", "", "", ""]); inputRefs.current[0]?.focus(); }}
            className="text-[14px] font-bold text-[#1A6B3C]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Resend OTP
          </button>
        )}
      </div>

      {/* Verify button */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => handleVerify(otp.join(""))}
        disabled={!otp.every((d) => d)}
        className="absolute bottom-8 left-8 right-8 flex h-14 items-center justify-center rounded-full text-[17px] font-semibold transition-all disabled:opacity-40"
        style={{
          background: "#1A6B3C",
          color: "#FFFFFF",
          fontFamily: "var(--font-outfit)",
          boxShadow: "0px 8px 24px rgba(26,107,60,0.25)",
        }}
      >
        Verify and Continue
      </motion.button>

      {/* Success overlay */}
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0A2E1A, #1A6B3C)" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <motion.path
                d="M14 24 L21 31 L34 17"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
