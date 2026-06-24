"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, CheckCircle2, CheckSquare, Square, Info } from "lucide-react";

export function FoodRequest() {
  const setScreen = useAppStore((s) => s.setScreen);
  const [success, setSuccess] = useState(false);
  
  // New state for multi-select features
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [requestType, setRequestType] = useState<"free" | "subsidized">("free");
  const [amountType, setAmountType] = useState<"individual" | "bulk">("individual");
  const [urgency, setUrgency] = useState<"High" | "Medium" | "Low">("High");

  const FOOD_TYPES = [
    "Cooked Meals", "Raw Groceries", "Vegetables", "Packaged Snacks", "Dairy", "Bakery Items"
  ];

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  if (success) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#F7F5F0] px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-[#C8E8D0]"
        >
          <CheckCircle2 size={48} className="text-[#1A6B3C]" />
        </motion.div>
        <h2 className="mt-6 text-[24px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Request Sent</h2>
        <p className="mt-2 text-[15px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Nearby NGOs, donors, and partnered shops have been notified of your request.
        </p>
        <button
          onClick={() => setScreen("recipientHome")}
          className="mt-8 flex h-14 w-full max-w-[200px] items-center justify-center rounded-full bg-[#1A6B3C] text-[16px] font-bold text-white shadow-sm"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }} className="bg-[#F7F5F0]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[rgba(247,245,240,0.95)] backdrop-blur-md px-5 pt-12 pb-4 flex items-center">
        <button
          onClick={() => setScreen("recipientHome")}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ArrowLeft size={20} className="text-[#0A0A0A]" />
        </button>
        <h1 className="ml-4 text-[20px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Request Food</h1>
      </div>

      <div className="px-5 pt-6 pb-24 flex flex-col gap-6">
        
        {/* Cost Type Selection */}
        <div className="rounded-[24px] bg-white p-5 shadow-sm">
          <label className="text-[14px] font-bold text-[#0A0A0A] mb-3 block" style={{ fontFamily: "var(--font-outfit)" }}>What kind of support?</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setRequestType("free")}
              className={`flex flex-col items-start p-3 rounded-xl border-2 transition-all ${requestType === 'free' ? 'border-[#1A6B3C] bg-[#F0F7F2]' : 'border-[#E8E8E4] bg-white'}`}
            >
              <span className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Free Food</span>
              <span className="text-[11px] text-[#4A4A4A] mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>From donors/NGOs</span>
            </button>
            <button
              onClick={() => setRequestType("subsidized")}
              className={`flex flex-col items-start p-3 rounded-xl border-2 transition-all ${requestType === 'subsidized' ? 'border-[#D97706] bg-[#FEF3C7]' : 'border-[#E8E8E4] bg-white'}`}
            >
              <span className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Subsidized</span>
              <span className="text-[11px] text-[#4A4A4A] mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>Cheap near-expiry food</span>
            </button>
          </div>
          {requestType === "subsidized" && (
            <div className="mt-3 flex items-start gap-2 bg-[#FEF3C7]/50 p-3 rounded-xl">
              <Info size={16} color="#D97706" className="shrink-0 mt-0.5" />
              <p className="text-[12px] text-[#92400E]" style={{ fontFamily: "var(--font-jakarta)" }}>Your request will be sent to partnered shops who might offer huge discounts.</p>
            </div>
          )}
        </div>

        {/* Amount Selection */}
        <div className="rounded-[24px] bg-white p-5 shadow-sm">
          <label className="text-[14px] font-bold text-[#0A0A0A] mb-3 block" style={{ fontFamily: "var(--font-outfit)" }}>Quantity needed</label>
          <div className="flex gap-3">
            <button
              onClick={() => setAmountType("individual")}
              className={`flex-1 py-3 rounded-xl border-2 font-bold text-[14px] transition-all ${amountType === 'individual' ? 'border-[#1A6B3C] bg-[#F0F7F2] text-[#1A6B3C]' : 'border-[#E8E8E4] text-[#8A8A8A]'}`}
            >
              Small (1-5 People)
            </button>
            <button
              onClick={() => setAmountType("bulk")}
              className={`flex-1 py-3 rounded-xl border-2 font-bold text-[14px] transition-all ${amountType === 'bulk' ? 'border-[#1A6B3C] bg-[#F0F7F2] text-[#1A6B3C]' : 'border-[#E8E8E4] text-[#8A8A8A]'}`}
            >
              Bulk (NGOs/Events)
            </button>
          </div>
        </div>

        {/* Multi-Select Categories */}
        <div className="rounded-[24px] bg-white p-5 shadow-sm">
          <label className="text-[14px] font-bold text-[#0A0A0A] mb-3 block" style={{ fontFamily: "var(--font-outfit)" }}>Select Food Types</label>
          <div className="flex flex-wrap gap-2">
            {FOOD_TYPES.map(type => {
              const isSelected = selectedTypes.includes(type);
              return (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all ${isSelected ? 'border-[#1A6B3C] bg-[#F0F7F2] text-[#1A6B3C]' : 'border-[#E8E8E4] bg-white text-[#4A4A4A]'}`}
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                  <span className="text-[13px] font-medium">{type}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Details */}
        <div className="rounded-[24px] bg-white p-5 shadow-sm">
          <label className="text-[14px] font-bold text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Any other details?</label>
          <textarea
            rows={3}
            placeholder={amountType === 'bulk' ? "e.g. We are an orphanage needing daily bread and milk." : "e.g. I need food for 3 kids today."}
            className="mt-2 w-full resize-none rounded-[16px] border border-[#E8E8E4] p-4 text-[15px] focus:border-[#1A6B3C] focus:outline-none bg-[#F7F5F0]"
          />

          <label className="mt-6 block text-[14px] font-bold text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Urgency</label>
          <div className="mt-2 flex gap-3">
            {["High", "Medium", "Low"].map((u, i) => (
              <button
                key={u}
                onClick={() => setUrgency(u as any)}
                className={`flex-1 rounded-[16px] border py-3 text-[14px] font-bold transition-colors ${
                  urgency === u ? "border-[#1A6B3C] bg-[#F0F7F2] text-[#1A6B3C]" : "border-[#E8E8E4] text-[#8A8A8A]"
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSuccess(true)}
            disabled={selectedTypes.length === 0}
            className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-[#1A6B3C] text-[16px] font-bold text-white shadow-[0px_8px_24px_rgba(26,107,60,0.25)] disabled:opacity-50 disabled:shadow-none"
          >
            Submit Request
          </button>
        </div>

      </div>
    </div>
  );
}
