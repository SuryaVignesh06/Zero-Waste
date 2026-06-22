"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  ProductCard,
  RescueAlertCard,
  SectionHeader,
  HeroCarousel,
  TopBar,
} from "./ProductCard";
import {
  Flame,
  HandHeart,
  Sparkles,
  TrendingUp,
  Leaf,
  Utensils,
  Trophy,
  ShoppingBag,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";

const displayFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

export function HomeUser() {
  const products = useAppStore((s) => s.products);
  const donations = useAppStore((s) => s.donations);
  const setScreen = useAppStore((s) => s.setScreen);
  const impactPoints = useAppStore((s) => s.impactPoints);
  const mealsSaved = useAppStore((s) => s.mealsSaved);
  const co2Saved = useAppStore((s) => s.co2Saved);
  const moneySaved = useAppStore((s) => s.moneySaved);

  const rescueDonations = donations
    .filter((d) => d.status === "listed")
    .slice(0, 5);
  const aiMatched = products.filter((p) => p.isAiMatch).slice(0, 4);
  const topDeals = products.slice(0, 6);

  return (
    <div className="flex h-full flex-col bg-[#FCFCF9]">
      <TopBar />

      {/* Scrollable content area — this is the key fix */}
      <main className="flex-1 overflow-y-auto zw-scroll pb-32">
        {/* Greeting */}
        <div className="px-5 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end justify-between"
          >
            <div>
              <p className="text-[13px] font-medium text-[#64748b]">
                Good evening
              </p>
              <h1
                className="text-[28px] font-bold leading-tight tracking-tight text-[#111827]"
                style={{ fontFamily: displayFont }}
              >
                Ramesh
              </h1>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5"
              style={{ boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}
            >
              <Trophy size={12} className="text-[#f59e0b]" />
              <span
                className="text-[12px] font-bold text-[#111827]"
                style={{ fontFamily: displayFont }}
              >
                {impactPoints.toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] text-[#94a3b8]">pts</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Carousel */}
        <div className="mt-5">
          <HeroCarousel />
        </div>

        {/* Impact stats — 3 alternating pastel cards */}
        <section className="mt-7 px-5">
          <SectionHeader
            title="Community Impact"
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f0fdf4]">
                <Leaf size={14} className="text-[#16A34A]" />
              </div>
            }
          />
          <div className="grid grid-cols-3 gap-3">
            <ImpactStat
              icon={<Utensils size={14} className="text-[#16A34A]" />}
              value={String(mealsSaved)}
              label="Meals saved"
              bg="#f0fdf4"
            />
            <ImpactStat
              icon={<Leaf size={14} className="text-[#3b82f6]" />}
              value={`${co2Saved}kg`}
              label="CO2 saved"
              bg="#eff6ff"
            />
            <ImpactStat
              icon={<ShoppingBag size={14} className="text-[#ec4899]" />}
              value={`₹${moneySaved}`}
              label="Money saved"
              bg="#fdf2f8"
            />
          </div>
        </section>

        {/* Live Rescue Alerts */}
        <section className="mt-7 px-5">
          <SectionHeader
            title="Nearby Requests"
            action="See all"
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fef3c7]">
                <Flame size={14} className="text-[#f59e0b]" />
              </div>
            }
            onAction={() => setScreen("ngo-feed")}
          />
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 no-scrollbar">
            {rescueDonations.map((d, i) => (
              <RescueAlertCard key={d.id} donation={d} index={i} />
            ))}
          </div>
        </section>

        {/* Donate CTA — large hero card */}
        <section className="mt-7 px-5">
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setScreen("donate")}
            whileTap={{ scale: 0.98 }}
            className="relative w-full overflow-hidden p-6 text-left"
            style={{
              borderRadius: 32,
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              boxShadow: "0 8px 32px rgba(22, 163, 74, 0.25)",
            }}
          >
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20">
                <HandHeart size={26} className="text-white" strokeWidth={2.2} />
              </div>
              <div className="flex-1">
                <h3
                  className="text-[16px] font-bold tracking-tight text-white"
                  style={{ fontFamily: displayFont }}
                >
                  Have surplus food?
                </h3>
                <p className="text-[12px] text-white/85">
                  Donate to NGOs in minutes
                </p>
              </div>
              <div className="rounded-full bg-white px-4 py-2 text-[12px] font-bold text-[#16A34A]">
                Donate
              </div>
            </div>
          </motion.button>
        </section>

        {/* AI Matched For You */}
        <section className="mt-7 px-5">
          <SectionHeader
            title="AI Matched for you"
            action="View all"
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eff6ff]">
                <Sparkles size={14} className="text-[#3b82f6]" />
              </div>
            }
            onAction={() => setScreen("marketplace")}
          />
          <div className="grid grid-cols-2 gap-3">
            {aiMatched.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>

        {/* Top Deals */}
        <section className="mt-7 px-5">
          <SectionHeader
            title="Deals near you"
            action="See all"
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f0fdf4]">
                <TrendingUp size={14} className="text-[#16A34A]" />
              </div>
            }
            onAction={() => setScreen("marketplace")}
          />
          <div className="grid grid-cols-2 gap-3">
            {topDeals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-7 px-5">
          <SectionHeader
            title="Recent Activity"
            icon={
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fdf2f8]">
                <Clock size={14} className="text-[#ec4899]" />
              </div>
            }
          />
          <div
            className="overflow-hidden bg-white p-4"
            style={{
              borderRadius: 32,
              boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)",
            }}
          >
            {[
              { label: "Rescued wedding surplus", time: "2h ago", points: "+240 pts", color: "#16A34A" },
              { label: "Bought Amul Toned Milk", time: "8h ago", points: "+12 pts", color: "#3b82f6" },
              { label: "Volunteer pickup completed", time: "1d ago", points: "+90 pts", color: "#ec4899" },
            ].map((a, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 py-2.5 ${
                  i > 0 ? "border-t border-[#f1f5f9]" : ""
                }`}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ background: `${a.color}15` }}
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ background: a.color }}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-semibold text-[#111827]">
                    {a.label}
                  </div>
                  <div className="text-[10px] text-[#94a3b8]">{a.time}</div>
                </div>
                <span
                  className="text-[11px] font-bold"
                  style={{ color: a.color }}
                >
                  {a.points}
                </span>
              </div>
            ))}
            <button
              onClick={() => setScreen("impact")}
              className="mt-2 flex w-full items-center justify-center gap-1 rounded-full bg-[#f0fdf4] py-2.5 text-[12px] font-semibold text-[#16A34A]"
            >
              View all activity
              <ChevronRight size={14} />
            </button>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-7 px-5">
          <SectionHeader title="Categories" />
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 no-scrollbar">
            {[
              { label: "Dairy", color: "#dbeafe", icon: "🥛" },
              { label: "Bakery", color: "#fef3c7", icon: "🍞" },
              { label: "Veggies", color: "#dcfce7", icon: "🥬" },
              { label: "Fruits", color: "#fce7f3", icon: "🍎" },
              { label: "Snacks", color: "#fef3c7", icon: "🍿" },
              { label: "Staples", color: "#fef9c3", icon: "🌾" },
            ].map((c, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setScreen("marketplace")}
                className="flex h-16 w-20 flex-shrink-0 flex-col items-center justify-center gap-1.5"
                style={{
                  borderRadius: 22,
                  background: c.color,
                }}
              >
                <span className="text-xl">{c.icon}</span>
                <span className="text-[10px] font-bold text-[#111827]">
                  {c.label}
                </span>
              </motion.button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ImpactStat({
  icon,
  value,
  label,
  bg,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  bg: string;
}) {
  return (
    <div
      className="flex flex-col items-start p-3.5"
      style={{
        borderRadius: 28,
        background: bg,
      }}
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
        {icon}
      </div>
      <div
        className="mt-2 text-[16px] font-bold text-[#111827]"
        style={{ fontFamily: displayFont }}
      >
        {value}
      </div>
      <div className="text-[10px] text-[#64748b]">{label}</div>
    </div>
  );
}
