"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown } from "./Countdown";
import { MapPin, Users, Clock, Flame, Map as MapIcon, List, Sparkles, Check, X, HeartHandshake, Building2, Home, Utensils, GraduationCap, CalendarDays } from "lucide-react";

const DONOR_ICONS: Record<string, any> = { "marriage-hall": Building2, restaurant: Utensils, hostel: GraduationCap, household: Home, event: CalendarDays };

export function NgoFeed() {
  const donations = useAppStore((s) => s.donations);
  const acceptDonation = useAppStore((s) => s.acceptDonation);
  const [view, setView] = useState<"list" | "map">("list");
  const listed = donations.filter((d) => d.status === "listed");

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#f5f1ed]">
      <div className="bg-white px-5 pb-4 pt-5" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center justify-between">
          <div><h1 className="text-[24px] font-bold tracking-tight text-[#1a1a1a]">Rescue Feed</h1><p className="text-[11px] text-[#4a4a4a]">{listed.length} surplus donations waiting</p></div>
          <div className="flex rounded-full bg-[#f3efe9] p-1">
            <button onClick={() => setView("list")} className="flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all" style={{ background: view === "list" ? "linear-gradient(135deg, #047857, #064e3b)" : "transparent", color: view === "list" ? "#ffffff" : "#4a4a4a" }}><List size={13} />List</button>
            <button onClick={() => setView("map")} className="flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all" style={{ background: view === "map" ? "linear-gradient(135deg, #047857, #064e3b)" : "transparent", color: view === "map" ? "#ffffff" : "#4a4a4a" }}><MapIcon size={13} />Map</button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <NgoStat value={String(listed.length)} label="Incoming" color="#047857" bg="#ecfdf5" />
          <NgoStat value="2" label="Urgent" color="#dc2626" bg="#fef2f2" />
          <NgoStat value="148" label="Served" color="#2563eb" bg="#dbeafe" />
        </div>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 px-5 py-4">
              {listed.map((d, i) => { const Icon = DONOR_ICONS[d.donorType] ?? Building2; const hoursToExpiry = (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000; const isUrgent = hoursToExpiry < 2; return (
                <motion.div key={d.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }} className="overflow-hidden bg-white" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
                  <div className={`relative h-20 w-full overflow-hidden bg-gradient-to-br ${d.imageColor}`} style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}><Icon size={11} className="text-[#047857]" /><span className="text-[10px] font-bold uppercase tracking-wide text-[#047857]">{d.donorType.replace("-", " ")}</span></div>
                    {isUrgent && <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#dc2626] px-2.5 py-1"><Flame size={10} className="text-white" /><span className="text-[10px] font-bold uppercase text-white">Urgent</span></div>}
                    <div className="absolute bottom-2 right-3 flex items-center gap-1 rounded-full bg-[#1a1a1a]/90 px-2 py-0.5"><Users size={10} className="text-white" /><span className="text-[10px] font-bold text-white">{d.servings} servings</span></div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[15px] font-bold tracking-tight text-[#1a1a1a]">{d.title}</h3>
                    <p className="mt-1 line-clamp-2 text-[12px] text-[#4a4a4a]">{d.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#4a4a4a]">
                      <div className="flex items-center gap-1"><MapPin size={11} /><span>{d.pickupDistanceKm}km away</span></div>
                      <div className="flex items-center gap-1"><Clock size={11} /><span>Pickup: 2 hrs</span></div>
                      <div className="flex items-center gap-1"><Sparkles size={11} className="text-[#2563eb]" /><span>AI fresh: {Math.round(d.aiFreshnessScore * 100)}%</span></div>
                    </div>
                    {d.aiMatchScore && (
                      <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#dbeafe] p-3">
                        <div className="flex items-center gap-2"><Sparkles size={13} className="text-[#2563eb]" /><span className="text-[11px] font-bold text-[#1a1a1a]">AI Match Score</span></div>
                        <div className="flex items-center gap-2"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#bfdbfe]"><motion.div initial={{ width: 0 }} animate={{ width: `${d.aiMatchScore}%` }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full bg-[#2563eb]" /></div><span className="text-[11px] font-bold text-[#2563eb]">{d.aiMatchScore}%</span></div>
                      </div>
                    )}
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2"><span className="text-[10px] font-medium uppercase tracking-wide text-[#8e8e93]">Expires in</span><Countdown deadline={d.expiryDeadline} variant="compact" /></div>
                      <div className="flex gap-2">
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fef2f2] text-[#dc2626] active:scale-90"><X size={16} /></button>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={() => acceptDonation(d.id)} className="flex h-10 items-center gap-1.5 px-4 text-[12px] font-semibold text-white" style={{ borderRadius: "14px", background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 4px 12px rgba(4, 120, 87, 0.25)" }}><Check size={14} strokeWidth={3} />Accept</motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ); })}
              {listed.length === 0 && (<div className="mt-20 flex flex-col items-center text-center"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ecfdf5]"><HeartHandshake size={32} className="text-[#047857]" /></div><p className="mt-4 text-base font-bold text-[#1a1a1a]">All caught up!</p><p className="text-[12px] text-[#4a4a4a]">No active donations in your area</p></div>)}
            </motion.div>
          ) : (
            <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative h-full">
              <div className="relative h-[450px] bg-[#f3efe9]" style={{ backgroundImage: "linear-gradient(0deg, #e8e3dd 1px, transparent 1px), linear-gradient(90deg, #e8e3dd 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none"><path d="M 0 80 L 100% 80" stroke="#ffffff" strokeWidth="14" /><path d="M 0 200 L 100% 200" stroke="#ffffff" strokeWidth="10" /><path d="M 0 350 L 100% 350" stroke="#ffffff" strokeWidth="12" /><path d="M 80 0 L 80 100%" stroke="#ffffff" strokeWidth="14" /><path d="M 240 0 L 240 100%" stroke="#ffffff" strokeWidth="10" /></svg>
                {listed.map((d, i) => { const positions = [{ left: "15%", top: "20%" }, { left: "65%", top: "15%" }, { left: "30%", top: "55%" }, { left: "70%", top: "60%" }, { left: "45%", top: "80%" }]; const pos = positions[i % positions.length]; const hoursToExpiry = (new Date(d.expiryDeadline).getTime() - Date.now()) / 3600000; const isUrgent = hoursToExpiry < 2; const isWarning = hoursToExpiry < 4 && !isUrgent; return (
                  <motion.button key={d.id} initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 18 }} whileTap={{ scale: 0.9 }} style={{ left: pos.left, top: pos.top }} className="absolute -translate-x-1/2 -translate-y-1/2">
                    <div className={`relative flex items-center justify-center rounded-full p-2 ring-4 ring-white ${isUrgent ? "zw-urgency-pulse bg-[#dc2626]" : isWarning ? "zw-urgency-pulse-amber bg-[#f59e0b]" : "bg-[#047857]"}`} style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}><Utensils size={14} className="text-white" /></div>
                    <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-1.5 py-0.5 text-[9px] font-bold text-[#1a1a1a]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>{d.servings} servings</div>
                  </motion.button>
                ); })}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><div className="zw-aura relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a1a] ring-4 ring-white" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}><HeartHandshake size={20} className="text-white" /></div><div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1a1a1a] px-2 py-0.5 text-[9px] font-bold text-white">You</div></div>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-white p-5" style={{ borderRadius: "28px 28px 0 0", boxShadow: "0 -8px 32px rgba(0,0,0,0.1)" }}>
                <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-[#e8e3dd]" />
                <h3 className="text-sm font-bold text-[#1a1a1a]">{listed.length} donations around you</h3>
                <p className="text-[11px] text-[#4a4a4a]">Tap a pin to see details. Color indicates urgency.</p>
                <div className="mt-3 flex gap-3 text-[11px]">
                  <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-full bg-[#047857]" /><span className="text-[#4a4a4a]">Safe (4h+)</span></div>
                  <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" /><span className="text-[#4a4a4a]">Soon (2-4h)</span></div>
                  <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-full bg-[#dc2626]" /><span className="text-[#4a4a4a]">Urgent (&lt;2h)</span></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NgoStat({ value, label, color, bg }: { value: string; label: string; color: string; bg: string }) {
  return (<div className="flex flex-col items-start p-3.5" style={{ borderRadius: "16px", background: bg }}><div className="text-lg font-bold" style={{ color }}>{value}</div><div className="text-[10px] text-[#4a4a4a]">{label}</div></div>);
}
