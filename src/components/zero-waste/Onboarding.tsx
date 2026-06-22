"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ONBOARDING_SLIDES } from "@/lib/mock-data";
import {
  ShoppingBasket,
  HeartHandshake,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Recycle,
} from "lucide-react";

const ICONS: Record<string, any> = {
  ShoppingBasket,
  HeartHandshake,
  Sparkles,
};

const displayFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

export function Onboarding() {
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slide = ONBOARDING_SLIDES[index];
  const Icon = ICONS[slide.accentIcon] ?? Sparkles;

  const goNext = () => {
    if (index === ONBOARDING_SLIDES.length - 1) {
      completeOnboarding();
      return;
    }
    setDirection(1);
    setIndex((i) => i + 1);
  };

  const goBack = () => {
    if (index === 0) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#FCFCF9]">
      {/* Decorative soft pastel blob */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #86efac 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #bfdbfe 0%, transparent 70%)",
        }}
      />

      {/* Skip */}
      <button
        onClick={completeOnboarding}
        className="absolute right-5 top-5 z-20 rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-[#111827] active:scale-95"
        style={{ boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}
      >
        Skip
      </button>

      {/* Slide visual */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="relative flex h-full flex-col"
          >
            {/* Brand mark */}
            <div className="flex items-center justify-center pt-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, #16a34a, #15803d)",
                    boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
                  }}
                >
                  <Recycle size={20} className="text-white" strokeWidth={2.4} />
                </div>
                <span
                  className="text-xl font-bold tracking-tight text-[#111827]"
                  style={{ fontFamily: displayFont }}
                >
                  Zero-Waste
                </span>
              </motion.div>
            </div>

            {/* Hero icon */}
            <div className="flex flex-1 items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                }}
                className="relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-[3rem] blur-2xl"
                  style={{ background: slide.gradient }}
                />
                <div
                  className="relative flex h-32 w-32 items-center justify-center rounded-[3rem]"
                  style={{
                    background: slide.gradient,
                    boxShadow: "0 16px 40px rgba(17, 24, 39, 0.18)",
                  }}
                >
                  <Icon
                    size={56}
                    strokeWidth={1.8}
                    className="text-white"
                  />
                </div>
              </motion.div>
            </div>

            {/* Text */}
            <div className="px-8 pb-2">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-[28px] font-bold leading-tight tracking-tight text-[#111827]"
                style={{ fontFamily: displayFont }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-3 text-[15px] leading-relaxed text-[#64748b]"
              >
                {slide.subtitle}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination + CTA */}
      <div className="relative z-10 px-6 pb-10 pt-4">
        <div className="mb-5 flex items-center justify-center gap-2">
          {ONBOARDING_SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className="rounded-full"
              animate={{
                width: i === index ? 28 : 8,
                backgroundColor:
                  i === index ? "#16A34A" : "rgba(17, 24, 39, 0.12)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ height: 8 }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {index > 0 && (
            <button
              onClick={goBack}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#111827] active:scale-95"
              style={{ boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}
            >
              <ChevronLeft size={22} />
            </button>
          )}
          <motion.button
            onClick={goNext}
            whileTap={{ scale: 0.96 }}
            className="flex h-14 flex-1 items-center justify-center gap-2 text-[15px] font-semibold text-white"
            style={{
              borderRadius: 22,
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              boxShadow: "0 8px 24px rgba(22, 163, 74, 0.3)",
            }}
          >
            {index === ONBOARDING_SLIDES.length - 1
              ? "Get Started"
              : "Continue"}
            <ChevronRight size={18} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
