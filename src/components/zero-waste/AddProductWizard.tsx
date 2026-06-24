"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Camera, Calendar, Tag, ChevronLeft, Package, CheckCircle, Percent } from "lucide-react";
import { formatINR } from "./Countdown";

export function AddProductWizard() {
  const setScreen = useAppStore((s) => s.setScreen);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [productName, setProductName] = useState("");
  const [mrp, setMrp] = useState("");
  const [expiryDays, setExpiryDays] = useState("2");
  const [stock, setStock] = useState("5");
  const [discountPercent, setDiscountPercent] = useState(50);
  const [photoAdded, setPhotoAdded] = useState(false);

  const calculatedDiscountPrice = mrp ? Math.round(Number(mrp) * (1 - discountPercent / 100)) : 0;

  const handleNext = () => setStep(s => Math.min(3, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      // In a real app we'd add it to the store here
      setIsSubmitting(false);
      setScreen("shopkeeperDashboard");
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-[#F7F5F0] px-5 py-4">
        {step > 1 ? (
          <button onClick={handlePrev} className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <ChevronLeft size={24} color="#0A0A0A" />
          </button>
        ) : (
          <button onClick={() => setScreen("shopkeeperDashboard")} className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <ChevronLeft size={24} color="#0A0A0A" />
          </button>
        )}
        <div className="ml-4 flex-1">
          <h1 className="text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            List Product
          </h1>
        </div>
        <div className="text-[14px] font-medium text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
          {step} of 3
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-[#E8E8E4]">
        <motion.div
          className="h-full bg-[#1A6B3C]"
          initial={{ width: "33%" }}
          animate={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <main className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col items-center">
                <div 
                  className={`mt-2 flex h-[160px] w-full flex-col items-center justify-center rounded-[24px] border-2 border-dashed transition-colors ${photoAdded ? 'border-[#1A6B3C] bg-[#F0F7F2]' : 'border-[#E8E8E4] bg-white'}`}
                  onClick={() => setPhotoAdded(true)}
                >
                  {photoAdded ? (
                    <>
                      <CheckCircle size={40} color="#1A6B3C" className="mb-3" />
                      <span className="text-[15px] font-bold text-[#1A6B3C]" style={{ fontFamily: "var(--font-jakarta)" }}>Photo attached</span>
                    </>
                  ) : (
                    <>
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F7] mb-3">
                        <Camera size={24} color="#8A8A8A" />
                      </div>
                      <span className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Take a clear photo</span>
                      <span className="mt-1 text-[13px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>of the product and expiry label</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>Product Name</label>
                <div className="flex items-center rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-3 shadow-sm">
                  <Package size={20} color="#8A8A8A" />
                  <input
                    className="ml-3 w-full bg-transparent text-[16px] outline-none placeholder:text-[#AEAEB2]"
                    placeholder="e.g., Britannia Milk Bread"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-2">
                  <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>MRP (₹)</label>
                  <div className="flex items-center rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-3 shadow-sm">
                    <span className="text-[16px] font-bold text-[#4A4A4A]">₹</span>
                    <input
                      type="number"
                      className="ml-2 w-full bg-transparent text-[16px] font-bold outline-none placeholder:text-[#AEAEB2]"
                      placeholder="0.00"
                      value={mrp}
                      onChange={(e) => setMrp(e.target.value)}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>Stock</label>
                  <div className="flex items-center rounded-[16px] border border-[#E8E8E4] bg-white px-4 py-3 shadow-sm">
                    <input
                      type="number"
                      className="w-full bg-transparent text-[16px] font-bold outline-none placeholder:text-[#AEAEB2]"
                      placeholder="Units"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>Expiry Date / Shelf Life</label>
                <div className="grid grid-cols-3 gap-2">
                  {["1", "2", "3"].map(days => (
                    <button
                      key={days}
                      onClick={() => setExpiryDays(days)}
                      className="rounded-[16px] border-2 py-3 text-[15px] font-bold transition-colors"
                      style={{
                        borderColor: expiryDays === days ? "#F59E0B" : "#E8E8E4",
                        backgroundColor: expiryDays === days ? "#FEF3C7" : "white",
                        color: expiryDays === days ? "#D97706" : "#4A4A4A",
                        fontFamily: "var(--font-jakarta)"
                      }}
                    >
                      {days} Day{days !== "1" ? "s" : ""}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#0A0A0A] uppercase tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>Set Discount</label>
                <div className="rounded-[20px] bg-white p-5 shadow-sm border border-[#E8E8E4]">
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[28px] font-extrabold text-[#1A6B3C]" style={{ fontFamily: "var(--font-outfit)" }}>{discountPercent}% OFF</span>
                  </div>

                  <input 
                    type="range" 
                    min="10" 
                    max="90" 
                    step="5"
                    value={discountPercent} 
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full h-2 bg-[#E8E8E4] rounded-lg appearance-none cursor-pointer accent-[#1A6B3C]"
                  />
                  <div className="flex justify-between mt-2 px-1">
                    <span className="text-[12px] font-bold text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>10%</span>
                    <span className="text-[12px] font-bold text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>90%</span>
                  </div>

                </div>
              </div>

              {/* Price Preview */}
              <div className="mt-4 flex flex-col items-center rounded-[24px] bg-[#1A6B3C] p-6 text-white shadow-[0_8px_24px_rgba(26,107,60,0.25)]">
                <span className="text-[14px] font-medium opacity-80" style={{ fontFamily: "var(--font-jakarta)" }}>Selling Price</span>
                <span className="mt-1 text-[48px] font-extrabold leading-none" style={{ fontFamily: "var(--font-outfit)" }}>
                  {formatINR(calculatedDiscountPrice)}
                </span>
                <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-[12px] font-bold">
                  Original: {formatINR(Number(mrp) || 0)}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 p-5 pb-8 backdrop-blur-xl border-t border-[rgba(0,0,0,0.05)]">
        {step < 3 ? (
          <button
            onClick={handleNext}
            disabled={step === 1 && (!productName || !photoAdded)}
            className="flex h-[56px] w-full items-center justify-center rounded-full bg-[#0A0A0A] text-[17px] font-bold text-white transition-opacity disabled:opacity-50"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !mrp}
            className="flex h-[56px] w-full items-center justify-center rounded-full bg-[#1A6B3C] text-[17px] font-bold text-white shadow-[0_8px_24px_rgba(26,107,60,0.25)] transition-opacity disabled:opacity-50"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {isSubmitting ? (
              <span className="animate-pulse">Listing Product...</span>
            ) : (
              "Publish Listing"
            )}
          </button>
        )}
      </footer>
    </div>
  );
}
