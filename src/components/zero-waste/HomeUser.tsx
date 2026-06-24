"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  MapPin, Bell, User, ShoppingBag, Heart, HandHeart, Users, ChevronRight, CheckCircle2
} from "lucide-react";

export function HomeUser() {
  const setScreen = useAppStore((s) => s.setScreen);
  const impactStories = useAppStore((s) => s.impactStories);
  const reservations = useAppStore((s) => s.reservations);

  const [mealsRescued, setMealsRescued] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Count-up animations
    const duration = 800;
    const steps = 60;
    let currentStep = 0;
    const targetMeals = 24;

    const timer = setInterval(() => {
      currentStep++;
      setMealsRescued(Math.min(targetMeals, Math.round((currentStep / steps) * targetMeals)));
      if (currentStep >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
      className="bg-[#F7F5F0]"
      onScroll={(e) => setScrolled((e.target as HTMLDivElement).scrollTop > 20)}
    >
      {/* Sticky header */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 transition-shadow"
        style={{
          background: "rgba(247,245,240,0.92)",
          backdropFilter: "blur(16px)",
          height: "72px",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.04)" : "none"
        }}
      >
        <div className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect x="8" y="8" width="16" height="16" rx="6" transform="rotate(45 16 16)" fill="#1A6B3C" />
            <path d="M16 11 L19 16 L16 21 L13 16 Z" fill="white" />
          </svg>
          <span className="text-[18px] font-bold text-[#0A0A0A] ml-1" style={{ fontFamily: "var(--font-outfit)" }}>
            Zero Waste
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScreen("userProfile" as any)}
            className="flex h-10 w-10 overflow-hidden rounded-full border-2 border-[#E8E8E4]"
          >
            <img src="https://i.pravatar.cc/100?img=33" alt="Avatar" className="h-full w-full object-cover" />
          </button>
        </div>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        
        {/* Greeting + Location */}
        <div className="px-5 mt-2">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-[#1A6B3C]" />
            <span className="text-[13px] font-medium text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Koramangala, Bangalore
            </span>
          </div>
          <h1 className="mt-2 text-[26px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
            Good morning, Arjun
          </h1>
        </div>

        {/* Impact Hero Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="mt-5 px-5"
        >
          <div
            className="relative w-full rounded-[24px] p-6 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0A2E1A 0%, #1A6B3C 100%)",
              boxShadow: "0px 8px 24px rgba(26,107,60,0.25)"
            }}
          >
            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="text-[12px] font-bold tracking-[1px] uppercase text-white/70" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Your Impact
                </div>
                <div className="mt-1.5 text-[32px] font-extrabold text-white leading-none" style={{ fontFamily: "var(--font-outfit)" }}>
                  {mealsRescued} People
                </div>
                <div className="mt-1 text-[13px] font-medium text-white/80" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Fed this month
                </div>
              </div>
              <div className="flex flex-col gap-3 text-right">
                <div>
                  <div className="text-[18px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>18.4kg</div>
                  <div className="text-[11px] font-medium text-white/70" style={{ fontFamily: "var(--font-jakarta)" }}>CO₂ Saved</div>
                </div>
                <div>
                  <div className="text-[18px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>₹1,240</div>
                  <div className="text-[11px] font-medium text-white/70" style={{ fontFamily: "var(--font-jakarta)" }}>Money Saved</div>
                </div>
              </div>
            </div>

            {/* Background design element */}
            <div className="absolute -bottom-10 -right-10 opacity-10">
              <svg width="180" height="180" viewBox="0 0 24 24" fill="white">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions (Grid of 4) */}
        <div className="mt-6 px-5">
          <h2 className="text-[16px] font-bold text-[#0A0A0A] mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
            How would you like to help?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <ActionCard 
              icon={<Heart size={24} color="#C25A2A" />}
              title="Impact Stories"
              subtitle="See real results"
              bg="#F0D8C8"
              onClick={() => setScreen("donorImpactStoryView" as any)}
            />
            <ActionCard 
              icon={<Heart size={24} color="#1A6B3C" />}
              title="Donate Bulk"
              subtitle="Give excess food"
              bg="#F0F7F2"
              onClick={() => setScreen("donate")}
            />
            <ActionCard 
              icon={<HandHeart size={24} color="#2563EB" />}
              title="Ask Food"
              subtitle="Request a meal"
              bg="#DBEAFE"
              onClick={() => setScreen("foodRequest")}
            />
            <ActionCard 
              icon={<Users size={24} color="#7C3AED" />}
              title="Volunteer"
              subtitle="Rescue food"
              bg="#F3E8FF"
              onClick={() => setScreen("volunteerMap" as any)}
            />
          </div>
        </div>

        {/* Your Impact Stories */}
        <div className="mt-8 mb-6">
          <div className="px-5 flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              Your Verified Impact
            </h2>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 px-5 no-scrollbar">
            {(impactStories || []).map((story) => (
              <div 
                key={story.id} 
                onClick={() => {
                  useAppStore.getState().setActiveStoryId(story.id);
                  setScreen("donorImpactStoryView" as any);
                }}
                className="flex min-w-[240px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                <div className="h-[120px] w-full bg-[#E8E8E4] relative">
                  {story.imageUrl && <img src={story.imageUrl} alt="Proof" className="h-full w-full object-cover" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-md">
                    <CheckCircle2 size={12} color="#4ADE80" />
                    <span className="text-[10px] font-bold text-white tracking-wider">Verified</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-[15px] font-bold text-[#0A0A0A] leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>{story.beneficiariesCount} people fed</h3>
                  <p className="mt-1 text-[12px] text-[#8A8A8A] line-clamp-1" style={{ fontFamily: "var(--font-jakarta)" }}>From {story.foodType}</p>
                </div>
              </div>
            ))}
            
            {(!impactStories || impactStories.length === 0) && (
              <div className="flex h-[180px] w-full flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#E8E8E4] bg-white">
                <Heart size={32} color="#8A8A8A" />
                <span className="mt-3 text-[15px] font-bold text-[#4A4A4A]" style={{ fontFamily: "var(--font-outfit)" }}>No stories yet</span>
                <span className="text-[12px] text-[#8A8A8A] mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>Donate food to see your impact</span>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

function ActionCard({ icon, title, subtitle, bg, onClick }: { icon: any, title: string, subtitle: string, bg: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-start rounded-[20px] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] active:scale-95 transition-transform"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] mb-3" style={{ background: bg }}>
        {icon}
      </div>
      <h3 className="text-[16px] font-bold text-[#0A0A0A] leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>{title}</h3>
      <p className="text-[12px] font-medium text-[#8A8A8A] mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>{subtitle}</p>
    </button>
  );
}
