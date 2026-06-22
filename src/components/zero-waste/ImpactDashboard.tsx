"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { MOCK_MONTHLY_IMPACT } from "@/lib/mock-data";
import { formatRelativeTime } from "./Countdown";
import { Sparkles, Flame, Leaf, Heart, Users, Award, Crown, Star, TrendingUp, Utensils, ShoppingBag, Bike, HandHeart } from "lucide-react";

const BADGE_ICONS: Record<string, any> = { Heart, Flame, Leaf, Users, Award, Crown };
const EVENT_ICONS: Record<string, any> = { rescue: HandHeart, purchase: ShoppingBag, donate: Heart, volunteer: Bike };

export function ImpactDashboard() {
  const impactPoints = useAppStore((s) => s.impactPoints);
  const mealsSaved = useAppStore((s) => s.mealsSaved);
  const co2Saved = useAppStore((s) => s.co2Saved);
  const moneySaved = useAppStore((s) => s.moneySaved);
  const badges = useAppStore((s) => s.badges);
  const events = useAppStore((s) => s.events);

  const levels = [{ name: "Bronze", min: 0, color: "linear-gradient(135deg, #fbbf24, #d97706)" }, { name: "Silver", min: 500, color: "linear-gradient(135deg, #cbd5e1, #64748b)" }, { name: "Gold", min: 1000, color: "linear-gradient(135deg, #fcd34d, #f59e0b)" }, { name: "Platinum", min: 2000, color: "linear-gradient(135deg, #67e8f9, #0891b2)" }];
  const currentLevel = [...levels].reverse().find((l) => impactPoints >= l.min)!;
  const nextLevel = levels.find((l) => l.min > impactPoints);
  const levelProgress = nextLevel ? ((impactPoints - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100 : 100;
  const maxMeals = Math.max(...MOCK_MONTHLY_IMPACT.map((d) => d.meals));

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#f5f1ed]">
      <div className="bg-white px-5 py-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <h1 className="text-[24px] font-bold tracking-tight text-[#1a1a1a]">Your Impact</h1>
        <p className="text-[11px] text-[#4a4a4a]">Track your contribution to a zero-waste world</p>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        <div className="px-5 pt-4 space-y-5">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden p-6 text-white" style={{ borderRadius: "24px", background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 8px 24px rgba(4, 120, 87, 0.3)" }}>
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: currentLevel.color, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}><Crown size={20} className="text-white" /></div>
                <div><div className="text-[10px] font-medium uppercase tracking-wider text-white/80">Impact Level</div><div className="text-base font-bold">{currentLevel.name}</div></div>
              </div>
              <div className="mt-5"><div className="text-[11px] text-white/80">Total Impact Points</div><div className="text-4xl font-bold"><motion.span initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>{impactPoints.toLocaleString("en-IN")}</motion.span><span className="ml-2 text-base font-medium text-white/80">pts</span></div></div>
              {nextLevel && (<div className="mt-4"><div className="mb-1 flex items-center justify-between text-[10px] text-white/85"><span>{currentLevel.name}</span><span>{Math.round(levelProgress)}% to {nextLevel.name}</span></div><div className="h-2 overflow-hidden rounded-full bg-white/25"><motion.div initial={{ width: 0 }} animate={{ width: `${levelProgress}%` }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} className="h-full rounded-full bg-white" /></div></div>)}
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            <SubStat icon={<Utensils size={16} />} label="Meals saved" value={String(mealsSaved)} bg="#ecfdf5" color="#047857" />
            <SubStat icon={<Leaf size={16} />} label="CO2 saved" value={`${co2Saved}kg`} bg="#dbeafe" color="#2563eb" />
            <SubStat icon={<TrendingUp size={16} />} label="Money saved" value={`\u20B9${moneySaved}`} bg="#ede9fe" color="#7c3aed" />
          </div>

          <div>
            <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wide text-[#4a4a4a]">This Week</h3>
            <div className="bg-white p-5" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
              <div className="flex h-32 items-end justify-between gap-2">
                {MOCK_MONTHLY_IMPACT.map((d, i) => { const heightPct = (d.meals / maxMeals) * 100; return (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="relative flex w-full flex-1 items-end">
                      <motion.div initial={{ height: 0 }} whileInView={{ height: `${heightPct}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }} className="w-full rounded-t-lg" style={{ background: "linear-gradient(180deg, #34d399, #047857)" }}>
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.08 }} className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#1a1a1a]">{d.meals}</motion.span>
                      </motion.div>
                    </div>
                    <span className="text-[9px] font-medium text-[#8e8e93]">{d.day}</span>
                  </div>
                ); })}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between"><h3 className="text-[12px] font-bold uppercase tracking-wide text-[#4a4a4a]">Badges</h3><span className="text-[11px] font-semibold text-[#047857]">{badges.filter((b) => b.unlocked).length}/{badges.length} unlocked</span></div>
            <div className="grid grid-cols-3 gap-3">
              {badges.map((b, i) => { const Icon = BADGE_ICONS[b.icon] ?? Award; return (
                <motion.div key={b.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }} className="flex flex-col items-center p-4 text-center" style={{ borderRadius: "18px", background: b.unlocked ? "#ffffff" : "#faf7f3", boxShadow: b.unlocked ? "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" : "none" }}>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full" style={{ background: b.unlocked ? "linear-gradient(135deg, #047857, #064e3b)" : "#e8e3dd" }}><Icon size={22} className={b.unlocked ? "text-white" : "text-[#8e8e93]"} /></div>
                  <span className={`mt-2 text-[10px] font-bold leading-tight ${b.unlocked ? "text-[#1a1a1a]" : "text-[#8e8e93]"}`}>{b.name}</span>
                  {!b.unlocked && b.progress !== undefined && (<div className="mt-1 w-full"><div className="h-1 overflow-hidden rounded-full bg-[#e8e3dd]"><motion.div initial={{ width: 0 }} animate={{ width: `${b.progress}%` }} transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }} className="h-full bg-[#047857]" /></div><span className="text-[8px] text-[#8e8e93]">{b.progress}%</span></div>)}
                </motion.div>
              ); })}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wide text-[#4a4a4a]">Recent Activity</h3>
            <div className="space-y-3">
              {events.map((e, i) => { const Icon = EVENT_ICONS[e.type] ?? Star; return (
                <motion.div key={e.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3 bg-white p-4" style={{ borderRadius: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-[#ecfdf5] text-[#047857]"><Icon size={16} /></div>
                  <div className="flex-1"><div className="text-[12px] font-semibold text-[#1a1a1a] line-clamp-1">{e.label}</div><div className="text-[10px] text-[#8e8e93]">{formatRelativeTime(e.timestamp)} · <span className="font-semibold text-[#047857]">+{e.points} pts</span></div></div>
                  <div className="flex flex-col items-end gap-0.5">{e.mealsSaved > 0 && <span className="text-[10px] font-bold text-[#047857]">{e.mealsSaved} meals</span>}{e.moneySaved > 0 && <span className="text-[10px] font-bold text-[#7c3aed]">\u20B9{e.moneySaved}</span>}</div>
                </motion.div>
              ); })}
            </div>
          </div>

          <div className="p-5 text-center" style={{ borderRadius: "20px", background: "linear-gradient(135deg, #ecfdf5, #dbeafe)" }}>
            <Sparkles size={20} className="mx-auto text-[#047857]" />
            <p className="mt-2 text-[13px] font-semibold italic text-[#1a1a1a]">"Food should nourish people, not landfills."</p>
            <p className="mt-1 text-[10px] text-[#4a4a4a]">You've prevented {co2Saved}kg of CO2 emissions — equivalent to planting {(co2Saved / 21).toFixed(1)} trees.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function SubStat({ icon, label, value, bg, color }: { icon: React.ReactNode; label: string; value: string; bg: string; color: string }) {
  return (<div className="p-3.5" style={{ borderRadius: "18px", background: bg }}><div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white" style={{ color }}>{icon}</div><div className="mt-2 text-base font-bold text-[#1a1a1a]">{value}</div><div className="text-[10px] text-[#4a4a4a]">{label}</div></div>);
}
