"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, Clock, MapPin, Store, Star, ShoppingBag } from "lucide-react";
import { formatINR } from "./Countdown";

export function MyReservations() {
  const setScreen = useAppStore((s) => s.setScreen);
  const reservations = useAppStore((s) => s.reservations);
  const products = useAppStore((s) => s.products);

  const getProduct = (id: string) => products.find(p => p.id === id);

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-[rgba(247,245,240,0.92)] px-5 py-4 pb-2 pt-6 backdrop-blur-md">
        <button 
          onClick={() => setScreen("userProfile")}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} color="#0A0A0A" />
        </button>
        <div className="ml-4">
          <h1 className="text-[22px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            My Reservations
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-4 pb-24">
        {reservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8E8E4]/50 mb-4">
              <ShoppingBag size={32} color="#8A8A8A" />
            </div>
            <h2 className="text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>No active reservations</h2>
            <p className="mt-2 text-[14px] text-[#4A4A4A] max-w-[240px]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Go discover some deals in the Local Savings Market!
            </p>
            <button 
              onClick={() => setScreen("localSavingsMarket")}
              className="mt-6 rounded-full bg-[#1A6B3C] px-6 py-3 text-[15px] font-bold text-white shadow-md active:scale-95 transition-transform"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Browse Deals
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {reservations.map((r, i) => {
              const product = getProduct(r.productId);
              if (!product) return null;
              
              const isExpired = r.status === 'expired';
              const isCompleted = r.status === 'completed';
              const isActive = r.status === 'active';

              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col rounded-[20px] bg-white p-4 shadow-sm"
                  style={{ opacity: isExpired ? 0.7 : 1 }}
                >
                  <div className="flex gap-3">
                    <div className="h-[64px] w-[64px] shrink-0 rounded-[14px] bg-gradient-to-br from-[#E8E8E4] to-[#F5F5F7] overflow-hidden">
                      {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />}
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <div className="flex items-start justify-between">
                        <h3 className="text-[15px] font-bold leading-tight text-[#0A0A0A] line-clamp-1" style={{ fontFamily: "var(--font-outfit)" }}>
                          {product.name}
                        </h3>
                        {/* Status Pill */}
                        <div className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" 
                          style={{
                            backgroundColor: isActive ? "#7C3AED" : isCompleted ? "#22C55E" : "#E8E8E4",
                            color: isActive || isCompleted ? "white" : "#4A4A4A",
                            fontFamily: "var(--font-jakarta)"
                          }}>
                          {isActive ? "Active" : isCompleted ? "Completed" : r.status}
                        </div>
                      </div>
                      <span className="mt-1 text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {(product as any).shopName || "Fresh Mart"}
                      </span>
                      <span className="mt-1 text-[12px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {r.reservationSlot}
                      </span>
                    </div>
                  </div>

                  {isActive && (
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 rounded-[12px] bg-[#F5F5F7] py-2.5 text-[13px] font-bold text-[#DC2626] active:scale-95 transition-transform" style={{ fontFamily: "var(--font-jakarta)" }}>Cancel</button>
                      <button className="flex-1 rounded-[12px] bg-[#F5F5F7] py-2.5 text-[13px] font-bold text-[#0A0A0A] active:scale-95 transition-transform" style={{ fontFamily: "var(--font-jakarta)" }}>Directions</button>
                      <button className="flex-1 rounded-[12px] bg-[#0A0A0A] py-2.5 text-[13px] font-bold text-white active:scale-95 transition-transform" style={{ fontFamily: "var(--font-jakarta)" }}>Show QR</button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1.5 rounded-[12px] bg-[#F5F5F7] py-2.5 text-[13px] font-bold text-[#0A0A0A] active:scale-95 transition-transform" style={{ fontFamily: "var(--font-jakarta)" }}>
                        <Star size={14} fill="#0A0A0A" /> Rate Shop
                      </button>
                      <button className="flex-1 rounded-[12px] bg-[#1A6B3C] py-2.5 text-[13px] font-bold text-white active:scale-95 transition-transform" style={{ fontFamily: "var(--font-jakarta)" }}>Reserve Again</button>
                    </div>
                  )}

                  {isExpired && (
                    <div className="mt-4 rounded-[12px] bg-[#F5F5F7] py-2.5 text-center">
                      <span className="text-[13px] font-medium text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Expired — item no longer available</span>
                    </div>
                  )}

                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
