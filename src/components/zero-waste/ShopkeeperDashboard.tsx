"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Package, TrendingUp, BarChart, User, Leaf, Store, Check, Plus, AlertTriangle, ChevronRight, Edit, Pause } from "lucide-react";

export function ShopkeeperDashboard() {
  const [tab, setTab] = useState<"dashboard" | "products" | "sales" | "profile">("dashboard");
  const setScreen = useAppStore((s) => s.setScreen);
  const products = useAppStore((s) => s.products).filter(p => p.shopkeeperId === "s1" || true); // mock filter
  const reservations = useAppStore((s) => s.reservations);
  
  const todaySaved = products.reduce((acc, p) => acc + (p.originalPrice - p.discountedPrice) * p.soldCount, 0);
  const activeListingsCount = products.length;
  const customersVisited = reservations.filter(r => r.status === 'completed').length;
  const co2Prevented = customersVisited * 2.5;

  const handleAddProduct = () => {
    // Navigate to AddProductWizard
    setScreen("addProductWizard" as any);
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-[rgba(247,245,240,0.92)] px-5 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F59E0B] text-white">
            <Store size={20} />
          </div>
          <div>
            <h1 className="text-[19px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Fresh Mart</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[12px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Online</span>
            </div>
          </div>
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#E8E8E4]">
          <img src="https://i.pravatar.cc/100?img=11" alt="avatar" className="h-full w-full object-cover" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {tab === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5 px-5 pt-2">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex h-[84px] flex-col justify-center rounded-2xl bg-[#F0F7F2] px-4 shadow-sm">
                <span className="text-[12px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Today Saved</span>
                <span className="text-[24px] font-extrabold text-[#1A6B3C] leading-none mt-1" style={{ fontFamily: "var(--font-outfit)" }}>₹{todaySaved || 750}</span>
                <span className="text-[10px] text-[#8A8A8A] mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>from 18 products</span>
              </div>
              <div className="flex h-[84px] flex-col justify-center rounded-2xl bg-[#FFE4E6] px-4 shadow-sm">
                <span className="text-[12px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Products Listed</span>
                <span className="text-[24px] font-extrabold text-[#0A0A0A] leading-none mt-1" style={{ fontFamily: "var(--font-outfit)" }}>{activeListingsCount || 18}</span>
                <span className="text-[10px] text-[#8A8A8A] mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>active listings</span>
              </div>
              <div className="flex h-[84px] flex-col justify-center rounded-2xl bg-[#F0FFED] px-4 shadow-sm">
                <span className="text-[12px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Customers Visited</span>
                <span className="text-[24px] font-extrabold text-[#0A0A0A] leading-none mt-1" style={{ fontFamily: "var(--font-outfit)" }}>{customersVisited || 12}</span>
                <span className="text-[10px] text-[#8A8A8A] mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>reservation pickups</span>
              </div>
              <div className="flex h-[84px] flex-col justify-center rounded-2xl bg-[#FEF3C7] px-4 shadow-sm">
                <span className="text-[12px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>CO₂ Prevented</span>
                <span className="text-[24px] font-extrabold text-[#1A6B3A] leading-none mt-1" style={{ fontFamily: "var(--font-outfit)" }}>{co2Prevented || 35}kg</span>
                <span className="text-[10px] text-[#8A8A8A] mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>waste avoided</span>
              </div>
            </div>

            {/* Quick Action */}
            <button 
              onClick={handleAddProduct}
              className="flex items-center justify-between rounded-2xl bg-[#1A6B3C] p-4 text-white shadow-[0_8px_24px_rgba(26,107,60,0.25)] active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Plus size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-[16px] font-bold" style={{ fontFamily: "var(--font-outfit)" }}>Add Product</h3>
                  <p className="text-[12px] font-medium opacity-80" style={{ fontFamily: "var(--font-jakarta)" }}>List a near-expiry item</p>
                </div>
              </div>
              <ChevronRight size={20} className="opacity-80" />
            </button>

            {/* Live Sales Ticker */}
            <div className="flex items-center gap-3 rounded-[20px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-4 py-3 text-white shadow-sm">
              <span className="text-[16px]">🛒</span>
              <p className="text-[13px] font-medium leading-snug" style={{ fontFamily: "var(--font-jakarta)" }}>
                <b>Real-time:</b> Someone just reserved your bread pack — 2 min ago
              </p>
            </div>

            {/* Expiring Soon Alert */}
            <div className="border-l-4 border-[#DC2626] bg-[#FEF2F2] rounded-r-[16px] p-4 mt-2">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={18} color="#DC2626" />
                <h4 className="text-[14px] font-bold text-[#DC2626]" style={{ fontFamily: "var(--font-outfit)" }}>3 products expiring in 24h!</h4>
              </div>
              <p className="text-[12px] text-[#7F1D1D] mb-3" style={{ fontFamily: "var(--font-jakarta)" }}>Consider applying a deeper discount to prevent waste.</p>
              <button className="rounded-lg bg-[#DC2626] px-4 py-2 text-[12px] font-bold text-white shadow-sm active:scale-95 transition-transform">
                Apply Max Discount Now
              </button>
            </div>

            {/* Active Products List Preview */}
            <div className="mt-2">
              <h2 className="text-[20px] font-bold text-[#0A0A0A] mb-4" style={{ fontFamily: "var(--font-outfit)" }}>Your Active Listings</h2>
              <div className="flex flex-col gap-3">
                {products.slice(0, 3).map((p: any) => (
                  <div key={p.id} className="flex gap-3 rounded-[20px] bg-white p-3 shadow-sm">
                    <div className="h-[80px] w-[80px] rounded-2xl bg-gradient-to-br from-[#E8E8E4] to-[#F5F5F7] overflow-hidden">
                       {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" /> : null}
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <div className="flex items-start justify-between">
                        <h3 className="text-[15px] font-bold text-[#0A0A0A] leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>{p.name}</h3>
                        <div className="flex items-center gap-1">
                          <button className="text-[#8A8A8A] p-1"><Edit size={16} /></button>
                          <button className="text-[#8A8A8A] p-1"><Pause size={16} /></button>
                        </div>
                      </div>
                      <div className="flex items-end gap-2 mt-2">
                        <span className="text-[18px] font-bold text-[#1A6B3C]" style={{ fontFamily: "var(--font-outfit)" }}>₹{p.discountedPrice}</span>
                        <span className="text-[13px] text-[#8A8A8A] line-through mb-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>₹{p.originalPrice}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                        <span className="text-[11px] font-bold text-[#F59E0B]" style={{ fontFamily: "var(--font-jakarta)" }}>{p.qtyLeft || 5} Left</span>
                        <span className="text-[11px] text-[#8A8A8A] ml-1">Expires in 2d</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[rgba(247,245,240,0.85)] pb-6 pt-2 backdrop-blur-xl border-t border-[rgba(0,0,0,0.05)]">
        <div className="flex justify-around px-2">
          <NavItem icon={<Store />} label="Dashboard" isActive={tab === "dashboard"} onClick={() => setTab("dashboard")} />
          <NavItem icon={<Package />} label="Products" isActive={tab === "products"} onClick={() => setTab("products")} />
          <NavItem icon={<TrendingUp />} label="Sales" isActive={tab === "sales"} onClick={() => setTab("sales")} />
          <NavItem icon={<User />} label="Profile" isActive={tab === "profile"} onClick={() => setTab("profile")} />
        </div>
      </footer>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: any, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className="relative flex flex-col items-center justify-center w-16 h-12">
      {isActive && (
        <motion.div layoutId="shopActiveTab" className="absolute inset-0 rounded-2xl bg-[#0A0A0A]" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
      )}
      <div className={`relative z-10 flex flex-col items-center gap-1 ${isActive ? "text-white" : "text-[#8A8A8A]"}`}>
        <div className="[&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      </div>
    </button>
  );
}
