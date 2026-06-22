"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown } from "./Countdown";
import {
  MapPin,
  Users,
  Clock,
  Flame,
  Map as MapIcon,
  List,
  Sparkles,
  Check,
  X,
  HeartHandshake,
  Building2,
  Home,
  Utensils,
  GraduationCap,
  CalendarDays,
  TrendingUp,
  Package,
} from "lucide-react";

const displayFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const DONOR_ICONS: Record<string, any> = {
  "marriage-hall": Building2,
  restaurant: Utensils,
  hostel: GraduationCap,
  household: Home,
  event: CalendarDays,
};

export function NgoFeed() {
  const donations = useAppStore((s) => s.donations);
  const acceptDonation = useAppStore((s) => s.acceptDonation);
  const [view, setView] = useState<"list" | "map">("list");

  const listed = donations.filter((d) => d.status === "listed");

  return (
    <div className="flex h-full flex-col bg-[#FCFCF9]">
      {/* Header */}
      <div className="bg-white px-5 pb-4 pt-5" style={{ boxShadow: "0 2px 12px rgba(17, 24, 39, 0.04)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-[24px] font-bold tracking-tight text-[#111827]"
              style={{ fontFamily: displayFont }}
            >
              Rescue Feed
            </h1>
            <p className="text-[11px] text-[#64748b]">
              {listed.length} surplus donations waiting
            </p>
          </div>
          <div className="flex rounded-full bg-[#f1f5f9] p-1">
            <button
              onClick={() => setView("list")}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all"
              style={{
                background: view === "list"
                  ? "linear-gradient(135deg, #16a34a, #15803d)"
                  : "transparent",
                color: view === "list" ? "#ffffff" : "#64748b",
              }}
            >
              <List size={13} />
              List
            </button>
            <button
              onClick={() => setView("map")}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all"
              style={{
                background: view === "map"
                  ? "linear-gradient(135deg, #16a34a, #15803d)"
                  : "transparent",
                color: view === "map" ? "#ffffff" : "#64748b",
              }}
            >
              <MapIcon size={13} />
              Map
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <NgoStat
            value={String(listed.length)}
            label="Incoming"
            color="#16A34A"
            bg="#f0fdf4"
          />
          <NgoStat
            value="2"
            label="Urgent"
            color="#ef4444"
            bg="#fef2f2"
          />
          <NgoStat
            value="148"
            label="Served"
            color="#3b82f6"
            bg="#eff6ff"
          />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto zw-scroll pb-32">
        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 px-5 py-4"
            >
              {listed.map((d, i) => {
                const Icon = DONOR_ICONS[d.donorType] ?? Building2;
                const hoursToExpiry =
                  (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000;
                const isUrgent = hoursToExpiry < 2;

                return (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="overflow-hidden bg-white"
                    style={{
                      borderRadius: 32,
                      boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)",
                    }}
                  >
                    {/* Image strip */}
                    <div
                      className={`relative h-20 w-full overflow-hidden bg-gradient-to-br ${d.imageColor}`}
                      style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
                    >
                      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1" style={{ boxShadow: "0 2px 8px rgba(17, 24, 39, 0.1)" }}>
                        <Icon size={11} className="text-[#16A34A]" />
                        <span className="text-[10px] font-bold uppercase tracking-wide text-[#16A34A]">
                          {d.donorType.replace("-", " ")}
                        </span>
                      </div>
                      {isUrgent && (
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#ef4444] px-2.5 py-1">
                          <Flame size={10} className="text-white" />
                          <span className="text-[10px] font-bold uppercase text-white">
                            Urgent
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-2 right-3 flex items-center gap-1 rounded-full bg-[#111827]/90 px-2 py-0.5">
                        <Users size={10} className="text-white" />
                        <span className="text-[10px] font-bold text-white">
                          {d.servings} servings
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <h3
                        className="text-[15px] font-bold tracking-tight text-[#111827]"
                        style={{ fontFamily: displayFont }}
                      >
                        {d.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[12px] text-[#64748b]">
                        {d.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#64748b]">
                        <div className="flex items-center gap-1">
                          <MapPin size={11} />
                          <span>{d.pickupDistanceKm}km away</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={11} />
                          <span>Pickup: 2 hrs</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles size={11} className="text-[#3b82f6]" />
                          <span>AI fresh: {Math.round(d.aiFreshnessScore * 100)}%</span>
                        </div>
                      </div>

                      {d.aiMatchScore && (
                        <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#eff6ff] p-3">
                          <div className="flex items-center gap-2">
                            <Sparkles size={13} className="text-[#3b82f6]" />
                            <span
                              className="text-[11px] font-bold text-[#111827]"
                              style={{ fontFamily: displayFont }}
                            >
                              AI Match Score
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#bfdbfe]">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${d.aiMatchScore}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-full bg-[#3b82f6]"
                              />
                            </div>
                            <span
                              className="text-[11px] font-bold text-[#3b82f6]"
                              style={{ fontFamily: displayFont }}
                            >
                              {d.aiMatchScore}%
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-medium uppercase tracking-wide text-[#94a3b8]">
                            Expires in
                          </span>
                          <Countdown
                            deadline={d.expiryDeadline}
                            variant="compact"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fef2f2] text-[#ef4444] active:scale-90">
                            <X size={16} />
                          </button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => acceptDonation(d.id)}
                            className="flex h-10 items-center gap-1.5 px-4 text-[12px] font-semibold text-white"
                            style={{
                              borderRadius: 22,
                              background: "linear-gradient(135deg, #16a34a, #15803d)",
                              boxShadow: "0 4px 12px rgba(22, 163, 74, 0.25)",
                            }}
                          >
                            <Check size={14} strokeWidth={3} />
                            Accept
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {listed.length === 0 && (
                <div className="mt-20 flex flex-col items-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f0fdf4]">
                    <HeartHandshake size={32} className="text-[#16A34A]" />
                  </div>
                  <p
                    className="mt-4 text-base font-bold text-[#111827]"
                    style={{ fontFamily: displayFont }}
                  >
                    All caught up!
                  </p>
                  <p className="text-[12px] text-[#64748b]">
                    No active donations in your area
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full"
            >
              <div
                className="relative h-[450px] bg-[#f1f5f9]"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, #e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              >
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  <path d="M 0 80 L 100% 80" stroke="#ffffff" strokeWidth="14" />
                  <path d="M 0 200 L 100% 200" stroke="#ffffff" strokeWidth="10" />
                  <path d="M 0 350 L 100% 350" stroke="#ffffff" strokeWidth="12" />
                  <path d="M 80 0 L 80 100%" stroke="#ffffff" strokeWidth="14" />
                  <path d="M 240 0 L 240 100%" stroke="#ffffff" strokeWidth="10" />
                </svg>

                {listed.map((d, i) => {
                  const positions = [
                    { left: "15%", top: "20%" },
                    { left: "65%", top: "15%" },
                    { left: "30%", top: "55%" },
                    { left: "70%", top: "60%" },
                    { left: "45%", top: "80%" },
                  ];
                  const pos = positions[i % positions.length];
                  const hoursToExpiry =
                    (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000;
                  const isUrgent = hoursToExpiry < 2;
                  const isWarning = hoursToExpiry < 4 && !isUrgent;

                  return (
                    <motion.button
                      key={d.id}
                      initial={{ y: -40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                      whileTap={{ scale: 0.9 }}
                      style={{ left: pos.left, top: pos.top }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                      <div
                        className={`relative flex items-center justify-center rounded-full p-2 ring-4 ring-white ${
                          isUrgent
                            ? "zw-urgency-pulse bg-[#ef4444]"
                            : isWarning
                              ? "zw-urgency-pulse-amber bg-[#f59e0b]"
                              : "bg-[#16A34A]"
                        }`}
                        style={{ boxShadow: "0 4px 12px rgba(17, 24, 39, 0.15)" }}
                      >
                        <Utensils size={14} className="text-white" />
                      </div>
                      <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-1.5 py-0.5 text-[9px] font-bold text-[#111827]" style={{ boxShadow: "0 2px 8px rgba(17, 24, 39, 0.1)" }}>
                        {d.servings} servings
                      </div>
                    </motion.button>
                  );
                })}

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="zw-aura relative flex h-12 w-12 items-center justify-center rounded-full bg-[#111827] ring-4 ring-white" style={{ boxShadow: "0 4px 12px rgba(17, 24, 39, 0.2)" }}>
                    <HeartHandshake size={20} className="text-white" />
                  </div>
                  <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#111827] px-2 py-0.5 text-[9px] font-bold text-white">
                    You
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-white p-5" style={{ borderRadius: "32px 32px 0 0", boxShadow: "0 -8px 32px rgba(17, 24, 39, 0.1)" }}>
                <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-[#e2e8f0]" />
                <h3
                  className="text-sm font-bold text-[#111827]"
                  style={{ fontFamily: displayFont }}
                >
                  {listed.length} donations around you
                </h3>
                <p className="text-[11px] text-[#64748b]">
                  Tap a pin to see details. Color indicates urgency.
                </p>
                <div className="mt-3 flex gap-3 text-[11px]">
                  <div className="flex items-center gap-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" />
                    <span className="text-[#64748b]">Safe (4h+)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                    <span className="text-[#64748b]">Soon (2-4h)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                    <span className="text-[#64748b]">Urgent (&lt;2h)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NgoStat({
  value,
  label,
  color,
  bg,
}: {
  value: string;
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <div
      className="flex flex-col items-start p-3.5"
      style={{
        borderRadius: 22,
        background: bg,
      }}
    >
      <div
        className="text-lg font-bold"
        style={{ fontFamily: displayFont, color }}
      >
        {value}
      </div>
      <div className="text-[10px] text-[#64748b]">{label}</div>
    </div>
  );
}
