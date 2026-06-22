"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown } from "./Countdown";
import {
  Bike,
  MapPin,
  Navigation,
  Star,
  Zap,
  CircleDollarSign,
  Clock,
  Package,
  Sparkles,
  TrendingUp,
  Trophy,
} from "lucide-react";

const displayFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

export function VolunteerMap() {
  const [online, setOnline] = useState(true);
  const [activePickup, setActivePickup] = useState<string | null>("d3");
  const donations = useAppStore((s) => s.donations);
  const listed = donations.filter((d) => d.status === "listed");
  const activeDonation = donations.find((d) => d.id === activePickup);

  return (
    <div className="flex h-full flex-col bg-[#FCFCF9]">
      {/* Top bar */}
      <div className="bg-white px-5 pb-4 pt-5" style={{ boxShadow: "0 2px 12px rgba(17, 24, 39, 0.04)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-[24px] font-bold tracking-tight text-[#111827]"
              style={{ fontFamily: displayFont }}
            >
              Volunteer Hub
            </h1>
            <p className="text-[11px] text-[#64748b]">
              You're {online ? "online" : "offline"} · 5km radius
            </p>
          </div>
          <button
            onClick={() => setOnline(!online)}
            className={`ios-switch ${online ? "on" : ""}`}
            aria-label="Toggle online"
          />
        </div>

        {/* Earnings strip */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <VolStat
            icon={<TrendingUp size={12} />}
            label="Today"
            value="12"
            sub="pickups"
            bg="#f0fdf4"
            color="#16A34A"
          />
          <VolStat
            icon={<CircleDollarSign size={12} />}
            label="Earned"
            value="₹240"
            sub="today"
            bg="#fffbeb"
            color="#f59e0b"
          />
          <VolStat
            icon={<Trophy size={12} />}
            label="Points"
            value="+360"
            sub="today"
            bg="#fdf2f8"
            color="#ec4899"
          />
        </div>
      </div>

      {/* Map area */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0 bg-[#f1f5f9]"
          style={{
            backgroundImage:
              "linear-gradient(0deg, #e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M 0 100 L 100% 100" stroke="#ffffff" strokeWidth="14" />
          <path d="M 0 280 L 100% 280" stroke="#ffffff" strokeWidth="12" />
          <path d="M 90 0 L 90 100%" stroke="#ffffff" strokeWidth="14" />
          <path d="M 260 0 L 260 100%" stroke="#ffffff" strokeWidth="10" />
          {activeDonation && (
            <motion.path
              d="M 180 320 L 180 280 L 90 280 L 90 200 L 60 180"
              stroke="#16A34A"
              strokeWidth="3"
              fill="none"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </svg>

        {/* Volunteer location */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#111827] ring-4 ring-white"
            style={{ boxShadow: "0 4px 12px rgba(17, 24, 39, 0.2)" }}
          >
            <Bike size={20} className="text-white" />
          </motion.div>
          <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#111827] px-2 py-0.5 text-[9px] font-bold text-white">
            You
          </div>
        </div>

        {/* Donation pins */}
        {listed.map((d, i) => {
          const positions = [
            { left: "18%", top: "20%" },
            { left: "62%", top: "15%" },
            { left: "30%", top: "55%" },
            { left: "70%", top: "50%" },
            { left: "45%", top: "75%" },
          ];
          const pos = positions[i % positions.length];
          const isActive = d.id === activePickup;
          const hoursToExpiry =
            (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000;
          const isUrgent = hoursToExpiry < 2;

          return (
            <motion.button
              key={d.id}
              initial={{ y: -30, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
              whileTap={{ scale: 0.85 }}
              onClick={() => setActivePickup(d.id)}
              style={{ left: pos.left, top: pos.top }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 ${isActive ? "z-20" : "z-10"}`}
            >
              <div
                className={`relative flex items-center justify-center rounded-full ring-4 ring-white transition-all ${
                  isActive
                    ? "h-12 w-12 bg-[#f59e0b]"
                    : isUrgent
                      ? "zw-urgency-pulse h-9 w-9 bg-[#ef4444]"
                      : "h-9 w-9 bg-[#16A34A]"
                }`}
                style={{ boxShadow: "0 4px 12px rgba(17, 24, 39, 0.15)" }}
              >
                <Package
                  size={isActive ? 18 : 14}
                  className="text-white"
                />
              </div>
              {isActive && (
                <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#f59e0b] px-2 py-0.5 text-[9px] font-bold text-white">
                  {d.servings} servings · {d.pickupDistanceKm}km
                </div>
              )}
            </motion.button>
          );
        })}

        {/* Bottom card */}
        <div className="absolute inset-x-0 bottom-0 z-30">
          <AnimatePresence mode="wait">
            {activeDonation ? (
              <motion.div
                key={activeDonation.id}
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                exit={{ y: 200 }}
                transition={{ type: "spring", stiffness: 400, damping: 36 }}
                className="bg-white p-5"
                style={{
                  borderRadius: "32px 32px 0 0",
                  boxShadow: "0 -8px 32px rgba(17, 24, 39, 0.12)",
                }}
              >
                <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#e2e8f0]" />

                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${activeDonation.imageColor}`}
                  >
                    <Package size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3
                        className="text-[14px] font-bold text-[#111827]"
                        style={{ fontFamily: displayFont }}
                      >
                        {activeDonation.donorName}
                      </h3>
                      <span className="rounded-full bg-[#f0fdf4] px-1.5 py-0.5 text-[9px] font-bold text-[#16A34A]">
                        AI {activeDonation.aiMatchScore}%
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748b] line-clamp-1">
                      {activeDonation.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-[#94a3b8]">
                      <span className="flex items-center gap-1">
                        <MapPin size={9} /> {activeDonation.pickupDistanceKm}km
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={9} /> expires{" "}
                        <Countdown
                          deadline={activeDonation.expiryDeadline}
                          variant="compact"
                        />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-2xl bg-[#f0fdf4] p-2.5">
                    <div
                      className="text-sm font-bold text-[#16A34A]"
                      style={{ fontFamily: displayFont }}
                    >
                      {activeDonation.servings}
                    </div>
                    <div className="text-[9px] text-[#64748b]">Meals</div>
                  </div>
                  <div className="rounded-2xl bg-[#fffbeb] p-2.5">
                    <div
                      className="text-sm font-bold text-[#f59e0b]"
                      style={{ fontFamily: displayFont }}
                    >
                      +{activeDonation.servings * 3}
                    </div>
                    <div className="text-[9px] text-[#64748b]">Points</div>
                  </div>
                  <div className="rounded-2xl bg-[#eff6ff] p-2.5">
                    <div
                      className="text-sm font-bold text-[#3b82f6]"
                      style={{ fontFamily: displayFont }}
                    >
                      ₹{Math.round(activeDonation.pickupDistanceKm * 12)}
                    </div>
                    <div className="text-[9px] text-[#64748b]">Earning</div>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button className="flex h-11 flex-1 items-center justify-center gap-1.5 bg-[#f1f5f9] text-[13px] font-semibold text-[#64748b]" style={{ borderRadius: 22 }}>
                    <Navigation size={14} />
                    Navigate
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="flex h-11 flex-1 items-center justify-center gap-1.5 text-[13px] font-semibold text-white"
                    style={{
                      borderRadius: 22,
                      background: "linear-gradient(135deg, #16a34a, #15803d)",
                      boxShadow: "0 4px 12px rgba(22, 163, 74, 0.25)",
                    }}
                  >
                    <Zap size={14} />
                    Accept Pickup
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                exit={{ y: 200 }}
                className="bg-white p-5"
                style={{
                  borderRadius: "32px 32px 0 0",
                  boxShadow: "0 -8px 32px rgba(17, 24, 39, 0.12)",
                }}
              >
                <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-[#e2e8f0]" />
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#16A34A]" />
                  <span
                    className="text-[12px] font-semibold text-[#111827]"
                    style={{ fontFamily: displayFont }}
                  >
                    Tap a pin to see pickup details
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#64748b]">
                  {listed.length} donations available within 5km
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function VolStat({
  icon,
  label,
  value,
  sub,
  bg,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  bg: string;
  color: string;
}) {
  return (
    <div
      className="flex flex-col items-start p-3.5"
      style={{
        borderRadius: 22,
        background: bg,
      }}
    >
      <div className="flex items-center gap-1" style={{ color }}>
        {icon}
        <span className="text-[10px] font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div
        className="mt-1 text-base font-bold text-[#111827]"
        style={{ fontFamily: displayFont }}
      >
        {value}
      </div>
      <div className="text-[9px] text-[#64748b]">{sub}</div>
    </div>
  );
}
