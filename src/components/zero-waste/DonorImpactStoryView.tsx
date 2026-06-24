"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { X, Heart, Share2, MapPin, Users, Utensils, ShieldCheck } from "lucide-react";

export function DonorImpactStoryView() {
  const setScreen = useAppStore((s) => s.setScreen);
  const activeStoryId = useAppStore((s) => s.activeStoryId);
  const impactStories = useAppStore((s) => s.impactStories);

  const story = impactStories.find(s => s.id === activeStoryId);

  if (!story) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-50 flex flex-col bg-black"
    >
      {/* Background Image Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={story.imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80"} 
          alt="Impact Proof" 
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />
      </div>

      {/* Header Actions */}
      <header className="relative z-10 flex items-center justify-between p-5 pt-8">
        <button 
          onClick={() => setScreen("home")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md"
        >
          <X size={24} color="white" />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-md">
          <ShieldCheck size={16} color="#4ADE80" />
          <span className="text-[12px] font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>Verified Impact</span>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col justify-end p-6 pb-24">
        {/* NGO Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <span className="text-[16px] font-bold text-[#1A6B3C]">NSS</span>
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-white shadow-black drop-shadow-md" style={{ fontFamily: "var(--font-outfit)" }}>NSS Chapter</h2>
            <div className="flex items-center gap-1 text-[13px] text-white/90">
              <MapPin size={12} />
              <span style={{ fontFamily: "var(--font-jakarta)" }}>Chennai, Tamil Nadu</span>
            </div>
          </div>
        </div>

        {/* Main Impact Statement */}
        <h1 className="mt-4 text-[32px] font-extrabold leading-[1.1] text-white shadow-black drop-shadow-lg" style={{ fontFamily: "var(--font-outfit)" }}>
          You fed {story.beneficiariesCount} people today.
        </h1>

        <p className="mt-3 text-[15px] leading-relaxed text-white/90 drop-shadow-md" style={{ fontFamily: "var(--font-jakarta)" }}>
          Your donation of {story.foodType} successfully reached the community center. Thank you for making a real difference and completing the circle.
        </p>

        {/* Impact Cards */}
        <div className="mt-6 flex gap-3">
          <div className="flex flex-1 flex-col items-center rounded-2xl bg-white/20 p-3 backdrop-blur-md border border-white/20">
            <Users size={24} color="#4ADE80" className="mb-2" />
            <span className="text-[20px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>{story.beneficiariesCount}</span>
            <span className="text-[11px] font-medium text-white/80 uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>Meals Served</span>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-2xl bg-white/20 p-3 backdrop-blur-md border border-white/20">
            <Utensils size={24} color="#FBBF24" className="mb-2" />
            <span className="text-[20px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>10kg</span>
            <span className="text-[11px] font-medium text-white/80 uppercase tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>Food Saved</span>
          </div>
        </div>

      </main>

      {/* Action Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 p-5 pb-8 flex gap-4">
        <button className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-white text-[16px] font-bold text-[#0A0A0A] active:scale-95 transition-transform" style={{ fontFamily: "var(--font-outfit)" }}>
          <Heart size={20} fill="#EF4444" color="#EF4444" />
          Donate Again
        </button>
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white active:scale-95 transition-transform">
          <Share2 size={24} />
        </button>
      </footer>
    </motion.div>
  );
}
