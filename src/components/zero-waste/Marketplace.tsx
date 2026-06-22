"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ProductCard } from "./ProductCard";
import { formatINR } from "./Countdown";
import { Search, SlidersHorizontal, Mic, ShoppingBag } from "lucide-react";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "expiring-today", label: "Expiring today" },
  { id: "under-50", label: "Under \u20B950" },
  { id: "over-50-off", label: "Over 50% off" },
  { id: "within-1km", label: "Within 1km" },
  { id: "ai-match", label: "AI matched" },
];

export function Marketplace() {
  const products = useAppStore((s) => s.products);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const cartCount = useAppStore((s) => s.cartCount);
  const cartTotal = useAppStore((s) => s.cartTotal);
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"relevance" | "price-low" | "distance" | "expiry">("relevance");

  const filtered = useMemo(() => {
    let list = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.shopName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    switch (activeFilter) {
      case "expiring-today":
        list = list.filter((p) => (new Date(p.bestBefore).getTime() - Date.now()) / 86400000 <= 1.5);
        break;
      case "under-50":
        list = list.filter((p) => p.discountedPrice < 50);
        break;
      case "over-50-off":
        list = list.filter((p) => (p.originalPrice - p.discountedPrice) / p.originalPrice > 0.5);
        break;
      case "within-1km":
        list = list.filter((p) => p.shopDistanceKm <= 1);
        break;
      case "ai-match":
        list = list.filter((p) => p.isAiMatch);
        break;
    }
    switch (sort) {
      case "price-low":
        list.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "distance":
        list.sort((a, b) => a.shopDistanceKm - b.shopDistanceKm);
        break;
      case "expiry":
        list.sort((a, b) => new Date(a.bestBefore).getTime() - new Date(b.bestBefore).getTime());
        break;
    }
    return list;
  }, [products, activeFilter, query, sort]);

  const hasItems = cartCount() > 0;

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#f5f1ed]">
      {/* Header */}
      <div className="px-5 pb-3 pt-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-bold tracking-tight text-[#1a1a1a]">Marketplace</h1>
            <p className="text-[11px] text-[#4a4a4a]">{filtered.length} fresh deals near you</p>
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="appearance-none rounded-full bg-white py-2 pl-3 pr-8 text-[12px] font-semibold text-[#1a1a1a]"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="distance">Distance</option>
              <option value="expiry">Expiring soonest</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#4a4a4a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1" style={{ borderRadius: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}>
            <div className="flex h-14 items-center rounded-[28px] bg-white pl-4 pr-2">
              <Search size={18} className="text-[#8e8e93]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, shops..."
                className="h-full flex-1 bg-transparent px-3 text-[13px] text-[#1a1a1a] placeholder:text-[#8e8e93] focus:outline-none"
              />
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ background: "linear-gradient(135deg, #047857, #064e3b)" }}>
                <Mic size={14} />
              </button>
            </div>
          </div>
          <button className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-white text-[#4a4a4a] active:scale-95" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}>
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Filter chips */}
        <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
          {FILTERS.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className="flex-shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition-all active:scale-95"
                style={{
                  background: active ? "linear-gradient(135deg, #047857, #064e3b)" : "#ffffff",
                  color: active ? "#ffffff" : "#4a4a4a",
                  boxShadow: active ? "0 4px 12px rgba(4, 120, 87, 0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: hasItems ? "180px" : "120px" }}>
        <div className="px-5 pt-3">
          {filtered.length === 0 ? (
            <div className="mt-20 flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}>
                <Search size={28} className="text-[#8e8e93]" />
              </div>
              <p className="mt-4 text-base font-bold text-[#1a1a1a]">No products found</p>
              <p className="text-[12px] text-[#4a4a4a]">Try a different filter or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Bottom cart preview */}
      {hasItems && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="absolute inset-x-4 z-30"
          style={{ bottom: "100px" }}
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCartOpen(true)}
            className="flex w-full items-center justify-between text-white"
            style={{ borderRadius: "20px", background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 8px 24px rgba(4, 120, 87, 0.35)" }}
          >
            <div className="flex items-center gap-3 px-5 py-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <ShoppingBag size={16} className="text-white" />
              </div>
              <div className="text-left">
                <div className="text-[14px] font-bold">{cartCount()} items</div>
                <div className="text-[10px] text-white/80">{formatINR(cartTotal())}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 px-5 py-3.5 text-[13px] font-bold">
              View Cart
              <ChevronRight size={14} />
            </div>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

import { ChevronRight } from "lucide-react";
