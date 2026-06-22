"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ChevronRight, ChevronLeft } from "lucide-react";

const STORY_SLIDES = [
  {
    // Slide 1: The Problem
    bgClass: "bg-story-1",
    eyebrow: "The Problem",
    title: "Every day, food worth\ncrores is thrown away.",
    body: "Marriage halls, restaurants, hostels, and supermarkets discard perfectly edible food while millions struggle to afford their next meal.",
    visual: "problem",
    cta: "Continue",
  },
  {
    // Slide 2: The Solution
    bgClass: "bg-story-2",
    eyebrow: "The Solution",
    title: "What if surplus could\nfeed communities instead?",
    body: "Zero-Waste connects surplus food with NGOs, volunteers, and families in real-time. Near-expiry groceries are sold at up to 70% off. Everyone wins.",
    visual: "solution",
    cta: "Continue",
  },
  {
    // Slide 3: The Action
    bgClass: "bg-story-3",
    eyebrow: "Join the movement",
    title: "Join thousands rescuing\nfood, saving money.",
    body: "Every rescue earns impact points, prevents CO2 emissions, and feeds someone in need. Your action today creates a sustainable tomorrow.",
    visual: "action",
    cta: "Get Started",
  },
];

export function Onboarding() {
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slide = STORY_SLIDES[index];

  const goNext = () => {
    if (index === STORY_SLIDES.length - 1) {
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
    <div className={`relative flex h-full flex-col overflow-hidden ${slide.bgClass}`}>
      {/* Skip */}
      <button
        onClick={completeOnboarding}
        className="absolute right-5 top-5 z-20 rounded-full bg-white/60 backdrop-blur-md px-4 py-1.5 text-[13px] font-semibold text-[#1a1a1a] active:scale-95"
      >
        Skip
      </button>

      {/* Slide visual + text */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="relative flex h-full flex-col px-8 pt-20"
          >
            {/* Visual area */}
            <div className="flex flex-1 items-center justify-center">
              <StoryVisual variant={slide.visual} />
            </div>

            {/* Text */}
            <div className="pb-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-block rounded-full bg-white/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a] mb-4"
              >
                {slide.eyebrow}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-[28px] font-bold leading-[1.15] tracking-tight text-[#1a1a1a] whitespace-pre-line"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-4 text-[15px] leading-relaxed text-[#4a4a4a]"
              >
                {slide.body}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination + CTA */}
      <div className="relative z-10 px-6 pb-10 pt-2">
        <div className="mb-5 flex items-center justify-center gap-2">
          {STORY_SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className="rounded-full"
              animate={{
                width: i === index ? 28 : 8,
                backgroundColor: i === index ? "#1a1a1a" : "rgba(0,0,0,0.15)",
              }}
              transition={{ duration: 0.3 }}
              style={{ height: 8 }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {index > 0 && (
            <button
              onClick={goBack}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/60 backdrop-blur-md text-[#1a1a1a] active:scale-95"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          <motion.button
            onClick={goNext}
            whileTap={{ scale: 0.97 }}
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#1a1a1a] text-[15px] font-semibold text-white active:scale-98"
          >
            {slide.cta}
            <ChevronRight size={18} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function StoryVisual({ variant }: { variant: string }) {
  if (variant === "problem") {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="relative"
      >
        {/* Plate with food being thrown */}
        <div className="relative h-48 w-48">
          {/* Plate */}
          <motion.div
            animate={{ rotate: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="h-40 w-40 rounded-full bg-white shadow-xl flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-[#f3efe9] flex items-center justify-center">
                <span className="text-6xl">🍽️</span>
              </div>
            </div>
          </motion.div>
          {/* Falling food pieces */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{ left: `${20 + i * 20}%`, top: "10%" }}
              animate={{ y: [0, 180], opacity: [1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeIn",
              }}
            >
              {["🍎", "🍞", "🥕", "🥛"][i]}
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (variant === "solution") {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="relative"
      >
        <div className="relative h-48 w-48">
          {/* Center plate */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 rounded-full bg-white shadow-xl flex items-center justify-center">
              <span className="text-5xl">🤝</span>
            </div>
          </div>
          {/* Orbiting icons */}
          {[0, 1, 2, 3].map((i) => {
            const angle = (i * 90 * Math.PI) / 180;
            const radius = 80;
            return (
              <motion.div
                key={i}
                className="absolute flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg"
                style={{
                  left: "50%",
                  top: "50%",
                  marginLeft: -24,
                  marginTop: -24,
                }}
                animate={{
                  x: Math.cos(angle + Date.now() / 1000) * radius,
                  y: Math.sin(angle + Date.now() / 1000) * radius,
                }}
                transition={{
                  duration: 0,
                }}
              >
                {["🏪", "❤️", "🚴", "👥"][i] && (
                  <span className="text-2xl">{["🏪", "❤️", "🚴", "👥"][i]}</span>
                )}
              </motion.div>
            );
          })}
          {/* Pulsing rings */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-[#047857]"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  // action
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="relative"
    >
      <div className="relative flex h-48 w-48 items-center justify-center">
        {/* Trophy/medal */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-xl"
        >
          <span className="text-6xl">🏆</span>
        </motion.div>
        {/* Confetti */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute text-xl"
            style={{ left: "50%", top: "50%" }}
            animate={{
              x: [0, Math.cos((i * 60 * Math.PI) / 180) * 80],
              y: [0, Math.sin((i * 60 * Math.PI) / 180) * 80],
              opacity: [1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          >
            {["✨", "🌱", "💚", "⭐", "🌿", "🍃"][i]}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
