"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ROLE_CARDS } from "@/lib/mock-data";
import {
  ShoppingBag,
  Store,
  HeartHandshake,
  Bike,
  ChevronRight,
  Recycle,
} from "lucide-react";

const ICONS: Record<string, any> = {
  ShoppingBag,
  Store,
  HeartHandshake,
  Bike,
};

const displayFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

export function RoleSelect() {
  const setRole = useAppStore((s) => s.setRole);

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#FCFCF9]">
      {/* Decorative soft blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full"
        style={{
          background: "radial-gradient(circle, #86efac 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full"
        style={{
          background: "radial-gradient(circle, #f9a8d4 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="px-6 pb-6 pt-14">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #16a34a, #15803d)",
                boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
              }}
            >
              <Recycle size={22} className="text-white" strokeWidth={2.4} />
            </div>
            <span
              className="text-xl font-bold tracking-tight text-[#111827]"
              style={{ fontFamily: displayFont }}
            >
              Zero-Waste
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-7 text-[30px] font-bold leading-[1.15] tracking-tight text-[#111827]"
            style={{ fontFamily: displayFont }}
          >
            Food should nourish
            <br />
            people,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #16a34a, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              not landfills.
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-3 text-[14px] leading-relaxed text-[#64748b]"
          >
            Choose how you want to be part of the ecosystem.
          </motion.p>
        </div>

        {/* Role cards */}
        <div className="flex-1 overflow-y-auto zw-scroll px-5 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {ROLE_CARDS.map((card, i) => {
              const Icon = ICONS[card.icon] ?? ShoppingBag;
              return (
                <motion.button
                  key={card.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.3, duration: 0.4 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setRole(card.role)}
                  className="group relative flex flex-col items-start bg-white p-5 text-left active:scale-96"
                  style={{
                    borderRadius: 32,
                    boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)",
                  }}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent}`}
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  >
                    <Icon size={22} className="text-white" strokeWidth={2.4} />
                  </div>
                  <h3
                    className="mt-4 text-[15px] font-bold tracking-tight text-[#111827]"
                    style={{ fontFamily: displayFont }}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-snug text-[#64748b]">
                    {card.description}
                  </p>
                  <div className="mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#f0fdf4] transition-all group-hover:bg-[#dcfce7]">
                    <ChevronRight
                      size={12}
                      className="text-[#16A34A] transition-all group-hover:translate-x-0.5"
                      strokeWidth={3}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Stats strip — large rounded card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="mt-5 grid grid-cols-3 gap-2 bg-white p-5"
            style={{
              borderRadius: 32,
              boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)",
            }}
          >
            <Stat value="1.2k" label="Meals saved" />
            <div className="border-x border-[#f1f5f9]" />
            <Stat value="482kg" label="CO2 reduced" />
            <div className="border-x border-[#f1f5f9]" />
            <Stat value="34" label="Active rescues" />
          </motion.div>

          <p className="mt-5 text-center text-[11px] text-[#94a3b8]">
            By continuing you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="text-base font-bold text-[#16A34A]"
        style={{ fontFamily: displayFont }}
      >
        {value}
      </span>
      <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-[#64748b]">
        {label}
      </span>
    </div>
  );
}
