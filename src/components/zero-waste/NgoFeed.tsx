"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown } from "./Countdown";
import {
  MapPin, Clock, Users, Flame, CheckCircle, Navigation, X,
  Building2, Home, Utensils, GraduationCap, CalendarDays, Settings,
  SlidersHorizontal,
} from "lucide-react";

const DONOR_ICONS: Record<string, any> = {
  "marriage-hall": Building2,
  restaurant: Utensils,
  hostel: GraduationCap,
  household: Home,
  event: CalendarDays,
};

// Radar positions for donations (calculated as if on a radar)
const RADAR_POSITIONS = [
  { x: 50, y: 20, angle: 0, distance: 0.8 },
  { x: 80, y: 35, angle: 45, distance: 1.2 },
  { x: 25, y: 45, angle: 135, distance: 2.0 },
  { x: 65, y: 65, angle: 90, distance: 0.5 },
  { x: 40, y: 80, angle: 180, distance: 3.4 },
];

export function NgoFeed() {
  const donations = useAppStore((s) => s.donations);
  const acceptDonation = useAppStore((s) => s.acceptDonation);
  const setScreen = useAppStore((s) => s.setScreen);
  const [activeDonation, setActiveDonation] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const listed = donations.filter((d) => d.status === "listed");

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#F7F5F0]">
      {/* Header — blue gradient */}
      <div
        className="relative overflow-hidden px-5 pb-5 pt-4"
        style={{
          background: "linear-gradient(180deg, #1a1a3e 0%, #1E3A8A 100%)",
          borderBottomLeftRadius: "32px",
          borderBottomRightRadius: "32px",
          flexShrink: 0,
        }}
      >
        {/* Live indicator */}
        <div className="absolute right-5 top-4 flex items-center gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-[#22C55E]"
          />
          <span className="text-[11px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
            LIVE
          </span>
        </div>

        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
              NSS Chapter
            </h1>
            <div className="mt-1 flex items-center gap-1.5">
              <CheckCircle size={14} className="text-[#22C55E]" />
              <span className="text-[12px] font-medium text-white" style={{ fontFamily: "var(--font-jakarta)" }}>
                Verified NGO
              </span>
            </div>
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
            <Settings size={20} className="text-white" />
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-5 flex items-center justify-around">
          {[
            { value: "24", label: "Meals Today" },
            { value: "8", label: "Volunteers" },
            { value: String(listed.length), label: "Pending" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[24px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                  {stat.value}
                </span>
                <span className="text-[11px] text-white/75" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {stat.label}
                </span>
              </div>
              {i < 2 && <div className="mx-3 h-8 w-px bg-white/20" />}
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        {/* Radar section */}
        <div className="px-5 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              Donations Near You
            </h2>
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{ background: "#F0F4FF", border: "1.5px solid #3B82F6" }}
            >
              <SlidersHorizontal size={14} className="text-[#1E3A8A]" />
              <span className="text-[13px] font-semibold text-[#1E3A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Filter
              </span>
            </button>
          </div>

          {/* Radar visualization */}
          <div
            className="relative overflow-hidden"
            style={{
              height: "280px",
              borderRadius: "24px",
              background: "#0A0A0A",
            }}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Radar rings — concentric */}
            {[80, 140, 200].map((size, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: "50%",
                  top: "50%",
                  marginLeft: -size / 2,
                  marginTop: -size / 2,
                  border: `1px solid rgba(59,130,246,${0.6 - i * 0.2})`,
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.3, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
              />
            ))}

            {/* Sweep line — rotating */}
            <motion.div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                width: "120px",
                height: "2px",
                transformOrigin: "left center",
                background: "linear-gradient(90deg, rgba(59,130,246,0.6), transparent)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Center dot — You */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex flex-col items-center">
                <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#3B82F6]" style={{ boxShadow: "0 0 12px rgba(59,130,246,0.6)" }} />
                <span className="absolute top-4 text-[9px] font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>
                  You
                </span>
              </div>
            </div>

            {/* Donor dots */}
            {listed.slice(0, 5).map((d, i) => {
              const pos = RADAR_POSITIONS[i % RADAR_POSITIONS.length];
              const Icon = DONOR_ICONS[d.donorType] ?? Building2;
              const hoursToExpiry = (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000;
              const isUrgent = hoursToExpiry < 2;
              const isActive = activeDonation === d.id;

              return (
                <motion.button
                  key={d.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 300, damping: 18 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setActiveDonation(d.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: isActive ? 20 : 10 }}
                >
                  {/* Pulse ring for urgent */}
                  {isUrgent && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(220,38,38,0.4)" }}
                      animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  {/* Dot */}
                  <div
                    className="relative flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white"
                    style={{
                      background: isUrgent ? "#DC2626" : isActive ? "#3B82F6" : "#22C55E",
                      boxShadow: isUrgent
                        ? "0 0 12px rgba(220,38,38,0.6)"
                        : "0 0 12px rgba(34,197,94,0.4)",
                    }}
                  >
                    <Icon size={14} className="text-white" />
                  </div>

                  {/* Tooltip when active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute left-1/2 top-full z-30 mt-2 w-44 -translate-x-1/2 rounded-2xl bg-white p-3"
                        style={{ boxShadow: "0px 8px 32px rgba(0,0,0,0.2)" }}
                      >
                        <p className="text-[12px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                          {d.donorName}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                          {d.title}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2 text-[10px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                          <span className="flex items-center gap-0.5 text-[#1E3A8A]">
                            <MapPin size={9} /> {d.pickupDistanceKm}km
                          </span>
                          <span className="flex items-center gap-0.5 text-[#DC2626]">
                            <Clock size={9} />
                            <Countdown deadline={d.expiryDeadline} variant="compact" />
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Donor list — horizontal pills */}
          <div className="-mx-5 mt-4 flex gap-2.5 overflow-x-auto px-5 pb-2">
            {listed.map((d) => {
              const Icon = DONOR_ICONS[d.donorType] ?? Building2;
              return (
                <motion.button
                  key={d.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveDonation(d.id)}
                  className="flex flex-shrink-0 items-center gap-2.5 rounded-full bg-white px-3 py-2.5"
                  style={{ boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, #1E3A8A, #3B82F6)" }}>
                    <Icon size={14} className="text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[13px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                      {d.donorName.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <span className="text-[10px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {d.pickupDistanceKm}km away
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Donation feed list */}
        <div className="mt-6 px-5">
          <h2 className="mb-3 text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            Active Requests
          </h2>
          <div className="flex flex-col gap-3">
            {listed.map((d, i) => {
              const Icon = DONOR_ICONS[d.donorType] ?? Building2;
              const hoursToExpiry = (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000;
              const isUrgent = hoursToExpiry < 1;
              const isWarning = hoursToExpiry < 2 && !isUrgent;
              const accentColor = isUrgent ? "#DC2626" : isWarning ? "#D97706" : "#22C55E";

              return (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="relative overflow-hidden bg-white"
                  style={{ borderRadius: "20px", boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)" }}
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 h-full w-1" style={{ background: accentColor }} />

                  <div className="p-4 pl-5">
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `${accentColor}15` }}>
                          <Icon size={18} style={{ color: accentColor }} />
                        </div>
                        <div>
                          <h3 className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                            {d.donorName}
                          </h3>
                          <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: accentColor, fontFamily: "var(--font-jakarta)" }}>
                            {d.donorType.replace("-", " ")}
                          </span>
                        </div>
                      </div>
                      {isUrgent && (
                        <div className="flex items-center gap-1 rounded-full bg-[#DC2626] px-2 py-0.5">
                          <Flame size={10} className="text-white" />
                          <span className="text-[10px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                            URGENT
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Meta row */}
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-[13px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      <span className="flex items-center gap-1 text-[#4A4A4A]">
                        <MapPin size={13} className="text-[#8A8A8A]" />
                        {d.pickupDistanceKm} km
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[#1E3A8A]">
                        <Users size={13} />
                        ~{d.servings} servings
                      </span>
                      <span className="flex items-center gap-1 font-semibold" style={{ color: accentColor }}>
                        <Clock size={13} />
                        <Countdown deadline={d.expiryDeadline} variant="compact" />
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex gap-2.5">
                      <button className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full border-[1.5px] border-[#E8E8E4] text-[13px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                        <Navigation size={14} />
                        Navigate
                      </button>
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => acceptDonation(d.id)}
                        className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold text-white"
                        style={{
                          background: "linear-gradient(135deg, #1E3A8A, #1a1a3e)",
                          boxShadow: "0px 8px 24px rgba(30,58,138,0.25)",
                          fontFamily: "var(--font-outfit)",
                        }}
                      >
                        <CheckCircle size={14} />
                        Accept
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Filter bottom sheet */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="absolute inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.4)" }}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="absolute inset-x-0 bottom-0 z-50 bg-white p-5"
              style={{ borderRadius: "28px 28px 0 0", boxShadow: "0px -8px 32px rgba(0,0,0,0.1)" }}
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#E8E8E4]" />
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Filter Donations
                </h3>
                <button onClick={() => setShowFilters(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F7]">
                  <X size={16} className="text-[#0A0A0A]" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                    Food Type
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Cooked Meals", "Raw Groceries", "Bakery", "Dairy", "Beverages", "Packaged"].map((type) => (
                      <button key={type} className="rounded-full px-3 py-1.5 text-[13px] font-semibold" style={{ background: "#F5F5F7", color: "#4A4A4A", fontFamily: "var(--font-jakarta)" }}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                      Distance
                    </label>
                    <span className="text-[13px] font-bold text-[#1E3A8A]" style={{ fontFamily: "var(--font-outfit)" }}>
                      5km
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-[#E8E8E4]">
                    <div className="h-full w-1/2 rounded-full bg-[#1E3A8A]" />
                  </div>
                </div>

                <div>
                  <label className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                    Urgency
                  </label>
                  <div className="mt-2 flex gap-2">
                    {["All", "Urgent", "Normal"].map((u, i) => (
                      <button key={u} className="rounded-full px-4 py-1.5 text-[13px] font-semibold" style={{ background: i === 0 ? "#1E3A8A" : "#F5F5F7", color: i === 0 ? "#FFFFFF" : "#4A4A4A", fontFamily: "var(--font-jakarta)" }}>
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="mt-6 flex h-13 w-full items-center justify-center rounded-full py-3.5 text-[17px] font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #1E3A8A, #1a1a3e)", boxShadow: "0px 8px 24px rgba(30,58,138,0.25)", fontFamily: "var(--font-outfit)" }}
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
