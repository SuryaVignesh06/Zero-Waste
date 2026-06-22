"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { MOCK_MONTHLY_IMPACT } from "@/lib/mock-data";
import { formatRelativeTime } from "./Countdown";
import {
  Sparkles,
  Flame,
  Leaf,
  Heart,
  Users,
  Award,
  Crown,
  Star,
  TrendingUp,
  Utensils,
  ShoppingBag,
  Bike,
  HandHeart,
} from "lucide-react";

const displayFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const BADGE_ICONS: Record<string, any> = {
  Heart,
  Flame,
  Leaf,
  Users,
  Award,
  Crown,
};

const EVENT_ICONS: Record<string, any> = {
  rescue: HandHeart,
  purchase: ShoppingBag,
  donate: Heart,
  volunteer: Bike,
};

export function ImpactDashboard() {
  const impactPoints = useAppStore((s) => s.impactPoints);
  const mealsSaved = useAppStore((s) => s.mealsSaved);
  const co2Saved = useAppStore((s) => s.co2Saved);
  const moneySaved = useAppStore((s) => s.moneySaved);
  const badges = useAppStore((s) => s.badges);
  const events = useAppStore((s) => s.events);

  const levels = [
    { name: "Bronze", min: 0, color: "linear-gradient(135deg, #fbbf24, #d97706)" },
    { name: "Silver", min: 500, color: "linear-gradient(135deg, #cbd5e1, #64748b)" },
    { name: "Gold", min: 1000, color: "linear-gradient(135deg, #fcd34d, #f59e0b)" },
    { name: "Platinum", min: 2000, color: "linear-gradient(135deg, #67e8f9, #0891b2)" },
  ];
  const currentLevel = [...levels].reverse().find((l) => impactPoints >= l.min)!;
  const nextLevel = levels.find((l) => l.min > impactPoints);
  const levelProgress = nextLevel
    ? ((impactPoints - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100
    : 100;

  const maxMeals = Math.max(...MOCK_MONTHLY_IMPACT.map((d) => d.meals));

  return (
    <div className="flex h-full flex-col bg-[#FCFCF9]">
      <div className="bg-white px-5 py-4" style={{ boxShadow: "0 2px 12px rgba(17, 24, 39, 0.04)" }}>
        <h1
          className="text-[24px] font-bold tracking-tight text-[#111827]"
          style={{ fontFamily: displayFont }}
        >
          Your Impact
        </h1>
        <p className="text-[11px] text-[#64748b]">
          Track your contribution to a zero-waste world
        </p>
      </div>

      <main className="flex-1 overflow-y-auto zw-scroll pb-32">
        {/* Hero stat card */}
        <div className="px-5 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden p-6 text-white"
            style={{
              borderRadius: 32,
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              boxShadow: "0 8px 32px rgba(22, 163, 74, 0.3)",
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl"
                  style={{
                    background: currentLevel.color,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  <Crown size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-white/80">
                    Impact Level
                  </div>
                  <div
                    className="text-base font-bold"
                    style={{ fontFamily: displayFont }}
                  >
                    {currentLevel.name}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-[11px] text-white/80">Total Impact Points</div>
                <div
                  className="text-4xl font-bold"
                  style={{ fontFamily: displayFont }}
                >
                  <AnimatedCounter value={impactPoints} />
                  <span className="ml-2 text-base font-medium text-white/80">pts</span>
                </div>
              </div>

              {nextLevel && (
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-[10px] text-white/85">
                    <span>{currentLevel.name}</span>
                    <span>{Math.round(levelProgress)}% to {nextLevel.name}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/25">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${levelProgress}%` }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      className="h-full rounded-full bg-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sub-stats */}
        <div className="mt-4 grid grid-cols-3 gap-3 px-5">
          <SubStat
            icon={<Utensils size={16} />}
            label="Meals saved"
            value={String(mealsSaved)}
            bg="#f0fdf4"
            color="#16A34A"
          />
          <SubStat
            icon={<Leaf size={16} />}
            label="CO2 saved"
            value={`${co2Saved}kg`}
            bg="#eff6ff"
            color="#3b82f6"
          />
          <SubStat
            icon={<TrendingUp size={16} />}
            label="Money saved"
            value={`₹${moneySaved}`}
            bg="#fdf2f8"
            color="#ec4899"
          />
        </div>

        {/* Weekly chart */}
        <div className="mt-5 px-5">
          <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wide text-[#64748b]">
            This Week
          </h3>
          <div className="bg-white p-5" style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
            <div className="flex h-32 items-end justify-between gap-2">
              {MOCK_MONTHLY_IMPACT.map((d, i) => {
                const heightPct = (d.meals / maxMeals) * 100;
                return (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="relative flex w-full flex-1 items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${heightPct}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.08,
                          ease: "easeOut",
                        }}
                        className="w-full rounded-t-lg"
                        style={{
                          background: "linear-gradient(180deg, #4ade80, #16a34a)",
                        }}
                      >
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.08 }}
                          className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#111827]"
                          style={{ fontFamily: displayFont }}
                        >
                          {d.meals}
                        </motion.span>
                      </motion.div>
                    </div>
                    <span className="text-[9px] font-medium text-[#94a3b8]">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-5 px-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#64748b]">
              Badges
            </h3>
            <span className="text-[11px] font-semibold text-[#16A34A]">
              {badges.filter((b) => b.unlocked).length}/{badges.length} unlocked
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((b, i) => {
              const Icon = BADGE_ICONS[b.icon] ?? Award;
              return (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col items-center p-4 text-center"
                  style={{
                    borderRadius: 28,
                    background: b.unlocked ? "#ffffff" : "#f8fafc",
                    boxShadow: b.unlocked
                      ? "0 4px 20px rgba(17, 24, 39, 0.06)"
                      : "none",
                  }}
                >
                  <div
                    className="relative flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      background: b.unlocked
                        ? "linear-gradient(135deg, #16a34a, #15803d)"
                        : "#e2e8f0",
                    }}
                  >
                    <Icon
                      size={22}
                      className={b.unlocked ? "text-white" : "text-[#94a3b8]"}
                    />
                  </div>
                  <span
                    className={`mt-2 text-[10px] font-bold leading-tight ${b.unlocked ? "text-[#111827]" : "text-[#94a3b8]"}`}
                    style={{ fontFamily: displayFont }}
                  >
                    {b.name}
                  </span>
                  {!b.unlocked && b.progress !== undefined && (
                    <div className="mt-1 w-full">
                      <div className="h-1 overflow-hidden rounded-full bg-[#e2e8f0]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${b.progress}%` }}
                          transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                          className="h-full bg-[#16A34A]"
                        />
                      </div>
                      <span className="text-[8px] text-[#94a3b8]">{b.progress}%</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-5 px-5">
          <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wide text-[#64748b]">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {events.map((e, i) => {
              const Icon = EVENT_ICONS[e.type] ?? Star;
              return (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 bg-white p-4"
                  style={{ borderRadius: 28, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-[#f0fdf4] text-[#16A34A]">
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-[12px] font-semibold text-[#111827] line-clamp-1"
                      style={{ fontFamily: displayFont }}
                    >
                      {e.label}
                    </div>
                    <div className="text-[10px] text-[#94a3b8]">
                      {formatRelativeTime(e.timestamp)} ·{" "}
                      <span className="font-semibold text-[#16A34A]">
                        +{e.points} pts
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    {e.mealsSaved > 0 && (
                      <span className="text-[10px] font-bold text-[#16A34A]">
                        {e.mealsSaved} meals
                      </span>
                    )}
                    {e.moneySaved > 0 && (
                      <span className="text-[10px] font-bold text-[#ec4899]">
                        ₹{e.moneySaved}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quote */}
        <div className="mt-5 px-5">
          <div
            className="p-5 text-center"
            style={{
              borderRadius: 32,
              background: "linear-gradient(135deg, #f0fdf4, #eff6ff)",
            }}
          >
            <Sparkles size={20} className="mx-auto text-[#16A34A]" />
            <p
              className="mt-2 text-[13px] font-semibold italic text-[#111827]"
              style={{ fontFamily: displayFont }}
            >
              "Food should nourish people, not landfills."
            </p>
            <p className="mt-1 text-[10px] text-[#64748b]">
              You've prevented {co2Saved}kg of CO2 emissions — equivalent to
              planting {(co2Saved / 21).toFixed(1)} trees.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function AnimatedCounter({ value }: { value: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {value.toLocaleString("en-IN")}
    </motion.span>
  );
}

function SubStat({
  icon,
  label,
  value,
  bg,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bg: string;
  color: string;
}) {
  return (
    <div className="p-3.5" style={{ borderRadius: 28, background: bg }}>
      <div
        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white"
        style={{ color }}
      >
        {icon}
      </div>
      <div
        className="mt-2 text-base font-bold text-[#111827]"
        style={{ fontFamily: displayFont }}
      >
        {value}
      </div>
      <div className="text-[10px] text-[#64748b]">{label}</div>
    </div>
  );
}
