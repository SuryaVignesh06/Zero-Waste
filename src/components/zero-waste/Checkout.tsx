"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { formatINR } from "./Countdown";
import { ChevronLeft, MapPin, Clock, CreditCard, Wallet, Banknote, Check, PartyPopper, Bike, Store, Package, Phone, MessageCircle, Star } from "lucide-react";

export function Checkout() {
  const cart = useAppStore((s) => s.cart);
  const cartTotal = useAppStore((s) => s.cartTotal);
  const cartSavings = useAppStore((s) => s.cartSavings);
  const clearCart = useAppStore((s) => s.clearCart);
  const setScreen = useAppStore((s) => s.setScreen);
  const [payment, setPayment] = useState<"upi" | "card" | "cod">("upi");
  const [slot, setSlot] = useState<"now" | "1h" | "2h">("now");
  const [confirmed, setConfirmed] = useState(false);
  const deliveryFee = 15;
  const total = cartTotal() + deliveryFee;

  const handlePlace = () => { setConfirmed(true); setTimeout(() => { clearCart(); setConfirmed(false); setScreen("order-tracking"); }, 1800); };

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#f5f1ed]">
      <div className="bg-white px-5 py-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => setScreen("home")} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3efe9] active:scale-95"><ChevronLeft size={18} className="text-[#1a1a1a]" /></button>
          <h1 className="text-lg font-bold tracking-tight text-[#1a1a1a]">Checkout</h1>
        </div>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "100px" }}>
        <div className="px-5 pt-4 space-y-5">
          <section>
            <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#4a4a4a]">Delivery Address</h2>
            <div className="bg-white p-5" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ecfdf5] text-[#047857]"><MapPin size={16} /></div>
                <div className="flex-1"><div className="text-[13px] font-bold text-[#1a1a1a]">Home</div><div className="text-[12px] text-[#4a4a4a]">Flat 4B, Skyline Apartments, 8th Street, Anna Nagar West, Chennai 600040</div></div>
                <button className="rounded-full bg-[#ecfdf5] px-3 py-1 text-[12px] font-semibold text-[#047857]">Change</button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#4a4a4a]">Delivery Slot</h2>
            <div className="grid grid-cols-3 gap-2">
              {[{ id: "now", label: "Express", sub: "30-45 min" }, { id: "1h", label: "1 hour", sub: "60-75 min" }, { id: "2h", label: "2 hours", sub: "120-150 min" }].map((s) => (
                <button key={s.id} onClick={() => setSlot(s.id as any)} className="flex flex-col items-center p-3 transition-all" style={{ borderRadius: "16px", background: slot === s.id ? "#ecfdf5" : "#ffffff", border: slot === s.id ? "2px solid #047857" : "2px solid transparent", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}>
                  <Clock size={16} className={slot === s.id ? "text-[#047857]" : "text-[#8e8e93]"} />
                  <span className={`mt-1 text-[12px] font-bold ${slot === s.id ? "text-[#047857]" : "text-[#1a1a1a]"}`}>{s.label}</span>
                  <span className="text-[10px] text-[#8e8e93]">{s.sub}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#4a4a4a]">Order Summary</h2>
            <div className="bg-white p-5" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
              {cart.map((item, i) => (
                <div key={item.product.id} className={`flex items-center justify-between py-2 ${i > 0 ? "border-t border-[#f3efe9]" : ""}`}>
                  <div className="flex items-center gap-2">
                    <div className={`flex h-10 w-10 items-center justify-center bg-gradient-to-br ${item.product.imageColor}`} style={{ borderRadius: "12px" }}><span className="text-sm font-bold text-white/85">{item.product.name.charAt(0)}</span></div>
                    <div><div className="text-[12px] font-semibold text-[#1a1a1a] line-clamp-1">{item.product.name}</div><div className="text-[10px] text-[#8e8e93]">{item.qty} × {formatINR(item.product.discountedPrice)}</div></div>
                  </div>
                  <span className="text-[13px] font-bold">{formatINR(item.qty * item.product.discountedPrice)}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#4a4a4a]">Payment Method</h2>
            <div className="space-y-2">
              {[{ id: "upi", icon: Wallet, label: "UPI", sub: "GPay, PhonePe, Paytm" }, { id: "card", icon: CreditCard, label: "Card", sub: "Visa, Mastercard, RuPay" }, { id: "cod", icon: Banknote, label: "Cash on Delivery", sub: "Pay when you receive" }].map((p) => {
                const Icon = p.icon; const active = payment === p.id;
                return (
                  <button key={p.id} onClick={() => setPayment(p.id as any)} className="flex w-full items-center gap-3 p-4 transition-all" style={{ borderRadius: "16px", background: active ? "#ecfdf5" : "#ffffff", border: active ? "2px solid #047857" : "2px solid transparent", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: active ? "linear-gradient(135deg, #047857, #064e3b)" : "#f3efe9", color: active ? "#ffffff" : "#4a4a4a" }}><Icon size={18} /></div>
                    <div className="flex-1 text-left"><div className="text-[13px] font-bold text-[#1a1a1a]">{p.label}</div><div className="text-[11px] text-[#8e8e93]">{p.sub}</div></div>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2" style={{ borderColor: active ? "#047857" : "#cbd5e1", background: active ? "#047857" : "transparent" }}>{active && <Check size={12} strokeWidth={3} className="text-white" />}</div>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#4a4a4a]">Bill Details</h2>
            <div className="bg-white p-5" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
              <div className="space-y-2 text-[13px]">
                <div className="flex justify-between text-[#4a4a4a]"><span>Item total</span><span className="font-medium text-[#1a1a1a]">{formatINR(cartTotal())}</span></div>
                <div className="flex justify-between text-[#4a4a4a]"><span>Delivery fee</span><span className="font-medium text-[#1a1a1a]">{formatINR(deliveryFee)}</span></div>
                <div className="flex justify-between text-[#16a34a]"><span>You saved</span><span className="font-medium">-{formatINR(cartSavings())}</span></div>
                <div className="my-2 border-t border-dashed border-[#e8e3dd]" />
                <div className="flex justify-between"><span className="font-bold text-[#1a1a1a]">To Pay</span><span className="text-base font-bold text-[#1a1a1a]">{formatINR(total)}</span></div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className="bg-white px-5 py-3" style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
        <motion.button whileTap={{ scale: 0.97 }} onClick={handlePlace} className="flex h-12 w-full items-center justify-between text-white" style={{ borderRadius: "14px", background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 4px 12px rgba(4, 120, 87, 0.25)" }}>
          <div className="text-left pl-4"><div className="text-base font-bold">{formatINR(total)}</div><div className="text-[10px] text-white/80">Tap to place order</div></div>
          <div className="flex items-center gap-1 pr-4 text-[13px] font-semibold">Place Order<Check size={16} strokeWidth={3} /></div>
        </motion.button>
      </div>

      <AnimatePresence>
        {confirmed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }} className="flex h-24 w-24 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 16px 40px rgba(4, 120, 87, 0.35)" }}><PartyPopper size={44} className="text-white" /></motion.div>
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mt-5 text-xl font-bold text-[#1a1a1a]">Order Placed!</motion.h2>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mt-1 text-[12px] text-[#4a4a4a]">Preparing your order...</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TRACKING_STEPS = [
  { id: "placed", label: "Order Placed", icon: Check, sub: "Just now" },
  { id: "accepted", label: "Shop Accepted", icon: Store, sub: "2 min ago" },
  { id: "packing", label: "Packing", icon: Package, sub: "In progress" },
  { id: "out_for_delivery", label: "Out for Delivery", icon: Bike, sub: "Pending" },
  { id: "delivered", label: "Delivered", icon: Star, sub: "Pending" },
];

export function OrderTracking() {
  const setScreen = useAppStore((s) => s.setScreen);
  const [currentStep, setCurrentStep] = useState(2);
  useEffect(() => { const id = setInterval(() => { setCurrentStep((s) => (s < 4 ? s + 1 : s)); }, 6000); return () => clearInterval(id); }, []);

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#f5f1ed]">
      <div className="bg-white px-5 py-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => setScreen("home")} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3efe9] active:scale-95"><ChevronLeft size={18} className="text-[#1a1a1a]" /></button>
          <div><h1 className="text-base font-bold tracking-tight text-[#1a1a1a]">Order Tracking</h1><p className="text-[11px] text-[#4a4a4a]">Order #ZW{Math.floor(Math.random() * 9000) + 1000}</p></div>
        </div>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        <div className="px-5 pt-4 space-y-4">
          <div className="relative h-56 overflow-hidden bg-[#f3efe9]" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
            <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(0deg, #e8e3dd 1px, transparent 1px), linear-gradient(90deg, #e8e3dd 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none"><motion.path d="M 50 200 Q 150 100 280 80 T 360 50" stroke="#047857" strokeWidth="3" fill="none" strokeDasharray="6 6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} /></svg>
            <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="absolute bottom-12 left-8"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-4 ring-white" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}><Store size={16} className="text-[#047857]" /></div></motion.div>
            <motion.div animate={{ left: ["8%", "20%", "35%", "55%", "75%"], top: ["75%", "55%", "40%", "30%", "20%"] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute"><div className="zw-urgency-pulse-amber relative flex h-10 w-10 items-center justify-center rounded-full bg-[#d97706] ring-4 ring-white"><Bike size={18} className="text-white" /></div></motion.div>
            <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }} className="absolute right-8 top-8"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1a1a] ring-4 ring-white"><MapPin size={16} className="text-white" /></div></motion.div>
          </div>

          <div className="flex items-center justify-between bg-white p-4" style={{ borderRadius: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
            <div><div className="text-[10px] font-medium uppercase tracking-wide text-[#8e8e93]">Arriving in</div><div className="text-base font-bold text-[#1a1a1a]">12 mins</div></div>
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ecfdf5] text-[#047857] active:scale-90"><Phone size={16} /></button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ecfdf5] text-[#047857] active:scale-90"><MessageCircle size={16} /></button>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4" style={{ borderRadius: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #047857, #064e3b)" }}>A</div>
            <div className="flex-1"><div className="text-[13px] font-bold text-[#1a1a1a]">Arjun K.</div><div className="flex items-center gap-1 text-[11px] text-[#4a4a4a]"><Star size={10} className="fill-[#f59e0b] text-[#f59e0b]" /><span className="font-semibold">4.9</span><span>· 218 deliveries</span></div></div>
            <div className="rounded-lg bg-[#ecfdf5] px-2 py-1"><span className="text-[10px] font-bold text-[#047857]">TN45 AB 1234</span></div>
          </div>

          <div className="bg-white p-5" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
            <h3 className="text-[13px] font-bold uppercase tracking-wide text-[#4a4a4a]">Order Status</h3>
            <div className="mt-4 space-y-1">
              {TRACKING_STEPS.map((s, i) => { const Icon = s.icon; const done = i <= currentStep; const active = i === currentStep; return (
                <div key={s.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <motion.div initial={false} animate={{ backgroundColor: done ? "#047857" : "#e8e3dd", scale: active ? 1.1 : 1 }} className="flex h-9 w-9 items-center justify-center rounded-full"><Icon size={16} className={done ? "text-white" : "text-[#8e8e93]"} /></motion.div>
                    {i < TRACKING_STEPS.length - 1 && (<div className="relative my-1 h-8 w-0.5 overflow-hidden rounded-full bg-[#e8e3dd]"><motion.div initial={false} animate={{ height: i < currentStep ? "100%" : "0%" }} transition={{ duration: 0.4 }} className="absolute inset-x-0 top-0 bg-[#047857]" /></div>)}
                  </div>
                  <div className="pb-2 pt-1"><div className={`text-[13px] font-semibold ${done ? "text-[#1a1a1a]" : "text-[#8e8e93]"}`}>{s.label}</div><div className="text-[11px] text-[#8e8e93]">{s.sub}</div></div>
                </div>
              ); })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
