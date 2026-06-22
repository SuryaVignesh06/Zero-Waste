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

export function RoleSelect() {
  const setRole = useAppStore((s) => s.setRole);

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#f5f1ed]">
      <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
        <div className="px-6 pb-6 pt-14">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 4px 12px rgba(4, 120, 87, 0.3)" }}>
              <Recycle size={22} className="text-white" strokeWidth={2.4} />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1a1a1a]">Zero-Waste</span>
          </motion.div>

          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }} className="mt-7 text-[30px] font-bold leading-[1.15] tracking-tight text-[#1a1a1a]">
            Food should nourish
            <br />
            people,{" "}
            <span style={{ background: "linear-gradient(135deg, #047857, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              not landfills.
            </span>
          </motion.h1>

          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="mt-3 text-[14px] leading-relaxed text-[#4a4a4a]">
            Choose how you want to be part of the ecosystem.
          </motion.p>
        </div>

        <div className="px-5 pb-6">
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
                  style={{ borderRadius: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent}`} style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    <Icon size={22} className="text-white" strokeWidth={2.4} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-bold tracking-tight text-[#1a1a1a]">{card.title}</h3>
                  <p className="mt-1 text-[11px] leading-snug text-[#4a4a4a]">{card.description}</p>
                  <div className="mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ecfdf5] transition-all group-hover:bg-[#d1fae5]">
                    <ChevronRight size={12} className="text-[#047857] transition-all group-hover:translate-x-0.5" strokeWidth={3} />
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.4 }} className="mt-5 grid grid-cols-3 gap-2 bg-white p-5" style={{ borderRadius: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
            <Stat value="1.2k" label="Meals saved" />
            <div className="border-x border-[#f3efe9]" />
            <Stat value="482kg" label="CO2 reduced" />
            <div className="border-x border-[#f3efe9]" />
            <Stat value="34" label="Active rescues" />
          </motion.div>

          <p className="mt-5 text-center text-[11px] text-[#8e8e93]">By continuing you agree to our Terms & Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-base font-bold text-[#047857]">{value}</span>
      <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-[#4a4a4a]">{label}</span>
    </div>
  );
}
