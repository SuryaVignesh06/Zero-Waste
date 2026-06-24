"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ArrowLeft, MapPin, Bike, CheckCircle, Package, Camera, UploadCloud, ChevronRight, ShieldCheck } from "lucide-react";

export function NgoDeliveryTracking() {
  const setScreen = useAppStore((s) => s.setScreen);
  const activeTrackingId = useAppStore((s) => s.activeTrackingId);
  const donations = useAppStore((s) => s.donations);
  
  const donation = donations.find(d => d.id === activeTrackingId);
  const [progress, setProgress] = useState(0);

  // V2 Status: "moving", "arrived", "verified"
  const [trackingState, setTrackingState] = useState<"moving" | "arrived" | "verified">("moving");

  useEffect(() => {
    // Simulate volunteer moving
    if (trackingState !== "moving") return;
    
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTrackingState("arrived");
          return 100;
        }
        return p + 2; // Move faster for demo
      });
    }, 100);
    return () => clearInterval(timer);
  }, [trackingState]);

  if (!donation) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#F7F5F0]">
        <button onClick={() => setScreen("ngoFeed")} className="text-[15px] font-medium text-[#1A6B3C] underline">Go Back</button>
      </div>
    );
  }

  const startX = 80;
  const startY = 650;
  const endX = 300;
  const endY = 150;
  const currentX = startX + (endX - startX) * (progress / 100);
  const currentY = startY + (endY - startY) * (progress / 100);

  const handleVerifyReceipt = () => {
    setScreen("ngoDistributionProofUploader" as any);
  };

  return (
    <div className="flex h-full flex-col bg-[#E8E2D9] relative overflow-hidden">
      
      {/* Fake Map Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="h-full w-full opacity-80" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
          <path d="M-50 100 Q 100 50 150 200 T 300 400 T 500 200 L 500 -50 L -50 -50 Z" fill="#C8E8D0" opacity="0.4" />
          <path d="M200 600 Q 300 500 450 700 T 400 900 L 100 900 Z" fill="#C8E8D0" opacity="0.3" />
          
          <g stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 50 -50 L 100 200 L 300 350 L 250 600 L 50 900" />
            <path d="M -50 300 L 300 350 L 500 200" />
            <path d="M 250 600 L 500 550" />
          </g>
          
          <path 
            d={`M ${startX} ${startY} L ${endX} ${endY}`} 
            stroke="#1A6B3C" 
            strokeWidth="6" 
            strokeDasharray="10 10" 
            fill="none" 
            opacity="0.5" 
          />
          
          <path 
            d={`M ${startX} ${startY} L ${endX} ${endY}`} 
            stroke="#1A6B3C" 
            strokeWidth="6" 
            fill="none" 
            strokeDasharray="400"
            strokeDashoffset={400 - (progress / 100) * 400}
          />
        </svg>

        {/* Origin Pin */}
        <div className="absolute z-10" style={{ left: startX, top: startY, transform: "translate(-50%, -50%)" }}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border-2 border-[#E8E8E4]">
            <MapPin size={20} className="text-[#8A8A8A]" />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 rounded bg-white px-2 py-0.5 text-[10px] font-bold shadow-sm whitespace-nowrap text-[#4A4A4A]">
            Pickup
          </div>
        </div>

        {/* Destination Pin */}
        <div className="absolute z-10" style={{ left: endX, top: endY, transform: "translate(-50%, -50%)" }}>
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${trackingState === 'arrived' ? 'bg-[#22C55E] ring-[#22C55E]/30' : 'bg-[#1A6B3C] ring-[#1A6B3C]/20'} shadow-lg ring-4 transition-colors`}>
            <MapPin size={22} className="text-white fill-white" />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 rounded bg-[#0A0A0A] px-2 py-0.5 text-[10px] font-bold text-white shadow-sm whitespace-nowrap">
            Your NGO
          </div>
        </div>

        {/* Moving Vehicle */}
        {trackingState === "moving" && (
          <motion.div 
            className="absolute z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl ring-2 ring-[#1A6B3C]"
            animate={{ left: currentX, top: currentY }}
            transition={{ type: "tween", ease: "linear", duration: 0.1 }}
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <Bike size={26} className="text-[#1A6B3C]" />
          </motion.div>
        )}
      </div>

      {/* Header Back Button */}
      <div className="absolute top-0 inset-x-0 p-5 z-30">
        <button
          onClick={() => setScreen("ngoFeed")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md active:scale-95 transition-transform border border-[#E8E8E4]"
        >
          <ArrowLeft size={24} className="text-[#0A0A0A]" />
        </button>
      </div>

      {/* Bottom Sheet Context */}
      <div className="absolute bottom-0 inset-x-0 z-30">
        <AnimatePresence mode="wait">
          {trackingState === "moving" && (
            <motion.div 
              key="moving"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white rounded-t-[32px] p-6 pb-8 shadow-[0_-8px_32px_rgba(0,0,0,0.08)]"
            >
              <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-[#E8E8E4]" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[24px] font-extrabold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                    Heading your way
                  </h2>
                  <p className="mt-1 flex items-center gap-2 text-[14px] font-medium text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    <span className="flex h-2 w-2 rounded-full bg-[#F59E0B] animate-pulse" />
                    Volunteer is arriving in ~3 mins
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#F7F5F0] p-4 border border-[#E8E8E4]">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-[#C8E8D0] overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=12" alt="Volunteer" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Rahul S.</h3>
                    <p className="text-[12px] text-[#4A4A4A] mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>Volunteer • 14 rescues</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {trackingState === "arrived" && (
            <motion.div 
              key="arrived"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-[32px] p-6 pb-8 shadow-[0_-8px_32px_rgba(0,0,0,0.08)] flex flex-col"
            >
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#E8E8E4]" />
              
              <div className="flex flex-col items-center text-center">
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#F0F7F2] mb-4">
                  <CheckCircle size={36} color="#1A6B3C" />
                </div>
                <h2 className="text-[26px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Food Arrived
                </h2>
                <p className="mt-2 text-[14px] text-[#4A4A4A] max-w-[280px]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  The volunteer has dropped off the food. Confirm receipt to close the loop for the donor.
                </p>
              </div>

              <div className="mt-6 rounded-[20px] bg-[#F7F5F0] p-4 border border-[#E8E8E4]">
                <div className="flex items-center gap-3">
                  <Package size={24} color="#8A8A8A" />
                  <div>
                    <h4 className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{donation.items[0]?.name || "Food Package"}</h4>
                    <p className="text-[12px] text-[#8A8A8A] mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>{donation.items[0]?.qty || "Multiple items"}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleVerifyReceipt}
                className="mt-6 flex h-[58px] w-full items-center justify-center gap-2 rounded-full bg-[#1A6B3C] text-[17px] font-bold text-white shadow-[0_8px_24px_rgba(26,107,60,0.25)] active:scale-95 transition-transform"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                <ShieldCheck size={22} />
                Verify Receipt & Upload Proof
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
