"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ProductCard } from "./ProductCard";
import { formatINR } from "./Countdown";
import { Search, SlidersHorizontal, Mic, ShoppingBag } from "lucide-react";

const displayFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "expiring-today", label: "Expiring today" },
  { id: "under-50", label: "Under ₹50" },
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
  const [sort, setSort] = useState<
    "relevance" | "price-low" | "distance" | "expiry"
  >("relevance");

  const filtered = useMemo(() => {
    let list = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shopName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    switch (activeFilter) {
      case "expiring-today":
        list = list.filter((p) => {
          const days =
            (new Date(p.bestBefore).getTime() - Date.now()) / 86400000;
          return days <= 1.5;
        });
        break;
      case "under-50":
        list = list.filter((p) => p.discountedPrice < 50);
        break;
      case "over-50-off":
        list = list.filter(
          (p) =>
            (p.originalPrice - p.discountedPrice) / p.originalPrice > 0.5
        );
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
        list.sort(
          (a, b) =>
            new Date(a.bestBefore).getTime() -
            new Date(b.bestBefore).getTime()
        );
        break;
    }
    return list;
  }, [products, activeFilter, query, sort]);

  const hasItems = cartCount() > 0;

  return (
    <div className="flex h-full flex-col bg-[#FCFCF9]">
      {/* Header — pill search bar */}
      <div className="px-5 pb-3 pt-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1
              className="text-[24px] font-bold tracking-tight text-[#111827]"
              style={{ fontFamily: displayFont }}
            >
              Marketplace
            </h1>
            <p className="text-[11px] text-[#64748b]">
              {filtered.length} fresh deals near you
            </p>
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="appearance-none rounded-full bg-white py-2 pl-3 pr-8 text-[12px] font-semibold text-[#111827]"
              style={{ boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="distance">Distance</option>
              <option value="expiry">Expiring soonest</option>
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="#64748b"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Large pill search bar */}
        <div className="flex items-center gap-2">
          <div
            className="relative flex-1"
            style={{
              borderRadius: 28,
              boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)",
            }}
          >
            <div className="flex h-14 items-center rounded-[28px] bg-white pl-4 pr-2">
              <Search size={18} className="text-[#94a3b8]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, shops..."
                className="h-full flex-1 bg-transparent px-3 text-[13px] text-[#111827] placeholder:text-[#94a3b8] focus:outline-none"
              />
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                style={{
                  background: "linear-gradient(135deg, #16a34a, #15803d)",
                }}
              >
                <Mic size={14} />
              </button>
            </div>
          </div>
          <button
            className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-white text-[#64748b] active:scale-95"
            style={{ boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Filter chips */}
        <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 no-scrollbar">
          {FILTERS.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className="flex-shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition-all active:scale-95"
                style={{
                  background: active
                    ? "linear-gradient(135deg, #16a34a, #15803d)"
                    : "#ffffff",
                  color: active ? "#ffffff" : "#64748b",
                  boxShadow: active
                    ? "0 4px 12px rgba(22, 163, 74, 0.25)"
                    : "0 2px 8px rgba(17, 24, 39, 0.04)",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results — scrollable */}
      <main className="flex-1 overflow-y-auto zw-scroll px-5 pb-40 pt-4">
        {filtered.length === 0 ? (
          <div className="mt-20 flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white" style={{ boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
              <Search size={28} className="text-[#94a3b8]" />
            </div>
            <p
              className="mt-4 text-base font-bold text-[#111827]"
              style={{ fontFamily: displayFont }}
            >
              No products found
            </p>
            <p className="text-[12px] text-[#64748b]">
              Try a different filter or search term
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </main>

      {/* Bottom cart preview — Blinkit style */}
      {hasItems && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="absolute inset-x-4 bottom-24 z-30"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCartOpen(true)}
            className="flex w-full items-center justify-between text-white"
            style={{
              borderRadius: 28,
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              boxShadow: "0 8px 32px rgba(22, 163, 74, 0.4)",
            }}
          >
            <div className="flex items-center gap-3 px-5 py-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25">
                <ShoppingBag size={16} className="text-white" />
              </div>
              <div className="text-left">
                <div
                  className="text-[14px] font-bold"
                  style={{ fontFamily: displayFont }}
                >
                  {cartCount()} items
                </div>
                <div className="text-[10px] text-white/80">
                  {formatINR(cartTotal())}
                </div>
              </div>
            </div>
            <div
              className="flex items-center gap-1 px-5 py-3.5 text-[13px] font-bold"
              style={{ fontFamily: displayFont }}
            >
              View Cart
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5 3L9 7L5 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
