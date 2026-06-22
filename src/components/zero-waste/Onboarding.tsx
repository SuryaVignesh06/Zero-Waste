"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowRight, ArrowLeft } from "lucide-react";

const SLIDES = [
  {
    bg: "linear-gradient(160deg, #0A2E1A 0%, #1A6B3C 60%, #22C55E 100%)",
    eyebrow: "Rescue Surplus Food",
    title: "Rescue Surplus Food",
    subtitle: "Surplus meals from weddings, events, and homes reach those who need it most — in real time.",
    visual: "network",
  },
  {
    bg: "linear-gradient(160deg, #1a1a3e 0%, #1E3A8A 60%, #3B82F6 100%)",
    eyebrow: "Affordable Marketplace",
    title: "Affordable Marketplace",
    subtitle: "Near-expiry groceries at up to 70% off. Real savings for families, students, and daily earners.",
    visual: "pills",
  },
  {
    bg: "linear-gradient(160deg, #0A0A0A 0%, #1a1a1a 60%, #2a2a2a 100%)",
    eyebrow: "AI-Powered Logistics",
    title: "AI-Powered Logistics",
    subtitle: "Smart volunteer matching, optimal routes, and real-time coordination. Zero waste. Zero delay.",
    visual: "ai",
  },
];

const PRICE_PILLS = [
  { text: "Milk  ₹80 → ₹30", delay: 0, duration: 2800 },
  { text: "Bread  ₹50 → ₹15", delay: 200, duration: 3200 },
  { text: "Vegetables  ₹100 → ₹40", delay: 400, duration: 3600 },
];

export function Onboarding() {
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const [index, setIndex] = useState(0);

  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  const goNext = () => {
    if (isLast) { completeOnboarding(); return; }
    setIndex((i) => i + 1);
  };
  const goBack = () => { if (index > 0) setIndex((i) => i - 1); };

  return (
    <div className="relative flex h-full flex-col overflow-hidden" style={{ background: slide.bg }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative flex h-full flex-col"
        >
          {/* Visual zone — 52% top */}
          <div className="flex h-[52%] items-center justify-center px-8">
            <SlideVisual variant={slide.visual} pills={PRICE_PILLS} />
          </div>

          {/* Text zone — bottom 48% */}
          <div className="flex flex-1 flex-col justify-end px-8 pb-32">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-3 inline-block w-fit rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/80"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {slide.eyebrow}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[38px] font-extrabold leading-[1.1] text-white"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-4 text-[16px] leading-[1.6] text-white/75"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {slide.subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicator */}
      <div className="absolute bottom-32 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === index ? 28 : 8,
              backgroundColor: i === index ? "#FFFFFF" : "rgba(255,255,255,0.35)",
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            style={{ height: 8, borderRadius: 9999 }}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex items-center justify-between px-8">
        {!isLast ? (
          <button onClick={completeOnboarding} className="text-[15px] font-medium text-white/65" style={{ fontFamily: "var(--font-jakarta)" }}>
            Skip
          </button>
        ) : (
          <div />
        )}

        {isLast ? (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            whileTap={{ scale: 0.97 }}
            onClick={completeOnboarding}
            className="flex h-14 w-full items-center justify-center rounded-full bg-white text-[17px] font-semibold text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-outfit)", boxShadow: "0px 4px 20px rgba(255,255,255,0.25)" }}
          >
            Get Started
          </motion.button>
        ) : (
          <div className="flex items-center gap-3">
            {index > 0 && (
              <button onClick={goBack} className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                <ArrowLeft size={20} className="text-white" />
              </button>
            )}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={goNext}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white"
              style={{ boxShadow: "0px 8px 24px rgba(26,107,60,0.25)" }}
            >
              <ArrowRight size={24} className="text-[#1A6B3C]" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

function SlideVisual({ variant, pills }: { variant: string; pills: typeof PRICE_PILLS }) {
  if (variant === "network") {
    return (
      <motion.svg
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        width="280" height="280" viewBox="0 0 280 280" fill="none"
      >
        {/* Interconnected nodes */}
        <motion.path d="M140 50 L80 140 L140 230 L200 140 Z" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />
        <motion.path d="M80 140 L200 140" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.3 }} />
        <motion.path d="M140 50 L140 230" stroke="white" strokeOpacity="0.15" strokeWidth="1" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.5 }} />

        {/* Nodes */}
        {[[140,50],[80,140],[200,140],[140,230],[50,90],[230,90],[50,190],[230,190]].map(([cx,cy],i) => (
          <motion.circle key={i} cx={cx} cy={cy} r={i < 4 ? 8 : 5} fill="white" fillOpacity={i < 4 ? 0.9 : 0.5}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.1, type: "spring" }} />
        ))}
      </motion.svg>
    );
  }

  if (variant === "pills") {
    return (
      <div className="flex flex-col items-center gap-5">
        {pills.map((pill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: pill.delay / 1000 + 0.3, type: "spring" }}
            className="flex items-center gap-3 rounded-2xl px-5 py-3"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <motion.span
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: pill.duration / 1000, repeat: Infinity, ease: "easeInOut" }}
              className="text-[16px] font-semibold text-white"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {pill.text}
            </motion.span>
          </motion.div>
        ))}
      </div>
    );
  }

  // ai network graph
  return (
    <motion.svg
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      width="280" height="280" viewBox="0 0 280 280" fill="none"
    >
      {/* Center node */}
      <motion.circle cx="140" cy="140" r="20" fill="#22C55E"
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} />

      {/* Connection lines */}
      {[[60,60],[220,60],[60,220],[220,220],[140,40],[140,240],[40,140],[240,140]].map(([x,y],i) => (
        <g key={i}>
          <motion.line x1="140" y1="140" x2={x} y2={y} stroke="#22C55E" strokeOpacity="0.3" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: i * 0.1 }} />
          <motion.circle cx={x} cy={y} r="8" fill="#3B82F6" fillOpacity="0.7"
            initial={{ scale: 0 }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }} />
        </g>
      ))}
    </motion.svg>
  );
}
