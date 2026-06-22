"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  ChevronLeft,
  Camera,
  Sparkles,
  Check,
  MapPin,
  Clock,
  Calendar,
  Utensils,
  Apple,
  Package,
  ChevronRight,
  PartyPopper,
  Loader2,
} from "lucide-react";

const displayFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const CATEGORIES = [
  { id: "cooked", label: "Cooked Food", icon: Utensils },
  { id: "raw", label: "Raw / Vegetables", icon: Apple },
  { id: "packaged", label: "Packaged", icon: Package },
];

const AI_RECOGNITION_RESULT = {
  title: "Veg Biryani + Curd Rice (Serves ~15)",
  category: "cooked",
  quantity: 15,
  servings: 15,
  aiFreshness: 0.92,
  suggestedExpiry: 5,
  detectedItems: [
    "Vegetable biryani (~10 servings)",
    "Curd rice (~5 servings)",
    "Sealed packaging detected",
  ],
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
      setAiLoading(false);
      setAiDone(true);
      setForm({
        title: AI_RECOGNITION_RESULT.title,
        category: AI_RECOGNITION_RESULT.category,
        quantity: AI_RECOGNITION_RESULT.quantity,
        servings: AI_RECOGNITION_RESULT.servings,
        expiryHours: AI_RECOGNITION_RESULT.suggestedExpiry,
        aiRecognized: true,
      });
    }, 1800);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      resetForm();
      setConfirmed(false);
      setScreen("home");
    }, 2200);
  };

  const canProceed =
    (step === 1 && form.title && form.quantity > 0) ||
    (step === 2 && form.pickupAddress) ||
    step === 3;

  return (
    <div className="flex h-full flex-col bg-[#FCFCF9]">
      {/* Header */}
      <div className="bg-white px-5 pb-4 pt-5" style={{ boxShadow: "0 2px 12px rgba(17, 24, 39, 0.04)" }}>
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => {
              if (step === 1) setScreen("home");
              else setStep(step - 1);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5f9] active:scale-95"
          >
            <ChevronLeft size={18} className="text-[#111827]" />
          </button>
          <h1
            className="text-lg font-bold tracking-tight text-[#111827]"
            style={{ fontFamily: displayFont }}
          >
            Donate Food
          </h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor:
                      step >= s ? "#16A34A" : "#e2e8f0",
                    scale: step === s ? 1.1 : 1,
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                >
                  {step > s ? (
                    <Check size={14} strokeWidth={3} className="text-white" />
                  ) : (
                    <span className="text-[12px] font-bold text-white">{s}</span>
                  )}
                </motion.div>
                <span
                  className={`text-[11px] font-semibold ${step >= s ? "text-[#111827]" : "text-[#94a3b8]"}`}
                >
                  {["What", "When & Where", "Review"][i]}
                </span>
              </div>
              {i < 2 && (
                <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-[#e2e8f0]">
                  <motion.div
                    initial={false}
                    animate={{ width: step > s ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-y-0 left-0 bg-[#16A34A]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Steps — scrollable */}
      <main className="flex-1 overflow-y-auto zw-scroll px-5 pb-32 pt-5">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Food image uploader card */}
              <div className="bg-white p-5" style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
                <h2
                  className="text-base font-bold text-[#111827]"
                  style={{ fontFamily: displayFont }}
                >
                  Add photos of the food
                </h2>
                <p className="mt-1 text-[12px] text-[#64748b]">
                  Our AI will identify the food and suggest details
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button
                    onClick={handleAiRecognize}
                    className="relative flex aspect-square flex-col items-center justify-center gap-1 border-2 border-dashed border-[#86efac] bg-[#f0fdf4] active:scale-95"
                    style={{ borderRadius: 22 }}
                  >
                    {aiLoading ? (
                      <Loader2 size={20} className="animate-spin text-[#16A34A]" />
                    ) : aiDone ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex h-full w-full flex-col items-center justify-center"
                        style={{
                          borderRadius: 20,
                          background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                        }}
                      >
                        <Check size={24} className="text-[#16A34A]" />
                      </motion.div>
                    ) : (
                      <>
                        <Camera size={22} className="text-[#16A34A]" />
                        <span className="text-[10px] font-semibold text-[#16A34A]">
                          Add photo
                        </span>
                      </>
                    )}
                  </button>
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="flex aspect-square items-center justify-center border border-dashed border-[#e5e7eb] bg-[#f8fafc]"
                      style={{ borderRadius: 22 }}
                    >
                      <Camera size={18} className="text-[#94a3b8]" />
                    </div>
                  ))}
                </div>

                {/* AI recognition result */}
                <AnimatePresence>
                  {aiDone && (
                    <motion.div
                      initial={{ y: 20, opacity: 0, height: 0 }}
                      animate={{ y: 0, opacity: 1, height: "auto" }}
                      exit={{ y: -20, opacity: 0, height: 0 }}
                      className="mt-4 overflow-hidden p-4"
                      style={{
                        borderRadius: 22,
                        background: "linear-gradient(135deg, #f0fdf4, #ffffff)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="zw-ai-border h-7 w-7 rounded-lg p-[1.5px]">
                          <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-white">
                            <Sparkles size={13} className="text-[#16A34A]" />
                          </div>
                        </div>
                        <span
                          className="text-[13px] font-bold text-[#111827]"
                          style={{ fontFamily: displayFont }}
                        >
                          AI Recognition Complete
                        </span>
                        <span className="ml-auto rounded-full bg-[#f0fdf4] px-2 py-0.5 text-[10px] font-bold text-[#16A34A]">
                          {Math.round(AI_RECOGNITION_RESULT.aiFreshness * 100)}% fresh
                        </span>
                      </div>
                      <div className="mt-3 space-y-1.5">
                        {AI_RECOGNITION_RESULT.detectedItems.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <Check
                              size={12}
                              strokeWidth={3}
                              className="text-[#16A34A]"
                            />
                            <span className="text-[12px] text-[#64748b]">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Description card */}
              <div className="mt-4 bg-white p-5" style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
                <label className="text-[12px] font-semibold text-[#111827]">
                  Food title
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ title: e.target.value })}
                  placeholder="e.g., Wedding Reception Surplus"
                  className="mt-1.5 h-12 w-full bg-[#f8fafc] px-3 text-[13px] text-[#111827] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#86efac]"
                  style={{ borderRadius: 22 }}
                />

                <label className="mt-4 block text-[12px] font-semibold text-[#111827]">
                  Category
                </label>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {CATEGORIES.map((c) => {
                    const Icon = c.icon;
                    const active = form.category === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setForm({ category: c.id })}
                        className="flex flex-col items-center gap-1.5 p-3 transition-all"
                        style={{
                          borderRadius: 22,
                          background: active ? "#f0fdf4" : "#f8fafc",
                          border: active
                            ? "2px solid #16A34A"
                            : "2px solid transparent",
                        }}
                      >
                        <Icon
                          size={20}
                          className={
                            active ? "text-[#16A34A]" : "text-[#94a3b8]"
                          }
                        />
                        <span
                          className={`text-[10px] font-semibold ${active ? "text-[#16A34A]" : "text-[#64748b]"}`}
                        >
                          {c.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <label className="mt-4 block text-[12px] font-semibold text-[#111827]">
                  Number of servings
                </label>
                <div className="mt-1.5 flex items-center gap-2">
                  <button
                    onClick={() =>
                      setForm({
                        quantity: Math.max(1, form.quantity - 5),
                        servings: Math.max(1, form.quantity - 5),
                      })
                    }
                    className="flex h-12 w-12 items-center justify-center bg-[#f1f5f9] text-xl font-bold text-[#111827] active:scale-95"
                    style={{ borderRadius: 22 }}
                  >
                    -
                  </button>
                  <div className="flex h-12 flex-1 items-center justify-center bg-[#f8fafc]" style={{ borderRadius: 22 }}>
                    <span
                      className="text-base font-bold"
                      style={{ fontFamily: displayFont }}
                    >
                      {form.servings}
                    </span>
                    <span className="ml-1 text-[12px] text-[#64748b]">servings</span>
                  </div>
                  <button
                    onClick={() =>
                      setForm({
                        quantity: form.quantity + 5,
                        servings: form.servings + 5,
                      })
                    }
                    className="flex h-12 w-12 items-center justify-center bg-[#f1f5f9] text-xl font-bold text-[#111827] active:scale-95"
                    style={{ borderRadius: 22 }}
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Location card with mini map */}
              <div className="bg-white p-5" style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
                <h2
                  className="text-base font-bold text-[#111827]"
                  style={{ fontFamily: displayFont }}
                >
                  Pickup location & timing
                </h2>
                <p className="mt-1 text-[12px] text-[#64748b]">
                  NGO volunteers need this info to plan pickup
                </p>

                {/* Mini map */}
                <div className="mt-4 relative h-44 overflow-hidden bg-[#f1f5f9]" style={{ borderRadius: 28 }}>
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "linear-gradient(0deg, #e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="zw-urgency-pulse-amber relative flex h-9 w-9 items-center justify-center rounded-full bg-[#f59e0b] ring-4 ring-white" style={{ boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)" }}>
                      <MapPin size={16} className="text-white" />
                    </div>
                  </motion.div>
                  <div className="absolute bottom-2 right-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-[#64748b]" style={{ boxShadow: "0 2px 8px rgba(17, 24, 39, 0.08)" }}>
                    Anna Nagar, Chennai
                  </div>
                </div>

                <label className="mt-4 block text-[12px] font-semibold text-[#111827]">
                  Pickup address
                </label>
                <textarea
                  value={form.pickupAddress}
                  onChange={(e) => setForm({ pickupAddress: e.target.value })}
                  placeholder="Flat / House no, Street, Area, Landmark"
                  rows={3}
                  className="mt-1.5 w-full bg-[#f8fafc] p-3 text-[13px] text-[#111827] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#86efac]"
                  style={{ borderRadius: 22 }}
                />

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-semibold text-[#111827]">
                      Pickup from
                    </label>
                    <div className="mt-1.5 flex h-12 items-center gap-2 bg-[#f8fafc] px-3" style={{ borderRadius: 22 }}>
                      <Clock size={14} className="text-[#94a3b8]" />
                      <span className="text-[13px] font-medium text-[#111827]">Now</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-[#111827]">
                      Until
                    </label>
                    <div className="mt-1.5 flex h-12 items-center gap-2 bg-[#f8fafc] px-3" style={{ borderRadius: 22 }}>
                      <Calendar size={14} className="text-[#94a3b8]" />
                      <span className="text-[13px] font-medium text-[#111827]">in 2 hours</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI expiry suggestion */}
              <div className="mt-4 bg-white p-5" style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
                <div className="flex items-center gap-2">
                  <div className="zw-ai-border h-7 w-7 rounded-lg p-[1.5px]">
                    <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-white">
                      <Sparkles size={13} className="text-[#16A34A]" />
                    </div>
                  </div>
                  <span
                    className="text-[12px] font-bold text-[#111827]"
                    style={{ fontFamily: displayFont }}
                  >
                    AI suggests expiry window
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#64748b]">
                  Based on the food type and storage, consume within:
                </p>
                <div className="mt-2 flex items-center gap-2">
                  {[3, 5, 8].map((h) => (
                    <button
                      key={h}
                      onClick={() => setForm({ expiryHours: h })}
                      className="rounded-full px-4 py-2 text-[11px] font-semibold transition-all active:scale-95"
                      style={{
                        background:
                          form.expiryHours === h
                            ? "linear-gradient(135deg, #16a34a, #15803d)"
                            : "#f1f5f9",
                        color: form.expiryHours === h ? "#ffffff" : "#64748b",
                      }}
                    >
                      {h} hours
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white p-5" style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
                <h2
                  className="text-base font-bold text-[#111827]"
                  style={{ fontFamily: displayFont }}
                >
                  Review your donation
                </h2>
                <p className="mt-1 text-[12px] text-[#64748b]">
                  Make sure everything looks correct
                </p>

                <div className="mt-4 flex items-center gap-3 border-b border-[#f1f5f9] pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg, #dcfce7, #bbf7d0)" }}>
                    <Utensils size={22} className="text-[#16A34A]" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-[14px] font-bold text-[#111827]"
                      style={{ fontFamily: displayFont }}
                    >
                      {form.title || "Veg Biryani + Curd Rice"}
                    </h3>
                    <p className="text-[11px] text-[#64748b]">
                      {form.servings} servings · {form.category} food
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-[#f1f5f9]">
                  <SummaryRow icon={<MapPin size={14} />} label="Pickup address" value={form.pickupAddress || "Anna Nagar, Chennai"} />
                  <SummaryRow icon={<Clock size={14} />} label="Pickup window" value="Now — in 2 hours" />
                  <SummaryRow icon={<Sparkles size={14} />} label="AI expiry window" value={`${form.expiryHours} hours from now`} />
                  <SummaryRow icon={<Calendar size={14} />} label="NGO preference" value="Auto-match nearest NGO" />
                </div>
              </div>

              {/* Impact preview */}
              <div
                className="mt-4 p-5 text-white"
                style={{
                  borderRadius: 32,
                  background: "linear-gradient(135deg, #16a34a, #15803d)",
                  boxShadow: "0 8px 32px rgba(22, 163, 74, 0.25)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-white" />
                  <span
                    className="text-[13px] font-bold"
                    style={{ fontFamily: displayFont }}
                  >
                    Predicted Impact
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div
                      className="text-xl font-bold"
                      style={{ fontFamily: displayFont }}
                    >
                      {form.servings}
                    </div>
                    <div className="text-[10px] text-white/80">Meals saved</div>
                  </div>
                  <div>
                    <div
                      className="text-xl font-bold"
                      style={{ fontFamily: displayFont }}
                    >
                      {(form.servings * 0.4).toFixed(1)}kg
                    </div>
                    <div className="text-[10px] text-white/80">CO2 saved</div>
                  </div>
                  <div>
                    <div
                      className="text-xl font-bold"
                      style={{ fontFamily: displayFont }}
                    >
                      +{form.servings * 3}
                    </div>
                    <div className="text-[10px] text-white/80">Points</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* CTA */}
      <div className="bg-white px-5 py-3" style={{ boxShadow: "0 -4px 20px rgba(17, 24, 39, 0.06)" }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={!canProceed}
          onClick={() => {
            if (step === 3) handleConfirm();
            else setStep(step + 1);
          }}
          className="flex h-12 w-full items-center justify-center gap-2 text-[14px] font-semibold text-white disabled:opacity-50"
          style={{
            borderRadius: 22,
            background: "linear-gradient(135deg, #16a34a, #15803d)",
            boxShadow: "0 4px 16px rgba(22, 163, 74, 0.25)",
          }}
        >
          {step === 3 ? (
            <>
              <PartyPopper size={18} />
              Confirm Donation
            </>
          ) : (
            <>
              Continue
              <ChevronRight size={16} strokeWidth={2.5} />
            </>
          )}
        </motion.button>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white px-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                background: "linear-gradient(135deg, #16a34a, #15803d)",
                boxShadow: "0 16px 40px rgba(22, 163, 74, 0.35)",
              }}
            >
              <Check size={48} strokeWidth={3} className="text-white" />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-xl font-bold text-[#111827]"
              style={{ fontFamily: displayFont }}
            >
              Donation listed!
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-center text-[13px] text-[#64748b]"
            >
              NGOs within 5km have been notified. You'll get a notification when someone accepts.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4">
      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-[#f0fdf4] text-[#16A34A]">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[11px] font-medium uppercase tracking-wide text-[#94a3b8]">
          {label}
        </div>
        <div
          className="mt-0.5 text-[13px] font-semibold text-[#111827]"
          style={{ fontFamily: displayFont }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
