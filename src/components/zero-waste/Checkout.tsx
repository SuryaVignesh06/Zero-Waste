"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { formatINR } from "./Countdown";
import {
  ChevronLeft,
  MapPin,
  Clock,
  CreditCard,
  Wallet,
  Banknote,
  Check,
  PartyPopper,
  Bike,
  Store,
  Package,
  Phone,
  MessageCircle,
  Star,
} from "lucide-react";

const displayFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

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

  const handlePlace = () => {
    setConfirmed(true);
    setTimeout(() => {
      clearCart();
      setConfirmed(false);
      setScreen("order-tracking");
    }, 1800);
  };

  return (
    <div className="flex h-full flex-col bg-[#FCFCF9]">
      {/* Header */}
      <div className="bg-white px-5 py-4" style={{ boxShadow: "0 2px 12px rgba(17, 24, 39, 0.04)" }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen("home")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5f9] active:scale-95"
          >
            <ChevronLeft size={18} className="text-[#111827]" />
          </button>
          <h1
            className="text-lg font-bold tracking-tight text-[#111827]"
            style={{ fontFamily: displayFont }}
          >
            Checkout
          </h1>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto zw-scroll px-5 pb-32 pt-4">
        {/* Address card */}
        <section>
          <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#64748b]">
            Delivery Address
          </h2>
          <div className="bg-white p-5" style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0fdf4] text-[#16A34A]">
                <MapPin size={16} />
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-[#111827]">Home</div>
                <div className="text-[12px] text-[#64748b]">
                  Flat 4B, Skyline Apartments, 8th Street, Anna Nagar West, Chennai 600040
                </div>
              </div>
              <button className="rounded-full bg-[#f0fdf4] px-3 py-1 text-[12px] font-semibold text-[#16A34A]">
                Change
              </button>
            </div>
          </div>
        </section>

        {/* Slot */}
        <section className="mt-5">
          <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#64748b]">
            Delivery Slot
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "now", label: "Express", sub: "30-45 min" },
              { id: "1h", label: "1 hour", sub: "in 60-75 min" },
              { id: "2h", label: "2 hours", sub: "in 120-150 min" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSlot(s.id as any)}
                className="flex flex-col items-center p-3 transition-all"
                style={{
                  borderRadius: 22,
                  background: slot === s.id ? "#f0fdf4" : "#ffffff",
                  border: slot === s.id
                    ? "2px solid #16A34A"
                    : "2px solid transparent",
                  boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)",
                }}
              >
                <Clock
                  size={16}
                  className={slot === s.id ? "text-[#16A34A]" : "text-[#94a3b8]"}
                />
                <span
                  className={`mt-1 text-[12px] font-bold ${slot === s.id ? "text-[#16A34A]" : "text-[#111827]"}`}
                  style={{ fontFamily: displayFont }}
                >
                  {s.label}
                </span>
                <span className="text-[10px] text-[#94a3b8]">{s.sub}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Items summary */}
        <section className="mt-5">
          <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#64748b]">
            Order Summary
          </h2>
          <div className="bg-white p-5" style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
            {cart.map((item, i) => (
              <div
                key={item.product.id}
                className={`flex items-center justify-between py-2 ${i > 0 ? "border-t border-[#f1f5f9]" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center bg-gradient-to-br ${item.product.imageColor}`}
                    style={{ borderRadius: 14 }}
                  >
                    <span
                      className="text-sm font-bold text-white/85"
                      style={{ fontFamily: displayFont }}
                    >
                      {item.product.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-[#111827] line-clamp-1">
                      {item.product.name}
                    </div>
                    <div className="text-[10px] text-[#94a3b8]">
                      {item.qty} × {formatINR(item.product.discountedPrice)}
                    </div>
                  </div>
                </div>
                <span
                  className="text-[13px] font-bold"
                  style={{ fontFamily: displayFont }}
                >
                  {formatINR(item.qty * item.product.discountedPrice)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Payment */}
        <section className="mt-5">
          <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#64748b]">
            Payment Method
          </h2>
          <div className="space-y-2">
            <PaymentOption
              id="upi"
              icon={<Wallet size={18} />}
              label="UPI"
              sub="GPay, PhonePe, Paytm"
              active={payment === "upi"}
              onClick={() => setPayment("upi")}
            />
            <PaymentOption
              id="card"
              icon={<CreditCard size={18} />}
              label="Card"
              sub="Visa, Mastercard, RuPay"
              active={payment === "card"}
              onClick={() => setPayment("card")}
            />
            <PaymentOption
              id="cod"
              icon={<Banknote size={18} />}
              label="Cash on Delivery"
              sub="Pay when you receive"
              active={payment === "cod"}
              onClick={() => setPayment("cod")}
            />
          </div>
        </section>

        {/* Bill */}
        <section className="mt-5">
          <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#64748b]">
            Bill Details
          </h2>
          <div className="bg-white p-5" style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between text-[#64748b]">
                <span>Item total</span>
                <span className="font-medium text-[#111827]">
                  {formatINR(cartTotal())}
                </span>
              </div>
              <div className="flex justify-between text-[#64748b]">
                <span>Delivery fee</span>
                <span className="font-medium text-[#111827]">
                  {formatINR(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-[#22c55e]">
                <span>You saved</span>
                <span className="font-medium">-{formatINR(cartSavings())}</span>
              </div>
              <div className="my-2 border-t border-dashed border-[#e5e7eb]" />
              <div className="flex justify-between">
                <span
                  className="font-bold text-[#111827]"
                  style={{ fontFamily: displayFont }}
                >
                  To Pay
                </span>
                <span
                  className="text-base font-bold text-[#111827]"
                  style={{ fontFamily: displayFont }}
                >
                  {formatINR(total)}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Place order */}
      <div className="bg-white px-5 py-3" style={{ boxShadow: "0 -4px 20px rgba(17, 24, 39, 0.06)" }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handlePlace}
          className="flex h-12 w-full items-center justify-between text-white"
          style={{
            borderRadius: 22,
            background: "linear-gradient(135deg, #16a34a, #15803d)",
            boxShadow: "0 4px 16px rgba(22, 163, 74, 0.25)",
          }}
        >
          <div className="text-left pl-4">
            <div
              className="text-base font-bold"
              style={{ fontFamily: displayFont }}
            >
              {formatINR(total)}
            </div>
            <div className="text-[10px] text-white/80">Tap to place order</div>
          </div>
          <div
            className="flex items-center gap-1 pr-4 text-[13px] font-semibold"
            style={{ fontFamily: displayFont }}
          >
            Place Order
            <Check size={16} strokeWidth={3} />
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                background: "linear-gradient(135deg, #16a34a, #15803d)",
                boxShadow: "0 16px 40px rgba(22, 163, 74, 0.35)",
              }}
            >
              <PartyPopper size={44} className="text-white" />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-xl font-bold text-[#111827]"
              style={{ fontFamily: displayFont }}
            >
              Order Placed!
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-1 text-[12px] text-[#64748b]"
            >
              Preparing your order...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PaymentOption({
  icon,
  label,
  sub,
  active,
  onClick,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 p-4 transition-all"
      style={{
        borderRadius: 22,
        background: active ? "#f0fdf4" : "#ffffff",
        border: active
          ? "2px solid #16A34A"
          : "2px solid transparent",
        boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)",
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{
          background: active
            ? "linear-gradient(135deg, #16a34a, #15803d)"
            : "#f1f5f9",
          color: active ? "#ffffff" : "#64748b",
        }}
      >
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div
          className="text-[13px] font-bold text-[#111827]"
          style={{ fontFamily: displayFont }}
        >
          {label}
        </div>
        <div className="text-[11px] text-[#94a3b8]">{sub}</div>
      </div>
      <div
        className="flex h-5 w-5 items-center justify-center rounded-full border-2"
        style={{
          borderColor: active ? "#16A34A" : "#cbd5e1",
          background: active ? "#16A34A" : "transparent",
        }}
      >
        {active && <Check size={12} strokeWidth={3} className="text-white" />}
      </div>
    </button>
  );
}

// =========== ORDER TRACKING ===========

const TRACKING_STEPS = [
  { id: "placed", label: "Order Placed", icon: Check, sub: "Just now" },
  { id: "accepted", label: "Shop Accepted", icon: Store, sub: "2 min ago" },
  { id: "packing", label: "Packing", icon: Package, sub: "In progress" },
  {
    id: "out_for_delivery",
    label: "Out for Delivery",
    icon: Bike,
    sub: "Pending",
  },
  { id: "delivered", label: "Delivered", icon: Star, sub: "Pending" },
];

export function OrderTracking() {
  const setScreen = useAppStore((s) => s.setScreen);
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentStep((s) => (s < 4 ? s + 1 : s));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col bg-[#FCFCF9]">
      {/* Header */}
      <div className="bg-white px-5 py-4" style={{ boxShadow: "0 2px 12px rgba(17, 24, 39, 0.04)" }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen("home")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5f9] active:scale-95"
          >
            <ChevronLeft size={18} className="text-[#111827]" />
          </button>
          <div>
            <h1
              className="text-base font-bold tracking-tight text-[#111827]"
              style={{ fontFamily: displayFont }}
            >
              Order Tracking
            </h1>
            <p className="text-[11px] text-[#64748b]">
              Order #ZW{Math.floor(Math.random() * 9000) + 1000}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto zw-scroll pb-32">
        {/* Map card */}
        <div className="px-5 pt-4">
          <div className="relative h-64 overflow-hidden bg-[#f1f5f9]" style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, #e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <motion.path
                d="M 50 200 Q 150 100 280 80 T 360 50"
                stroke="#16A34A"
                strokeWidth="3"
                fill="none"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>

            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute bottom-12 left-8"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-4 ring-white" style={{ boxShadow: "0 4px 12px rgba(17, 24, 39, 0.15)" }}>
                <Store size={16} className="text-[#16A34A]" />
              </div>
            </motion.div>

            <motion.div
              animate={{
                left: ["8%", "20%", "35%", "55%", "75%"],
                top: ["75%", "55%", "40%", "30%", "20%"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
            >
              <div className="zw-urgency-pulse-amber relative flex h-10 w-10 items-center justify-center rounded-full bg-[#f59e0b] ring-4 ring-white" style={{ boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)" }}>
                <Bike size={18} className="text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              className="absolute right-8 top-8"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111827] ring-4 ring-white" style={{ boxShadow: "0 4px 12px rgba(17, 24, 39, 0.2)" }}>
                <MapPin size={16} className="text-white" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ETA card */}
        <div className="mt-4 px-5">
          <div className="flex items-center justify-between bg-white p-4" style={{ borderRadius: 28, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wide text-[#94a3b8]">
                Arriving in
              </div>
              <div
                className="text-base font-bold text-[#111827]"
                style={{ fontFamily: displayFont }}
              >
                12 mins
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0fdf4] text-[#16A34A] active:scale-90">
                <Phone size={16} />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0fdf4] text-[#16A34A] active:scale-90">
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Volunteer card */}
        <div className="mt-4 px-5">
          <div className="flex items-center gap-3 bg-white p-4" style={{ borderRadius: 28, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #16a34a, #15803d)",
                fontFamily: displayFont,
              }}
            >
              A
            </div>
            <div className="flex-1">
              <div
                className="text-[13px] font-bold text-[#111827]"
                style={{ fontFamily: displayFont }}
              >
                Arjun K.
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#64748b]">
                <Star size={10} className="fill-[#f59e0b] text-[#f59e0b]" />
                <span className="font-semibold">4.9</span>
                <span>· 218 deliveries</span>
              </div>
            </div>
            <div className="rounded-lg bg-[#f0fdf4] px-2 py-1">
              <span className="text-[10px] font-bold text-[#16A34A]">
                TN45 AB 1234
              </span>
            </div>
          </div>
        </div>

        {/* Timeline card */}
        <div className="mt-4 px-5">
          <div className="bg-white p-5" style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
            <h3
              className="text-[13px] font-bold uppercase tracking-wide text-[#64748b]"
              style={{ fontFamily: displayFont }}
            >
              Order Status
            </h3>
            <div className="mt-4 space-y-1">
              {TRACKING_STEPS.map((s, i) => {
                const Icon = s.icon;
                const done = i <= currentStep;
                const active = i === currentStep;
                return (
                  <div key={s.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={false}
                        animate={{
                          backgroundColor: done ? "#16A34A" : "#e2e8f0",
                          scale: active ? 1.1 : 1,
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-full"
                      >
                        <Icon
                          size={16}
                          className={done ? "text-white" : "text-[#94a3b8]"}
                        />
                      </motion.div>
                      {i < TRACKING_STEPS.length - 1 && (
                        <div className="relative my-1 h-8 w-0.5 overflow-hidden rounded-full bg-[#e2e8f0]">
                          <motion.div
                            initial={false}
                            animate={{
                              height: i < currentStep ? "100%" : "0%",
                            }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-x-0 top-0 bg-[#16A34A]"
                          />
                        </div>
                      )}
                    </div>
                    <div className="pb-2 pt-1">
                      <div
                        className={`text-[13px] font-semibold ${done ? "text-[#111827]" : "text-[#94a3b8]"}`}
                        style={{ fontFamily: displayFont }}
                      >
                        {s.label}
                      </div>
                      <div className="text-[11px] text-[#94a3b8]">{s.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
