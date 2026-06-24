"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, Clock, MapPin, CheckCircle, Navigation2, Download } from "lucide-react";
import { formatINR } from "./Countdown";

const SLOTS = ["Today 6–8 PM", "Today 8–10 PM", "Tomorrow Morning"];

export function ReservationConfirmation() {
  const setScreen = useAppStore((s) => s.setScreen);
  const activeProduct = useAppStore((s) => s.activeProduct);
  const userName = useAppStore((s) => s.userName) || "User";
  const addReservation = useAppStore((s) => s.addReservation);

  const [selectedSlot, setSelectedSlot] = useState(SLOTS[0]);
  const [name, setName] = useState(userName);
  const [isReserving, setIsReserving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [reservationCode, setReservationCode] = useState("");

  if (!activeProduct) return null;

  const originalPrice = (activeProduct as any).mrp || (activeProduct as any).originalPrice;
  const discountedPrice = (activeProduct as any).sellingPrice || (activeProduct as any).discountedPrice;
  const daysLeft = (activeProduct as any).daysUntilExpiry || (activeProduct as any).daysToExpiry || 2;

  const handleConfirm = () => {
    setIsReserving(true);
    setTimeout(() => {
      const code = `ZWR-2024-${Math.floor(10000 + Math.random() * 90000)}`;
      setReservationCode(code);
      addReservation({
        id: code,
        productId: activeProduct.id,
        userId: "u1",
        shopkeeperId: activeProduct.shopkeeperId || "s1",
        status: "active",
        reservationCode: code,
        reservationSlot: "today_pm",
        claimedAt: new Date(),
        verifiedPickup: false,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 86400000), // +1 day
        notes: ""
      });
      setIsReserving(false);
      setShowSuccess(true);
    }, 1500);
  };

  const handleDone = () => {
    setShowSuccess(false);
    setScreen("localSavingsMarket");
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0] overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-[#F7F5F0] px-5 py-4 pb-2 pt-6">
        <button 
          onClick={() => setScreen("localSavingsMarket")}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ArrowLeft size={20} color="#0A0A0A" />
        </button>
        <div className="ml-4">
          <h1 className="text-[22px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            Confirm Reservation
          </h1>
        </div>
      </header>

      <main className="flex-1 px-5 pb-32">
        {/* Reservation Summary Card */}
        <div className="mt-5 rounded-[24px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
          <div className="flex gap-4">
            <div className={`h-[100px] w-[100px] shrink-0 rounded-2xl bg-gradient-to-br ${(activeProduct as any).imageColor || 'from-[#E8E8E4] to-[#F5F5F7]'} overflow-hidden`}>
              {activeProduct.imageUrl && <img src={activeProduct.imageUrl} alt={activeProduct.name} className="h-full w-full object-cover" />}
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-[17px] font-semibold leading-tight text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                {activeProduct.name}
              </h2>
              <span className="mt-1 text-[13px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                {(activeProduct as any).shopName || "Verified Shopkeeper"}
              </span>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[20px] font-bold text-[#1A6B3C]" style={{ fontFamily: "var(--font-outfit)" }}>{formatINR(discountedPrice)}</span>
                <span className="text-[14px] text-[#AEAEB2] line-through">{formatINR(originalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="my-4 h-px w-full bg-[#E8E8E4]" />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Clock size={18} color="#7C3AED" />
              <span className="text-[14px] font-medium text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Valid for</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SLOTS.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className="rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-colors"
                  style={{
                    backgroundColor: selectedSlot === slot ? "#7C3AED" : "transparent",
                    borderColor: selectedSlot === slot ? "#7C3AED" : "#E8E8E4",
                    color: selectedSlot === slot ? "white" : "#4A4A4A",
                    fontFamily: "var(--font-jakarta)"
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
            {daysLeft <= 2 && (
              <span className="text-[11px] text-[#D97706] font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>
                (Product expires in {daysLeft} days)
              </span>
            )}
          </div>
        </div>

        {/* Shop Location Card */}
        <div className="mt-4 rounded-[16px] bg-[#F5F5F7] p-4">
          <div className="flex items-start gap-3">
            <MapPin size={16} color="#0A0A0A" className="mt-0.5" />
            <div>
              <p className="text-[14px] font-medium leading-[1.4] text-[#0A0A0A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Fresh Mart, Main Road, Vadapalani, Chennai
              </p>
              <div className="mt-2 flex gap-3">
                <span className="text-[12px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Walkable: 2km</span>
                <span className="text-[12px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>~8 mins away</span>
              </div>
              <button className="mt-2 text-[13px] font-bold text-[#1A6B3C] underline" style={{ fontFamily: "var(--font-jakarta)" }}>
                Get Directions
              </button>
            </div>
          </div>
        </div>

        {/* Your Name */}
        <div className="mt-5">
          <label className="text-[14px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            Name to verify reservation
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 h-[56px] w-full rounded-[16px] border border-[#E8E8E4] px-4 text-[15px] outline-none placeholder:text-[#AEAEB2]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          />
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 p-5 pb-8 backdrop-blur-xl">
        <button
          onClick={handleConfirm}
          disabled={isReserving || !name.trim()}
          className="flex h-[58px] w-full items-center justify-center gap-2 rounded-full bg-[#1A6B3C] text-[17px] font-semibold text-white shadow-[0_8px_24px_rgba(26,107,60,0.25)] transition-opacity disabled:opacity-70"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {isReserving ? (
            <span className="animate-pulse">Creating...</span>
          ) : (
            <>
              <CheckCircle size={22} color="white" />
              Confirm Reservation
            </>
          )}
        </button>
      </footer>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/95 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-[340px] rounded-[32px] bg-white p-8 shadow-2xl flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#C8E8D0]"
              >
                <CheckCircle size={48} color="#1A6B3C" />
              </motion.div>

              <h2 className="mt-5 text-[32px] font-bold text-[#0A0A0A] text-center" style={{ fontFamily: "var(--font-outfit)" }}>
                Reserved!
              </h2>
              <p className="mt-2 text-[16px] text-[#4A4A4A] text-center" style={{ fontFamily: "var(--font-outfit)" }}>
                Show this at the shop
              </p>

              {/* QR Code Zone */}
              <div className="mt-6 flex flex-col items-center rounded-[20px] border-2 border-dashed border-[#1A6B3C] bg-white p-6 w-full">
                {/* Mock QR SVG */}
                <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill="white"/>
                  <path d="M10 10H40V40H10V10ZM15 15V35H35V15H15ZM60 10H90V40H60V10ZM65 15V35H85V15H65ZM10 60H40V90H10V60ZM15 65V85H35V65H15Z" fill="#1A6B3C"/>
                  <rect x="20" y="20" width="10" height="10" fill="#1A6B3C"/>
                  <rect x="70" y="20" width="10" height="10" fill="#1A6B3C"/>
                  <rect x="20" y="70" width="10" height="10" fill="#1A6B3C"/>
                  <path d="M50 50H90V60H50V50ZM60 70H90V80H60V70ZM50 85H75V95H50V85Z" fill="#1A6B3C"/>
                  <rect x="85" y="85" width="10" height="10" fill="#1A6B3C"/>
                </svg>
                <span className="mt-4 text-[13px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Show this to the cashier
                </span>
              </div>

              {/* Reservation Details */}
              <div className="mt-5 text-center">
                <div className="text-[14px] font-bold text-[#0A0A0A] font-mono tracking-wider">Code: {reservationCode}</div>
                <div className="mt-1 text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>Valid: {selectedSlot}</div>
                <div className="text-[13px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Location: Fresh Mart, Main Road</div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex w-full gap-3">
                <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#1A6B3A] text-[#1A6B3A] font-semibold text-[14px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <Navigation2 size={16} /> Directions
                </button>
                <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#0A0A0A] text-white font-semibold text-[14px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <Download size={16} /> Save QR
                </button>
              </div>

              <button 
                onClick={handleDone}
                className="mt-4 text-[15px] font-bold text-[#4A4A4A] underline"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
