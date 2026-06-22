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
  ShoppingBag,
  Clock,
  ChevronRight,
} from "lucide-react";

export function HomeUser() {
  const products = useAppStore((s) => s.products);
  const donations = useAppStore((s) => s.donations);
  const setScreen = useAppStore((s) => s.setScreen);
  const impactPoints = useAppStore((s) => s.impactPoints);
  const mealsSaved = useAppStore((s) => s.mealsSaved);
  const co2Saved = useAppStore((s) => s.co2Saved);
  const moneySaved = useAppStore((s) => s.moneySaved);

  const rescueDonations = donations.filter((d) => d.status === "listed").slice(0, 5);
  const aiMatched = products.filter((p) => p.isAiMatch).slice(0, 4);
  const topDeals = products.slice(0, 6);

  return (
    // CRITICAL: flex-1 + min-h-0 + flex-col so main can scroll
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
      <TopBar />

      {/* Scrollable main — flex-1 + min-h-0 + overflow-y-auto */}
      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        <div className="px-5 pt-3">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-end justify-between">
            <div>
              <p className="text-[13px] font-medium text-[#8e8e93]">Good evening</p>
              <h1 className="text-[28px] font-bold leading-tight tracking-tight text-[#1a1a1a]">Ramesh</h1>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}>
              <TrendingUp size={12} className="text-[#d97706]" />
              <span className="text-[12px] font-bold text-[#1a1a1a]">{impactPoints.toLocaleString("en-IN")}</span>
              <span className="text-[10px] text-[#8e8e93]">pts</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-5">
          <HeroCarousel />
        </div>

        {/* Impact stats */}
        <section className="mt-6 px-5">
          <SectionHeader
            title="Community Impact"
            icon={<div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ecfdf5]"><Leaf size={14} className="text-[#047857]" /></div>}
          />
          <div className="grid grid-cols-3 gap-3">
            <ImpactStat icon={<Utensils size={14} className="text-[#047857]" />} value={String(mealsSaved)} label="Meals saved" bg="#ecfdf5" />
            <ImpactStat icon={<Leaf size={14} className="text-[#2563eb]" />} value={`${co2Saved}kg`} label="CO2 saved" bg="#dbeafe" />
            <ImpactStat icon={<ShoppingBag size={14} className="text-[#7c3aed]" />} value={`\u20B9${moneySaved}`} label="Money saved" bg="#ede9fe" />
          </div>
        </section>

        {/* Rescue Alerts */}
        <section className="mt-6 px-5">
          <SectionHeader
            title="Nearby Requests"
            action="See all"
            icon={<div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fef3c7]"><Flame size={14} className="text-[#d97706]" /></div>}
            onAction={() => setScreen("ngo-feed")}
          />
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
            {rescueDonations.map((d, i) => (
              <RescueAlertCard key={d.id} donation={d} index={i} />
            ))}
          </div>
        </section>

        {/* Donate CTA */}
        <section className="mt-6 px-5">
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setScreen("donate")}
            whileTap={{ scale: 0.98 }}
            className="relative w-full overflow-hidden p-5 text-left"
            style={{ borderRadius: "24px", background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 8px 24px rgba(4, 120, 87, 0.25)" }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <HandHeart size={26} className="text-white" strokeWidth={2.2} />
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] font-bold tracking-tight text-white">Have surplus food?</h3>
                <p className="text-[12px] text-white/85">Donate to NGOs in minutes</p>
              </div>
              <div className="rounded-full bg-white px-4 py-2 text-[12px] font-bold text-[#047857]">Donate</div>
            </div>
          </motion.button>
        </section>

        {/* AI Matched */}
        <section className="mt-6 px-5">
          <SectionHeader
            title="AI Matched for you"
            action="View all"
            icon={<div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ede9fe]"><Sparkles size={14} className="text-[#7c3aed]" /></div>}
            onAction={() => setScreen("marketplace")}
          />
          <div className="grid grid-cols-2 gap-3">
            {aiMatched.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>

        {/* Top Deals */}
        <section className="mt-6 px-5">
          <SectionHeader
            title="Deals near you"
            action="See all"
            icon={<div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ecfdf5]"><TrendingUp size={14} className="text-[#047857]" /></div>}
            onAction={() => setScreen("marketplace")}
          />
          <div className="grid grid-cols-2 gap-3">
            {topDeals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-6 px-5">
          <SectionHeader
            title="Recent Activity"
            icon={<div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fde8e0]"><Clock size={14} className="text-[#e76f51]" /></div>}
          />
          <div className="bg-white p-4" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}>
            {[
              { label: "Rescued wedding surplus", time: "2h ago", points: "+240 pts", color: "#047857" },
              { label: "Bought Amul Toned Milk", time: "8h ago", points: "+12 pts", color: "#2563eb" },
              { label: "Volunteer pickup completed", time: "1d ago", points: "+90 pts", color: "#7c3aed" },
            ].map((a, i) => (
              <div key={i} className={`flex items-center gap-3 py-2.5 ${i > 0 ? "border-t border-[#f3efe9]" : ""}`}>
                <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: `${a.color}15` }}>
                  <div className="h-2 w-2 rounded-full" style={{ background: a.color }} />
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-semibold text-[#1a1a1a]">{a.label}</div>
                  <div className="text-[10px] text-[#8e8e93]">{a.time}</div>
                </div>
                <span className="text-[11px] font-bold" style={{ color: a.color }}>{a.points}</span>
              </div>
            ))}
            <button onClick={() => setScreen("impact")} className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl bg-[#f3efe9] py-2.5 text-[12px] font-semibold text-[#1a1a1a]">
              View all activity
              <ChevronRight size={14} />
            </button>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-6 px-5">
          <SectionHeader title="Categories" />
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
            {[
              { label: "Dairy", bg: "#dbeafe", icon: "🥛" },
              { label: "Bakery", bg: "#fef3c7", icon: "🍞" },
              { label: "Veggies", bg: "#d1fae5", icon: "🥬" },
              { label: "Fruits", bg: "#fde8e0", icon: "🍎" },
              { label: "Snacks", bg: "#fef3c7", icon: "🍿" },
              { label: "Staples", bg: "#ede9fe", icon: "🌾" },
            ].map((c, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setScreen("marketplace")}
                className="flex h-16 w-20 flex-shrink-0 flex-col items-center justify-center gap-1.5"
                style={{ borderRadius: "16px", background: c.bg }}
              >
                <span className="text-xl">{c.icon}</span>
                <span className="text-[10px] font-bold text-[#1a1a1a]">{c.label}</span>
              </motion.button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ImpactStat({ icon, value, label, bg }: { icon: React.ReactNode; value: string; label: string; bg: string }) {
  return (
    <div className="flex flex-col items-start p-3.5" style={{ borderRadius: "20px", background: bg }}>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">{icon}</div>
      <div className="mt-2 text-[16px] font-bold text-[#1a1a1a]">{value}</div>
      <div className="text-[10px] text-[#4a4a4a]">{label}</div>
    </div>
  );
}
