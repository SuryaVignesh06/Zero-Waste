"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Search, SlidersHorizontal, MapPin, Clock, Package } from "lucide-react";
import { formatINR } from "./Countdown";

const CATEGORIES = [
  "Nearby", "Bakery", "Fruits & Veg", "Dairy", "Grocery", "Beverages", "Packaged", "Hotels & Kitchens"
];

function getUrgencyDetails(daysLeft: number) {
  if (daysLeft >= 30) return { label: "Fresh", color: "#22C55E", pulse: false };
  if (daysLeft >= 20) return { label: "Saving Soon", color: "#D97706", pulse: false };
  if (daysLeft >= 10) return { label: "High Discount", color: "#F97316", pulse: false };
  if (daysLeft >= 5) return { label: "Urgent", color: "#DC2626", pulse: false };
  return { label: "Critical", color: "#DC2626", pulse: true };
}

export function LocalSavingsMarket() {
  const [activeCategory, setActiveCategory] = useState("Nearby");
  const setScreen = useAppStore((s) => s.setScreen);
  const setActiveProduct = useAppStore((s) => s.setActiveProduct);
  const products = useAppStore((s) => s.products);

  const filteredProducts = activeCategory === "Nearby" 
    ? products 
    : products.filter(p => {
        if (activeCategory === "Bakery") return p.categoryId === "bakery";
        if (activeCategory === "Dairy") return p.categoryId === "dairy";
        if (activeCategory === "Fruits & Veg") return p.categoryId === "fruits" || p.categoryId === "vegetables";
        if (activeCategory === "Beverages") return p.categoryId === "beverages";
        if (activeCategory === "Grocery" || activeCategory === "Packaged") return p.categoryId === "staples" || p.categoryId === "snacks";
        if (activeCategory === "Hotels & Kitchens") return p.categoryId === "cooked";
        return true;
      });

  const handleProductTap = (product: any) => {
    setActiveProduct(product);
    setScreen("productDetailReserve" as any);
  };

  const handleReserveNow = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    setActiveProduct(product);
    setScreen("reservationConfirmation" as any);
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0] overflow-y-auto pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4" style={{ background: "rgba(247,245,240,0.92)", backdropFilter: "blur(16px)" }}>
        <h1 className="text-[22px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
          Local Savings Market
        </h1>
        <button className="flex h-9 items-center justify-center gap-1.5 rounded-[18px] border-[1.5px] border-[#E8E8E4] bg-[#F5F5F7] px-3 shadow-sm active:scale-95 transition-transform">
          <SlidersHorizontal size={14} color="#0A0A0A" />
          <span className="text-[13px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>Filter</span>
        </button>
      </header>

      {/* Search & Location */}
      <div className="mx-5 mt-2">
        <div className="flex h-14 items-center rounded-2xl border-[1.5px] border-[#E8E8E4] bg-[#FAFAF8] px-4">
          <Search size={18} color="#8A8A8A" />
          <input 
            type="text" 
            placeholder="Search discounted products..." 
            className="ml-2 w-full bg-transparent text-[15px] outline-none placeholder:text-[#8A8A8A]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          />
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <MapPin size={14} color="#1A6B3C" />
          <span className="text-[13px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>Vadapalani, Chennai</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mt-4 flex gap-2 overflow-x-auto px-5 pb-2 scrollbar-hide">
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative flex-shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all"
              style={{
                background: isActive ? "#0A0A0A" : "#FFFFFF",
                borderColor: isActive ? "#0A0A0A" : "#E8E8E4",
                color: isActive ? "#FFFFFF" : "#4A4A4A",
                fontFamily: "var(--font-outfit)"
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Stat Banner */}
      <div className="mx-5 mt-4 flex h-[90px] items-center justify-between rounded-[20px] bg-gradient-to-br from-[#F59E0B] to-[#D97706] p-5 shadow-[0_8px_24px_rgba(217,119,6,0.25)]">
        <div className="flex flex-col justify-end h-full">
          <span className="text-[17px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
            ♻️ 20 Shops Saving Food
          </span>
        </div>
        <div className="text-right">
          <span className="text-[28px] font-extrabold text-white leading-none" style={{ fontFamily: "var(--font-outfit)" }}>{products.length}</span>
          <span className="block text-[13px] font-medium text-white/80 mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>Products</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-5 mt-5 grid grid-cols-2 gap-3">
        {filteredProducts.map((p, i) => {
          // Assume mock data has daysToExpiry from older schema or we calculate it.
          const daysLeft = p.daysUntilExpiry || (p as any).daysToExpiry || 2;
          const urgency = getUrgencyDetails(daysLeft);
          const savePct = p.discountPercent || Math.round((1 - p.discountedPrice / p.originalPrice) * 100);

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleProductTap(p)}
              className="flex cursor-pointer flex-col overflow-hidden rounded-[20px] bg-white shadow-sm transition-transform active:scale-95"
            >
              {/* Image Zone */}
              <div className={`relative h-[120px] w-full bg-gradient-to-br ${p.imageColor || 'from-[#E8E8E4] to-[#F5F5F7]'} flex items-center justify-center`}>
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                ) : (
                  <Package size={36} className="text-black/20" />
                )}
                
                {/* Urgency Indicator */}
                <div 
                  className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold text-white shadow-sm ${urgency.pulse ? 'animate-pulse' : ''}`}
                  style={{ background: urgency.color, fontFamily: "var(--font-outfit)" }}
                >
                  {urgency.label}
                </div>
                
                {/* Expiry Text Box */}
                <div className="absolute left-2 top-2 rounded-md bg-black/40 px-1.5 py-0.5 backdrop-blur-md">
                  <span className="text-[9px] font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>{daysLeft}d left</span>
                </div>
              </div>

              {/* Content Zone */}
              <div className="flex flex-1 flex-col p-3.5">
                <span className="text-[10px] uppercase tracking-wider text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {(p as any).shopName || "Local Shop"}
                </span>
                <h3 className="mt-1 line-clamp-2 text-[14px] font-semibold leading-[1.3] text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                  {p.name}
                </h3>

                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-[12px] text-[#AEAEB2] line-through" style={{ fontFamily: "var(--font-jakarta)" }}>{formatINR(p.originalPrice)}</span>
                  <span className="text-[20px] font-bold text-[#1A6B3C]" style={{ fontFamily: "var(--font-outfit)" }}>{formatINR(p.discountedPrice || p.sellingPrice)}</span>
                </div>

                <div className="mt-1 flex items-center gap-1.5">
                  <div className="flex items-center justify-center rounded-[6px] border border-[#C8E8D0] bg-[#F0F7F2] px-1.5 py-0.5">
                    <span className="text-[11px] font-bold text-[#1A6B3C]" style={{ fontFamily: "var(--font-outfit)" }}>Save {savePct}%</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <MapPin size={10} color="#8A8A8A" />
                    <span className="text-[11px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>0.8 km</span>
                  </div>
                  {p.stockQuantity < 10 && (
                    <span className="text-[11px] font-bold text-[#D97706]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {p.stockQuantity || p.quantity || 5} left
                    </span>
                  )}
                </div>

                <button 
                  onClick={(e) => handleReserveNow(e, p)}
                  className="mt-3 flex h-[34px] w-full items-center justify-center rounded-xl border-2 border-[#1A6B3C] text-[13px] font-bold text-[#1A6B3A] transition-colors active:bg-[#1A6B3C] active:text-white"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Reserve Now
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
