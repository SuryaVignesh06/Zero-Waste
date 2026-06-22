"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, Check } from "lucide-react";

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

    if (newOtp.every((d) => d) && newOtp.join("").length === 4) {
      setTimeout(() => handleVerify(newOtp.join("")), 400);
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handleVerify = (code: string) => {
    if (code.length === 4) {
      setSuccess(true);
      setTimeout(() => {
        const role = useAppStore.getState().role;
        if (role === "ngo") setScreen("ngo-feed");
        else if (role === "volunteer") setScreen("volunteer-map");
        else if (role === "shop") setScreen("shop-dashboard");
        else setScreen("home");
      }, 1400);
    } else {
      setError(true);
    }
  };

  const maskedPhone = phoneNumber
    ? `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`
    : "+91 XXXXX XXXXX";

  const allFilled = otp.every((d) => d);

  return (
    <div className="relative flex h-full flex-col" style={{ background: "#F7F5F0" }}>
      {/* Decorative top gradient blob */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #1A6B3C 0%, transparent 70%)" }}
      />

      {/* Back button */}
      <button
        onClick={() => setScreen("login")}
        className="absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white"
        style={{ boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)" }}
      >
        <ArrowLeft size={20} className="text-[#0A0A0A]" />
      </button>

      {/* Content */}
      <div className="relative flex flex-1 flex-col items-center px-8 pt-24">
        {/* Icon — shield with check */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="flex h-20 w-20 items-center justify-center rounded-[24px]"
          style={{
            background: "linear-gradient(135deg, #1A6B3C, #0A2E1A)",
            boxShadow: "0px 8px 24px rgba(26,107,60,0.25)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-7 text-[28px] font-bold text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Verify your number
        </motion.h1>

        {/* Subtitle with phone */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 flex flex-col items-center gap-1"
        >
          <p className="text-[16px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
            Enter the 4-digit code sent to
          </p>
          <p className="text-[17px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            {maskedPhone}
          </p>
        </motion.div>

        {/* Change number link */}
        <button
          onClick={() => setScreen("login")}
          className="mt-2 text-[14px] font-semibold text-[#1A6B3C] underline"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Change mobile number
        </button>

        {/* OTP input grid */}
        <div className="mt-10 flex justify-center gap-3.5">
          {otp.map((digit, i) => (
            <motion.input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: error ? [0, -8, 8, -6, 6, 0] : 0,
              }}
              transition={{ delay: i * 0.06, duration: error ? 0.4 : 0.4 }}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="h-[72px] w-[64px] rounded-[18px] text-center text-[30px] font-bold text-[#0A0A0A] focus:outline-none"
              style={{
                fontFamily: "var(--font-outfit)",
                border: `2px solid ${error ? "#DC2626" : digit ? "#1A6B3C" : "#E8E8E4"}`,
                background: digit ? "#F0F7F2" : "#FFFFFF",
                boxShadow: digit
                  ? "0 0 0 4px rgba(26,107,60,0.12), 0px 2px 16px rgba(0,0,0,0.06)"
                  : "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)",
                transition: "border-color 200ms, background 200ms",
              }}
            />
          ))}
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-[13px] font-medium text-[#DC2626]"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Invalid code. Please try again.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Resend row */}
        <div className="mt-6">
          {countdown > 0 ? (
            <p className="text-[14px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Resend OTP in{" "}
              <span className="font-bold text-[#0A0A0A]">0:{countdown.toString().padStart(2, "0")}</span>
            </p>
          ) : (
            <button
              onClick={() => {
                setCountdown(30);
                setOtp(["", "", "", ""]);
                setError(false);
                inputRefs.current[0]?.focus();
              }}
              className="text-[14px] font-bold text-[#1A6B3C]"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>

      {/* Verify button */}
      <div className="px-8 pb-8">
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleVerify(otp.join(""))}
          disabled={!allFilled}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full text-[17px] font-semibold transition-all disabled:opacity-40"
          style={{
            background: allFilled ? "#1A6B3C" : "#E8E8E4",
            color: allFilled ? "#FFFFFF" : "#8A8A8A",
            fontFamily: "var(--font-outfit)",
            boxShadow: allFilled ? "0px 8px 24px rgba(26,107,60,0.25)" : "none",
          }}
        >
          Verify and Continue
          <Check size={20} strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0A2E1A, #1A6B3C)" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Check size={48} strokeWidth={3} className="text-white" />
              </motion.div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-[22px] font-bold text-white"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Verified!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-2 text-[14px] text-white/80"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Setting up your account...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
