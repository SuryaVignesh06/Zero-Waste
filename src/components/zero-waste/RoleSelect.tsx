"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { User, Building2, ArrowUpRight, CheckCircle } from "lucide-react";

const ROLES = [
  {
    id: "user" as const,
    title: "Normal User",
    desc: "Buy affordable groceries, donate surplus food, and volunteer to make a difference.",
    bg: "#C8E8D0",
    iconBg: "#1A6B3C",
    accent: "#1A6B3C",
    tags: ["Buy Groceries", "Donate Food", "Volunteer"],
  },
  {
    id: "ngo" as const,
    title: "NGO / Organization",
    desc: "Receive food donations, coordinate pickups, manage volunteers, and track distribution.",
    bg: "#C8D8F0",
    iconBg: "#1E3A8A",
    accent: "#1E3A8A",
    tags: ["Receive Donations", "Manage Volunteers", "Track Impact"],
  },
];

const STATS = [
  { value: "2.4M+", label: "Meals Rescued" },
  { value: "847", label: "Active Rescues" },
  { value: "1.2T", label: "CO₂ Reduced" },
];

export function RoleSelect() {
  const setRole = useAppStore((s) => s.setRole);

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#F7F5F0]">
      <main style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        <div className="px-6 pt-16 pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[30px] font-bold text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            How will you use Zero-Waste?
          </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2.5 text-[15px] text-[#4A4A4A]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Select your role to personalize your experience.
        </motion.p>
      </div>

      {/* Role cards */}
      <div className="flex flex-col gap-4 px-6">
        {ROLES.map((role, i) => {
          const Icon = role.id === "user" ? User : Building2;
          return (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setRole(role.id)}
              className="relative overflow-hidden p-7 text-left"
              style={{
                borderRadius: "24px",
                background: role.bg,
                boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)",
                minHeight: "180px",
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[14px]"
                  style={{ background: role.iconBg }}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: "rgba(255,255,255,0.7)" }}
                >
                  <ArrowUpRight size={16} style={{ color: role.accent }} />
                </div>
              </div>

              {/* Title */}
              <h3
                className="mt-5 text-[22px] font-bold text-[#0A0A0A]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {role.title}
              </h3>

              {/* Description */}
              <p
                className="mt-2 text-[14px] leading-[1.5] text-[#4A4A4A]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {role.desc}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-[11px] font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      color: role.accent,
                      fontFamily: "var(--font-jakarta)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mx-6 mt-10 mb-8 flex items-center justify-around rounded-[20px] bg-white p-5"
        style={{ boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)" }}
      >
        {STATS.map((stat, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-[22px] font-bold text-[#0A0A0A]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {stat.value}
              </motion.span>
              <span
                className="text-[11px] font-medium text-[#8A8A8A]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {stat.label}
              </span>
            </div>
            {i < STATS.length - 1 && (
              <div className="mx-4 h-8 w-px bg-[#E8E8E4]" />
            )}
          </div>
        ))}
      </motion.div>
      </main>
    </div>
  );
}
