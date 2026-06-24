"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Clock, Building2, ShieldCheck, Package, Leaf, DollarSign, Cloud, Phone, ShoppingBag, X } from "lucide-react";
import { formatINR } from "./Countdown";

export function ProductDetailReserve() {
  const setScreen = useAppStore((s) => s.setScreen);
  const activeProduct = useAppStore((s) => s.activeProduct);

  if (!activeProduct) {
    return null;
  }

  const daysLeft = (activeProduct as any).daysUntilExpiry || (activeProduct as any).daysToExpiry || 2;
  const isCritical = daysLeft <= 2;
  const originalPrice = (activeProduct as any).mrp || (activeProduct as any).originalPrice;
  const discountedPrice = (activeProduct as any).sellingPrice || (activeProduct as any).discountedPrice;
  const savePct = (activeProduct as any).discountPercent || Math.round((1 - discountedPrice / originalPrice) * 100);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-50 flex flex-col bg-white"
    >
      {/* Hero Image Zone */}
      <div className={`relative h-[280px] w-full bg-gradient-to-br ${(activeProduct as any).imageColor || 'from-[#E8E8E4] to-[#F5F5F7]'} flex items-center justify-center`}>
        {activeProduct.imageUrl ? (
          <img src={activeProduct.imageUrl} alt={activeProduct.name} className="h-full w-full object-cover" />
        ) : (
          <Package size={64} className="text-black/20" />
        )}
        
        {/* Close Button */}
        <button 
          onClick={() => setScreen("localSavingsMarket")}
          className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm"
        >
          <X size={24} color="#0A0A0A" />
        </button>

        {/* Expiry Banner inside Hero */}
        <div className="absolute bottom-5 left-5 right-5 flex h-[52px] items-center justify-between rounded-[14px] bg-[rgba(0,0,0,0.65)] px-4 py-2.5 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Clock size={16} color="white" />
            <span className="text-[14px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>Expires in {daysLeft} days</span>
          </div>
          <div className="rounded-full bg-white/20 px-3 py-1">
            <span className="text-[10px] font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
              {isCritical ? "CRITICAL" : "ATTENTION"}
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-6 pb-32 pt-5">
        {/* Shop Name Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 size={18} color="#0A0A0A" />
            <span className="text-[14px] font-semibold text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              {(activeProduct as any).shopName || "Verified Shopkeeper"}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[#F0F7F2] px-2 py-1">
            <ShieldCheck size={12} color="#1A6B3A" />
            <span className="text-[11px] font-bold text-[#1A6B3A]" style={{ fontFamily: "var(--font-jakarta)" }}>Verified</span>
          </div>
        </div>

        {/* Product Name */}
        <h1 className="mt-3 text-[26px] font-bold leading-tight text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
          {activeProduct.name}
        </h1>

        {/* MRP Block */}
        <div className="mt-4 flex items-end gap-3">
          <div className="flex flex-col">
            <span className="text-[16px] text-[#AEAEB2] line-through" style={{ fontFamily: "var(--font-jakarta)" }}>{formatINR(originalPrice)}</span>
          </div>
          <span className="text-[44px] font-extrabold leading-none text-[#1A6B3C]" style={{ fontFamily: "var(--font-outfit)" }}>
            {formatINR(discountedPrice)}
          </span>
        </div>
        <div className="mt-1.5">
          <span className="inline-block rounded-[6px] border border-[#C8E8D0] bg-[#F0F7F2] px-2 py-0.5 text-[12px] font-bold text-[#1A6B3C]" style={{ fontFamily: "var(--font-outfit)" }}>
            Save {savePct}%
          </span>
        </div>

        {/* Stock Info */}
        <div className="mt-6 flex items-center justify-between rounded-[14px] bg-[#F5F5F7] p-3.5">
          <div className="flex items-center gap-2">
            <Package size={16} color="#4A4A4A" />
            <span className="text-[14px] font-medium text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Stock available: {(activeProduct as any).stockQuantity || (activeProduct as any).quantity || 5} units
            </span>
          </div>
          <span className="text-[13px] font-medium text-[#8A8A8A]">0.8 km</span>
        </div>

        {/* Save Impact Calculator */}
        <div className="mt-5 rounded-[16px] bg-[#F0F7F2] p-4">
          <h3 className="text-[14px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Why you're saving more than money</h3>
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Leaf size={16} color="#1A6B3C" />
              <span className="text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Prevented food waste</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={16} color="#1A6B3C" />
              <span className="text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Saved {formatINR(originalPrice - discountedPrice)} vs retail</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud size={16} color="#1A6B3C" />
              <span className="text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Reduced CO₂ footprint</span>
            </div>
          </div>
        </div>

        {/* Shop Information */}
        <div className="mt-6">
          <h3 className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Shop Details</h3>
          <p className="mt-2 text-[14px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
            Main Road, near Metro Station, Vadapalani, Chennai.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Clock size={14} color="#0A0A0A" />
            <span className="text-[14px] font-medium text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>Open until 10 PM</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Phone size={14} color="#1A6B3C" />
            <span className="text-[14px] font-bold text-[#1A6B3C] underline" style={{ fontFamily: "var(--font-jakarta)" }}>Contact Shop</span>
          </div>
        </div>
      </main>

      {/* Action Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 p-5 pb-8 backdrop-blur-xl border-t border-[rgba(0,0,0,0.05)] shadow-[0_-8px_24px_rgba(0,0,0,0.04)]">
        <button 
          onClick={() => setScreen("reservationConfirmation")}
          className="flex h-[58px] w-full items-center justify-center gap-2 rounded-full bg-[#1A6B3C] text-[17px] font-semibold text-white shadow-[0_8px_24px_rgba(26,107,60,0.25)] active:scale-95 transition-transform"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <ShoppingBag size={22} />
          Reserve This Product
        </button>
        <div className="mt-3 flex gap-3">
          <button className="flex-1 rounded-full border-[1.5px] border-[#E8E8E4] py-3 text-[15px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Share</button>
          <button className="flex-1 rounded-full border-[1.5px] border-[#E8E8E4] py-3 text-[15px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Visit Later</button>
        </div>
      </footer>
    </motion.div>
  );
}
