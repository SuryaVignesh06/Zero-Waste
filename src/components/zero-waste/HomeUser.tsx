"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { staggerContainer, cardVariants } from "@/lib/animations";
import { Countdown, formatINR } from "./Countdown";
import {
  MapPin, Search, Bell, ArrowUpRight, Camera, ChevronRight, Flame,
} from "lucide-react";

export function HomeUser() {
  const products = useAppStore((s) => s.products);
  const donations = useAppStore((s) => s.donations);
  const setScreen = useAppStore((s) => s.setScreen);
  const setActiveProduct = useAppStore((s) => s.setActiveProduct);
  const addToCart = useAppStore((s) => s.addToCart);

  const rescueDonations = donations.filter((d) => d.status === "listed").slice(0, 5);
  const topDeals = products.slice(0, 6);

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#F7F5F0]">
      {/* Sticky header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          background: "rgba(247,245,240,0.92)",
          backdropFilter: "blur(16px)",
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-2.5">
          {/* Diamond logo */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="8" y="8" width="16" height="16" rx="4" transform="rotate(45 16 16)" fill="#1A6B3C" />
            <path d="M16 11 L19 16 L16 21 L13 16 Z" fill="white" />
          </svg>
          <span className="text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            Zero Waste
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScreen("marketplace")}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white"
            style={{ boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)" }}
          >
            <Search size={20} className="text-[#0A0A0A]" />
          </button>
          <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white" style={{ boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)" }}>
            <Bell size={20} className="text-[#0A0A0A]" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#DC2626]" style={{ animation: "pulse-ring-anim 2s ease-out infinite" }} />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        {/* Location + greeting */}
        <div className="px-5 pt-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5"
          >
            <MapPin size={16} className="text-[#1A6B3C]" />
            <span className="text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Koramangala, Bangalore
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-2 text-[24px] font-bold text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Good morning, Arjun
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-1 text-[13px] text-[#1A6B3C]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            <b>3</b> food rescues available near you
          </motion.p>
        </div>

        {/* Impact grid 2×2 */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mt-5 grid grid-cols-2 gap-3 px-5"
        >
          {/* Card 1 — My Impact (pastel blue) */}
          <motion.button
            variants={cardVariants}
            whileTap={{ scale: 0.98 }}
            onClick={() => setScreen("impact")}
            className="relative overflow-hidden p-5 text-left"
            style={{ borderRadius: "24px", background: "#C8D8F0", minHeight: "160px" }}
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1E3A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                My Impact
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.7)" }}>
                <ArrowUpRight size={16} className="text-[#1E3A8A]" />
              </div>
            </div>
            <div className="mt-5 text-[40px] font-extrabold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              248
            </div>
            <div className="mt-1 text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Meals Saved
            </div>
            <div className="mt-2 text-[11px] text-[#1E3A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              +12 this week
            </div>
            {/* Decoration circle */}
            <div className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full" style={{ background: "rgba(30,58,138,0.08)" }} />
          </motion.button>

          {/* Card 2 — CO2 Reduced (pastel yellow) */}
          <motion.div
            variants={cardVariants}
            className="relative overflow-hidden p-5"
            style={{ borderRadius: "24px", background: "#F5E6C8", minHeight: "160px" }}
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D97706]" style={{ fontFamily: "var(--font-jakarta)" }}>
                CO₂ Reduced
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.7)" }}>
                <ArrowUpRight size={16} className="text-[#D97706]" />
              </div>
            </div>
            <div className="mt-5 text-[40px] font-extrabold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              18.4
            </div>
            <div className="mt-1 text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              kg CO₂ Saved
            </div>
            <div className="mt-2 text-[11px] text-[#D97706]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Environmental impact
            </div>
            <div className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full" style={{ background: "rgba(217,119,6,0.08)" }} />
          </motion.div>

          {/* Card 3 — Money Saved (pastel green) */}
          <motion.div
            variants={cardVariants}
            className="relative overflow-hidden p-5"
            style={{ borderRadius: "24px", background: "#C8E8D0", minHeight: "160px" }}
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Money Saved
              </span>
            </div>
            <div className="mt-5 text-[36px] font-extrabold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              ₹1,240
            </div>
            <div className="mt-1 text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Saved on Groceries
            </div>
            <div className="mt-2 text-[11px] text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
              vs retail prices
            </div>
            <div className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full" style={{ background: "rgba(26,107,60,0.08)" }} />
          </motion.div>

          {/* Card 4 — Donate Food (pastel clay) */}
          <motion.button
            variants={cardVariants}
            whileTap={{ scale: 0.98 }}
            onClick={() => setScreen("donate")}
            className="relative overflow-hidden p-5 text-left"
            style={{ borderRadius: "24px", background: "#F0D8C8", minHeight: "160px" }}
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C25A2A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Donate
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.7)" }}>
                <ArrowUpRight size={16} className="text-[#C25A2A]" />
              </div>
            </div>
            <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(194,90,42,0.15)" }}>
              <Camera size={20} className="text-[#C25A2A]" />
            </div>
            <div className="mt-3 text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              Donate Food
            </div>
            <div className="mt-1 text-[12px] text-[#6A4A3A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              List surplus food for rescue
            </div>
            <div className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full" style={{ background: "rgba(194,90,42,0.08)" }} />
          </motion.button>
        </motion.div>

        {/* Nearby Rescues */}
        <div className="mt-7 px-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              Nearby Rescues
            </h2>
            <button onClick={() => setScreen("ngo-feed")} className="flex items-center gap-1 text-[13px] font-medium text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
              View all <ChevronRight size={14} />
            </button>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2"
          >
            {rescueDonations.map((d) => {
              const hoursToExpiry = (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000;
              const isUrgent = hoursToExpiry < 2;
              return (
                <motion.div
                  key={d.id}
                  variants={cardVariants}
                  className="flex-shrink-0 overflow-hidden bg-white"
                  style={{ width: "200px", borderRadius: "20px", boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)" }}
                >
                  {/* Image area */}
                  <div className={`relative flex h-[110px] items-center justify-center bg-gradient-to-br ${d.imageColor}`}>
                    <span className="text-4xl font-bold text-white/80">{d.donorName.charAt(0)}</span>
                    {/* Urgency badge */}
                    <div
                      className="absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                      style={{ background: isUrgent ? "#DC2626" : "#D97706", fontFamily: "var(--font-outfit)" }}
                    >
                      {isUrgent ? "URGENT" : `${Math.round(hoursToExpiry)}h left`}
                    </div>
                    {/* Distance badge */}
                    <div
                      className="absolute right-2 top-2 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
                      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", fontFamily: "var(--font-jakarta)" }}
                    >
                      {d.pickupDistanceKm} km
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-3.5">
                    <h4 className="line-clamp-2 text-[14px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                      {d.title}
                    </h4>
                    <p className="mt-1 text-[12px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {d.donorName}
                    </p>
                    <p className="mt-1 text-[12px] font-semibold text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      ~{d.servings} servings
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Claim Rescue
                      </span>
                      <ChevronRight size={14} className="text-[#1A6B3C]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Marketplace Deals */}
        <div className="mt-7 px-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              Deals Near You
            </h2>
            <button onClick={() => setScreen("marketplace")} className="flex items-center gap-1 text-[13px] font-medium text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>
              See all <ChevronRight size={14} />
            </button>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2"
          >
            {topDeals.map((p) => {
              const discountPct = Math.round(((p.originalPrice - p.discountedPrice) / p.originalPrice) * 100);
              return (
                <motion.div
                  key={p.id}
                  variants={cardVariants}
                  onClick={() => setActiveProduct(p)}
                  className="flex-shrink-0 overflow-hidden bg-white"
                  style={{ width: "150px", borderRadius: "16px", boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)" }}
                >
                  {/* Image */}
                  <div className={`relative flex h-[90px] items-center justify-center bg-gradient-to-br ${p.imageColor}`}>
                    <span className="text-3xl font-bold text-white/80">{p.name.charAt(0)}</span>
                    <div className="absolute left-1.5 top-1.5 rounded-full bg-[#DC2626] px-1.5 py-0.5 text-[9px] font-extrabold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                      {discountPct}% OFF
                    </div>
                    <div className="absolute right-1.5 top-1.5 rounded-full bg-[#D97706] px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                      {daysUntilShort(p.bestBefore)}d
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-3">
                    <h4 className="line-clamp-2 text-[13px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                      {p.name}
                    </h4>
                    <p className="mt-0.5 text-[10px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {p.shopName}
                    </p>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-[12px] text-[#8A8A8A] line-through" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {formatINR(p.originalPrice)}
                      </span>
                      <span className="text-[16px] font-bold text-[#1A6B3C]" style={{ fontFamily: "var(--font-outfit)" }}>
                        {formatINR(p.discountedPrice)}
                      </span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                      className="mt-2.5 flex h-8 w-full items-center justify-center rounded-[10px] border-[1.5px] border-[#1A6B3C] text-[13px] font-semibold text-[#1A6B3C]"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Add
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function daysUntilShort(iso: string): number {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}
