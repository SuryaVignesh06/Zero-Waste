"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  ChevronLeft, Camera, Sparkles, Check, MapPin, Clock,
  Calendar, Utensils, Apple, Package, ChevronRight, PartyPopper, Loader2,
} from "lucide-react";

const CATEGORIES = [
  { id: "cooked", label: "Cooked Food", icon: Utensils },
  { id: "raw", label: "Raw / Vegetables", icon: Apple },
  { id: "packaged", label: "Packaged", icon: Package },
];

const AI_RECOGNITION_RESULT = {
  title: "Veg Biryani + Curd Rice (Serves ~15)",
  category: "cooked",
  quantity: 15, servings: 15, aiFreshness: 0.92, suggestedExpiry: 5,
  detectedItems: ["Vegetable biryani (~10 servings)", "Curd rice (~5 servings)", "Sealed packaging detected"],
};

export function DonateFood() {
  const step = useAppStore((s) => s.donateStep);
  const setStep = useAppStore((s) => s.setDonateStep);
  const form = useAppStore((s) => s.donateForm);
  const setForm = useAppStore((s) => s.setDonateForm);
  const resetForm = useAppStore((s) => s.resetDonateForm);
  const setScreen = useAppStore((s) => s.setScreen);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDone, setAiDone] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleAiRecognize = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false); setAiDone(true);
      setForm({ title: AI_RECOGNITION_RESULT.title, category: AI_RECOGNITION_RESULT.category, quantity: AI_RECOGNITION_RESULT.quantity, servings: AI_RECOGNITION_RESULT.servings, expiryHours: AI_RECOGNITION_RESULT.suggestedExpiry, aiRecognized: true });
    }, 1800);
  };

  const handleConfirm = () => { setConfirmed(true); setTimeout(() => { resetForm(); setConfirmed(false); setScreen("home"); }, 2200); };
  const canProceed = (step === 1 && form.title && form.quantity > 0) || (step === 2 && form.pickupAddress) || step === 3;

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#f5f1ed]">
      {/* Header */}
      <div className="bg-white px-5 pb-4 pt-5" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div className="mb-4 flex items-center gap-3">
          <button onClick={() => { if (step === 1) setScreen("home"); else setStep(step - 1); }} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3efe9] active:scale-95">
            <ChevronLeft size={18} className="text-[#1a1a1a]" />
          </button>
          <h1 className="text-lg font-bold tracking-tight text-[#1a1a1a]">Donate Food</h1>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <motion.div animate={{ backgroundColor: step >= s ? "#047857" : "#d1d5db", scale: step === s ? 1.1 : 1 }} className="flex h-7 w-7 items-center justify-center rounded-full">
                  {step > s ? <Check size={14} strokeWidth={3} className="text-white" /> : <span className="text-[12px] font-bold text-white">{s}</span>}
                </motion.div>
                <span className={`text-[11px] font-semibold ${step >= s ? "text-[#1a1a1a]" : "text-[#8e8e93]"}`}>{["What", "When & Where", "Review"][i]}</span>
              </div>
              {i < 2 && (<div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-[#d1d5db]"><motion.div initial={false} animate={{ width: step > s ? "100%" : "0%" }} transition={{ duration: 0.3 }} className="absolute inset-y-0 left-0 bg-[#047857]" /></div>)}
            </div>
          ))}
        </div>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "100px" }}>
        <div className="px-5 pt-5">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="bg-white p-5" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
                  <h2 className="text-base font-bold text-[#1a1a1a]">Add photos of the food</h2>
                  <p className="mt-1 text-[12px] text-[#4a4a4a]">Our AI will identify the food and suggest details</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <button onClick={handleAiRecognize} className="relative flex aspect-square flex-col items-center justify-center gap-1 border-2 border-dashed border-[#86efac] bg-[#ecfdf5] active:scale-95" style={{ borderRadius: "16px" }}>
                      {aiLoading ? <Loader2 size={20} className="animate-spin text-[#047857]" /> : aiDone ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-full w-full flex-col items-center justify-center" style={{ borderRadius: "14px", background: "linear-gradient(135deg, #d1fae5, #a7f3d0)" }}>
                          <Check size={24} className="text-[#047857]" />
                        </motion.div>
                      ) : (<><Camera size={22} className="text-[#047857]" /><span className="text-[10px] font-semibold text-[#047857]">Add photo</span></>)}
                    </button>
                    {[0, 1].map((i) => (<div key={i} className="flex aspect-square items-center justify-center border border-dashed border-[#e8e3dd] bg-[#faf7f3]" style={{ borderRadius: "16px" }}><Camera size={18} className="text-[#8e8e93]" /></div>))}
                  </div>
                  <AnimatePresence>
                    {aiDone && (
                      <motion.div initial={{ y: 20, opacity: 0, height: 0 }} animate={{ y: 0, opacity: 1, height: "auto" }} exit={{ y: -20, opacity: 0, height: 0 }} className="mt-4 overflow-hidden p-4" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #ecfdf5, #ffffff)" }}>
                        <div className="flex items-center gap-2">
                          <div className="zw-ai-border h-7 w-7 rounded-lg p-[1.5px]"><div className="flex h-full w-full items-center justify-center rounded-[6px] bg-white"><Sparkles size={13} className="text-[#047857]" /></div></div>
                          <span className="text-[13px] font-bold text-[#1a1a1a]">AI Recognition Complete</span>
                          <span className="ml-auto rounded-full bg-[#ecfdf5] px-2 py-0.5 text-[10px] font-bold text-[#047857]">{Math.round(AI_RECOGNITION_RESULT.aiFreshness * 100)}% fresh</span>
                        </div>
                        <div className="mt-3 space-y-1.5">
                          {AI_RECOGNITION_RESULT.detectedItems.map((item, i) => (<motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-2"><Check size={12} strokeWidth={3} className="text-[#047857]" /><span className="text-[12px] text-[#4a4a4a]">{item}</span></motion.div>))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-4 bg-white p-5" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
                  <label className="text-[12px] font-semibold text-[#1a1a1a]">Food title</label>
                  <input value={form.title} onChange={(e) => setForm({ title: e.target.value })} placeholder="e.g., Wedding Reception Surplus" className="mt-1.5 h-12 w-full bg-[#faf7f3] px-3 text-[13px] text-[#1a1a1a] placeholder:text-[#8e8e93] focus:outline-none focus:ring-2 focus:ring-[#86efac]" style={{ borderRadius: "14px" }} />
                  <label className="mt-4 block text-[12px] font-semibold text-[#1a1a1a]">Category</label>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {CATEGORIES.map((c) => { const Icon = c.icon; const active = form.category === c.id; return (
                      <button key={c.id} onClick={() => setForm({ category: c.id })} className="flex flex-col items-center gap-1.5 p-3 transition-all" style={{ borderRadius: "14px", background: active ? "#ecfdf5" : "#faf7f3", border: active ? "2px solid #047857" : "2px solid transparent" }}>
                        <Icon size={20} className={active ? "text-[#047857]" : "text-[#8e8e93]"} />
                        <span className={`text-[10px] font-semibold ${active ? "text-[#047857]" : "text-[#4a4a4a]"}`}>{c.label}</span>
                      </button> ); })}
                  </div>
                  <label className="mt-4 block text-[12px] font-semibold text-[#1a1a1a]">Number of servings</label>
                  <div className="mt-1.5 flex items-center gap-2">
                    <button onClick={() => setForm({ quantity: Math.max(1, form.quantity - 5), servings: Math.max(1, form.quantity - 5) })} className="flex h-12 w-12 items-center justify-center bg-[#f3efe9] text-xl font-bold text-[#1a1a1a] active:scale-95" style={{ borderRadius: "14px" }}>-</button>
                    <div className="flex h-12 flex-1 items-center justify-center bg-[#faf7f3]" style={{ borderRadius: "14px" }}><span className="text-base font-bold">{form.servings}</span><span className="ml-1 text-[12px] text-[#4a4a4a]">servings</span></div>
                    <button onClick={() => setForm({ quantity: form.quantity + 5, servings: form.servings + 5 })} className="flex h-12 w-12 items-center justify-center bg-[#f3efe9] text-xl font-bold text-[#1a1a1a] active:scale-95" style={{ borderRadius: "14px" }}>+</button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="bg-white p-5" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
                  <h2 className="text-base font-bold text-[#1a1a1a]">Pickup location & timing</h2>
                  <p className="mt-1 text-[12px] text-[#4a4a4a]">NGO volunteers need this info to plan pickup</p>
                  <div className="mt-4 relative h-40 overflow-hidden bg-[#f3efe9]" style={{ borderRadius: "18px" }}>
                    <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(0deg, #e8e3dd 1px, transparent 1px), linear-gradient(90deg, #e8e3dd 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="zw-urgency-pulse-amber relative flex h-9 w-9 items-center justify-center rounded-full bg-[#d97706] ring-4 ring-white"><MapPin size={16} className="text-white" /></div>
                    </motion.div>
                    <div className="absolute bottom-2 right-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-[#4a4a4a]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>Anna Nagar, Chennai</div>
                  </div>
                  <label className="mt-4 block text-[12px] font-semibold text-[#1a1a1a]">Pickup address</label>
                  <textarea value={form.pickupAddress} onChange={(e) => setForm({ pickupAddress: e.target.value })} placeholder="Flat / House no, Street, Area, Landmark" rows={3} className="mt-1.5 w-full bg-[#faf7f3] p-3 text-[13px] text-[#1a1a1a] placeholder:text-[#8e8e93] focus:outline-none focus:ring-2 focus:ring-[#86efac]" style={{ borderRadius: "14px" }} />
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div><label className="text-[12px] font-semibold text-[#1a1a1a]">Pickup from</label><div className="mt-1.5 flex h-12 items-center gap-2 bg-[#faf7f3] px-3" style={{ borderRadius: "14px" }}><Clock size={14} className="text-[#8e8e93]" /><span className="text-[13px] font-medium text-[#1a1a1a]">Now</span></div></div>
                    <div><label className="text-[12px] font-semibold text-[#1a1a1a]">Until</label><div className="mt-1.5 flex h-12 items-center gap-2 bg-[#faf7f3] px-3" style={{ borderRadius: "14px" }}><Calendar size={14} className="text-[#8e8e93]" /><span className="text-[13px] font-medium text-[#1a1a1a]">in 2 hours</span></div></div>
                  </div>
                </div>
                <div className="mt-4 bg-white p-5" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
                  <div className="flex items-center gap-2"><div className="zw-ai-border h-7 w-7 rounded-lg p-[1.5px]"><div className="flex h-full w-full items-center justify-center rounded-[6px] bg-white"><Sparkles size={13} className="text-[#047857]" /></div></div><span className="text-[12px] font-bold text-[#1a1a1a]">AI suggests expiry window</span></div>
                  <p className="mt-1 text-[11px] text-[#4a4a4a]">Based on the food type and storage, consume within:</p>
                  <div className="mt-2 flex items-center gap-2">
                    {[3, 5, 8].map((h) => (<button key={h} onClick={() => setForm({ expiryHours: h })} className="rounded-full px-4 py-2 text-[11px] font-semibold transition-all active:scale-95" style={{ background: form.expiryHours === h ? "linear-gradient(135deg, #047857, #064e3b)" : "#f3efe9", color: form.expiryHours === h ? "#ffffff" : "#4a4a4a" }}>{h} hours</button>))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <div className="bg-white p-5" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
                  <h2 className="text-base font-bold text-[#1a1a1a]">Review your donation</h2>
                  <p className="mt-1 text-[12px] text-[#4a4a4a]">Make sure everything looks correct</p>
                  <div className="mt-4 flex items-center gap-3 border-b border-[#f3efe9] pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0)" }}><Utensils size={22} className="text-[#047857]" /></div>
                    <div className="flex-1"><h3 className="text-[14px] font-bold text-[#1a1a1a]">{form.title || "Veg Biryani + Curd Rice"}</h3><p className="text-[11px] text-[#4a4a4a]">{form.servings} servings · {form.category} food</p></div>
                  </div>
                  <div className="divide-y divide-[#f3efe9]">
                    <SummaryRow icon={<MapPin size={14} />} label="Pickup address" value={form.pickupAddress || "Anna Nagar, Chennai"} />
                    <SummaryRow icon={<Clock size={14} />} label="Pickup window" value="Now — in 2 hours" />
                    <SummaryRow icon={<Sparkles size={14} />} label="AI expiry window" value={`${form.expiryHours} hours from now`} />
                    <SummaryRow icon={<Calendar size={14} />} label="NGO preference" value="Auto-match nearest NGO" />
                  </div>
                </div>
                <div className="mt-4 p-5 text-white" style={{ borderRadius: "20px", background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 8px 24px rgba(4, 120, 87, 0.25)" }}>
                  <div className="flex items-center gap-2"><Sparkles size={16} className="text-white" /><span className="text-[13px] font-bold">Predicted Impact</span></div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div><div className="text-xl font-bold">{form.servings}</div><div className="text-[10px] text-white/80">Meals saved</div></div>
                    <div><div className="text-xl font-bold">{(form.servings * 0.4).toFixed(1)}kg</div><div className="text-[10px] text-white/80">CO2 saved</div></div>
                    <div><div className="text-xl font-bold">+{form.servings * 3}</div><div className="text-[10px] text-white/80">Points</div></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <div className="bg-white px-5 py-3" style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
        <motion.button whileTap={{ scale: 0.97 }} disabled={!canProceed} onClick={() => { if (step === 3) handleConfirm(); else setStep(step + 1); }} className="flex h-12 w-full items-center justify-center gap-2 text-[14px] font-semibold text-white disabled:opacity-50" style={{ borderRadius: "14px", background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 4px 12px rgba(4, 120, 87, 0.25)" }}>
          {step === 3 ? (<><PartyPopper size={18} />Confirm Donation</>) : (<>Continue<ChevronRight size={16} strokeWidth={2.5} /></>)}
        </motion.button>
      </div>

      <AnimatePresence>
        {confirmed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white px-8">
            <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 14 }} className="flex h-24 w-24 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 16px 40px rgba(4, 120, 87, 0.35)" }}><Check size={48} strokeWidth={3} className="text-white" /></motion.div>
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 text-xl font-bold text-[#1a1a1a]">Donation listed!</motion.h2>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-2 text-center text-[13px] text-[#4a4a4a]">NGOs within 5km have been notified. You'll get a notification when someone accepts.</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (<div className="flex items-start gap-3 p-4"><div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-[#ecfdf5] text-[#047857]">{icon}</div><div className="flex-1"><div className="text-[11px] font-medium uppercase tracking-wide text-[#8e8e93]">{label}</div><div className="mt-0.5 text-[13px] font-semibold text-[#1a1a1a]">{value}</div></div></div>);
}
