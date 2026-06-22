"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { formatINR } from "./Countdown";
import { staggerContainer, cardVariants } from "@/lib/animations";
import { Search, SlidersHorizontal, ShoppingCart, Clock } from "lucide-react";

const CATEGORIES = ["All", "Dairy", "Bakery", "Vegetables", "Snacks", "Beverages", "Packaged"];

export function Marketplace() {
  const products = useAppStore((s) => s.products);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const cartCount = useAppStore((s) => s.cartCount);
  const setActiveProduct = useAppStore((s) => s.setActiveProduct);
  const addToCart = useAppStore((s) => s.addToCart);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [addedItems, setAddedItems] = useState<Record<string, number>>({});

  const filtered = useMemo(() => {
    let list = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.shopName.toLowerCase().includes(q));
    }
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
    }
    return list;
  }, [products, activeCategory, query]);

  const handleAdd = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      setAddedItems((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    }
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#F7F5F0]">
      {/* Header */}
      <div className="px-5 pt-4" style={{ flexShrink: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-extrabold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              Marketplace
            </h1>
            <p className="mt-1 text-[13px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Near-expiry deals — up to 70% off
            </p>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#0A0A0A]"
          >
            <ShoppingCart size={20} className="text-white" />
            {cartCount() > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#DC2626] px-1 text-[10px] font-bold text-white"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {cartCount()}
              </span>
            )}
          </button>
        </div>

        {/* Search + filter */}
        <div className="mt-4 flex gap-2.5">
          <div className="flex h-[46px] flex-1 items-center rounded-[14px] bg-white px-3.5" style={{ boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)" }}>
            <Search size={16} className="text-[#8A8A8A]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="ml-3 flex-1 bg-transparent text-[14px] text-[#0A0A0A] placeholder:text-[#8A8A8A] focus:outline-none"
              style={{ fontFamily: "var(--font-jakarta)" }}
            />
          </div>
          <button className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-white" style={{ boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)" }}>
            <SlidersHorizontal size={20} className="text-[#0A0A0A]" />
          </button>
        </div>

        {/* Flash deal banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-4 flex h-20 items-center justify-between overflow-hidden rounded-[20px] px-5"
          style={{ background: "linear-gradient(135deg, #DC2626 0%, #D97706 100%)", boxShadow: "0px 4px 20px rgba(220,38,38,0.30)" }}
        >
          <div className="relative z-10">
            <h3 className="text-[18px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
              Flash Deals
            </h3>
            <p className="mt-1 text-[12px] text-white/85" style={{ fontFamily: "var(--font-jakarta)" }}>
              Ending soon — save up to 70%
            </p>
          </div>
          <div className="relative z-10 text-right">
            <div className="text-[22px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
              02:14:33
            </div>
            <p className="text-[10px] text-white/75" style={{ fontFamily: "var(--font-jakarta)" }}>
              Hurry up!
            </p>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/8" />
          <div className="absolute -bottom-12 right-12 h-20 w-20 rounded-full bg-white/8" />
        </motion.div>

        {/* Category tabs */}
        <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex h-9 flex-shrink-0 items-center rounded-full px-4 text-[13px] font-semibold transition-all"
                style={{
                  background: active ? "#0A0A0A" : "#FFFFFF",
                  color: active ? "#FFFFFF" : "#4A4A4A",
                  border: active ? "none" : "1px solid #E8E8E4",
                  fontFamily: active ? "var(--font-outfit)" : "var(--font-jakarta)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product grid */}
      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 gap-3 px-5 pt-4"
        >
          {filtered.map((p) => {
            const discountPct = Math.round(((p.originalPrice - p.discountedPrice) / p.originalPrice) * 100);
            const days = Math.max(0, Math.ceil((new Date(p.bestBefore).getTime() - Date.now()) / 86400000));
            const qty = addedItems[p.id] || 0;
            return (
              <motion.div
                key={p.id}
                variants={cardVariants}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveProduct(p)}
                className="overflow-hidden bg-white"
                style={{ borderRadius: "20px", boxShadow: "0px 2px 16px rgba(0,0,0,0.06), 0px 1px 4px rgba(0,0,0,0.04)" }}
              >
                {/* Image zone */}
                <div className={`relative flex h-[120px] items-center justify-center bg-gradient-to-br ${p.imageColor}`}>
                  <span className="text-5xl font-bold text-white/80">{p.name.charAt(0)}</span>
                  {/* Discount badge */}
                  <div className="absolute left-1.5 top-1.5 flex h-[22px] items-center justify-center rounded-full bg-[#DC2626] px-2 text-[9px] font-extrabold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                    {discountPct}% OFF
                  </div>
                  {/* Expiry badge */}
                  <div className="absolute right-1.5 top-1.5 rounded-full bg-[#D97706] px-2 py-0.5 text-[9px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                    {days}d left
                  </div>
                  {/* AI badge */}
                  {p.isAiMatch && (
                    <div className="absolute bottom-1.5 left-1.5 rounded-full px-2 py-0.5 text-[8px] font-bold text-[#22C55E]" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", fontFamily: "var(--font-outfit)" }}>
                      AI Pick
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="p-3">
                  <h4 className="line-clamp-2 text-[14px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                    {p.name}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {p.shopName}
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-[#D97706]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Best before: {days} days
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[12px] text-[#8A8A8A] line-through" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {formatINR(p.originalPrice)}
                      </span>
                      <span className="text-[18px] font-bold text-[#1A6B3C]" style={{ fontFamily: "var(--font-outfit)" }}>
                        {formatINR(p.discountedPrice)}
                      </span>
                    </div>
                    {/* Add button / stepper */}
                    {qty === 0 ? (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleAdd(e, p.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-[10px] border-[1.5px] border-[#E8E8E4] bg-white"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      </motion.button>
                    ) : (
                      <motion.div
                        initial={{ width: 32, scale: 0.9 }}
                        animate={{ width: 70, scale: 1 }}
                        className="flex h-8 items-center justify-between rounded-[10px] bg-[#1A6B3C] px-2"
                      >
                        <button onClick={(e) => { e.stopPropagation(); setAddedItems((prev) => ({ ...prev, [p.id]: Math.max(0, qty - 1) })); }} className="text-white text-sm font-bold">−</button>
                        <span className="text-[13px] font-semibold text-white" style={{ fontFamily: "var(--font-outfit)" }}>{qty}</span>
                        <button onClick={(e) => handleAdd(e, p.id)} className="text-white text-sm font-bold">+</button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
