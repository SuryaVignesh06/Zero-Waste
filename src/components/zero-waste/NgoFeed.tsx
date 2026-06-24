"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { 
  CheckCircle, Settings, MapPin, Users, Heart, ArrowRight, ShieldCheck, 
  Bike, Camera, Clock, CheckCircle2, ChevronRight, LayoutList 
} from "lucide-react";
import { formatINR } from "./Countdown";

export function NgoFeed() {
  const setScreen = useAppStore((s) => s.setScreen);
  const setActiveTrackingId = useAppStore((s) => s.setActiveTrackingId);
  const setActiveStoryId = useAppStore((s) => s.setActiveStoryId);
  const donations = useAppStore((s) => s.donations);
  const impactStories = useAppStore((s) => s.impactStories);

  const [tab, setTab] = useState<"awaiting" | "active" | "pending" | "completed">("awaiting");

  // Filter donations based on V2 flow
  // listed = awaiting action
  // assigned/picked_up = active pickups
  // delivered = pending verification (needs proof)
  const awaitingAction = donations.filter(d => d.status === "listed");
  const activePickups = donations.filter(d => d.status === "assigned" || d.status === "picked_up");
  const pendingVerification = donations.filter(d => d.status === "delivered"); // Fake status for demo purposes, assume volunteers update this

  const handleTrackDelivery = (id: string) => {
    setActiveTrackingId(id);
    setScreen("ngoDeliveryTracking" as any);
  };

  const handleVerify = (id: string) => {
    setActiveTrackingId(id);
    setScreen("ngoDistributionProofUploader" as any);
  };

  const handleViewStory = (id: string) => {
    setActiveStoryId(id);
    setScreen("donorImpactStoryView" as any);
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Header — Deep Green Gradient */}
      <div
        className="relative px-5 pt-12 pb-6 z-10"
        style={{
          background: "linear-gradient(180deg, #0A2E1A 0%, #1A6B3C 100%)",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[24px] font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                NSS Chapter
              </h1>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-[#C8E8D0]" />
                <span className="text-[12px] font-medium text-[#C8E8D0]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Verified NGO
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setScreen("ngoProfile" as any)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
            <Settings size={20} className="text-white" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: "awaiting", label: `Awaiting (${awaitingAction.length})` },
            { id: "active", label: `Active (${activePickups.length})` },
            { id: "pending", label: `Pending Verification (${pendingVerification.length})` },
            { id: "completed", label: "Completed Stories" }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className="relative shrink-0 rounded-full px-4 py-2 text-[13px] font-bold transition-colors"
              style={{
                backgroundColor: tab === t.id ? "white" : "rgba(255,255,255,0.1)",
                color: tab === t.id ? "#1A6B3C" : "white",
                fontFamily: "var(--font-jakarta)"
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-5 pt-4 pb-24">
        <AnimatePresence mode="wait">
          
          {/* Volunteer Directory (Always visible or maybe only in awaiting/active?) Let's put it at the top of Awaiting tab */}
          {tab === "awaiting" && (
            <motion.div key="awaiting" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
              
              {/* Active Volunteers Directory */}
              <div className="mb-2">
                <h3 className="text-[15px] font-bold text-[#0A0A0A] mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                  Active Volunteers Nearby
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar -mx-5 px-5">
                  {[
                    { name: "Rahul S.", dist: "0.8km", phone: "9876543210" },
                    { name: "Ayesha M.", dist: "1.2km", phone: "9876543211" },
                    { name: "Vikram K.", dist: "2.1km", phone: "9876543212" },
                  ].map((vol, i) => (
                    <div key={i} className="flex min-w-[140px] flex-col items-center rounded-[20px] border border-[#E8E8E4] bg-white p-4 shadow-[0px_4px_16px_rgba(0,0,0,0.03)] shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5E6C8]">
                        <Users size={24} className="text-[#D97706]" />
                      </div>
                      <div className="mt-3 text-center">
                        <div className="text-[14px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{vol.name}</div>
                        <div className="mt-0.5 flex items-center justify-center gap-1 text-[11px] font-medium text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>
                          <MapPin size={10} /> {vol.dist}
                        </div>
                      </div>
                      <a href={`tel:${vol.phone}`} className="mt-4 flex h-9 w-full items-center justify-center rounded-full bg-[#1A6B3C] text-[13px] font-bold text-white shadow-sm transition-transform active:scale-95" style={{ fontFamily: "var(--font-outfit)" }}>
                        Call
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              
              <h3 className="text-[15px] font-bold text-[#0A0A0A] mt-2" style={{ fontFamily: "var(--font-outfit)" }}>
                Live Food Donations
              </h3>
              {awaitingAction.map((d) => (
                <div key={d.id} className="rounded-[20px] bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{d.title}</h3>
                      <p className="mt-0.5 text-[12px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>{d.items[0]?.name || "Mixed Food"}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-[#FEF2F2] px-2 py-1">
                      <Clock size={12} color="#DC2626" />
                      <span className="text-[10px] font-bold text-[#DC2626]">Urgent</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <MapPin size={14} color="#8A8A8A" />
                    <span className="text-[12px] text-[#4A4A4A]" style={{ fontFamily: "var(--font-jakarta)" }}>{d.pickupDistanceKm}km away</span>
                  </div>

                  <button className="mt-4 w-full rounded-xl bg-[#F0F7F2] py-2.5 text-[13px] font-bold text-[#1A6B3C] active:scale-95 transition-transform" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Send Volunteer Request
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {tab === "active" && (
            <motion.div key="active" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
              {activePickups.map((d) => (
                <div key={d.id} className="rounded-[20px] bg-white p-4 shadow-sm border border-[#E8E8E4]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#C8E8D0] flex items-center justify-center">
                        <Bike size={14} color="#1A6B3C" />
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Volunteer Assigned</span>
                        <span className="block text-[11px] text-[#8A8A8A]" style={{ fontFamily: "var(--font-jakarta)" }}>Rahul S.</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#1A6B3C]">On the way</span>
                  </div>

                  <h3 className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>{d.title}</h3>
                  
                  <button 
                    onClick={() => handleTrackDelivery(d.id)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A6B3C] py-3 text-[13px] font-bold text-white shadow-sm active:scale-95 transition-transform" style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    Track Volunteer
                  </button>
                </div>
              ))}
              {activePickups.length === 0 && (
                <div className="flex flex-col items-center justify-center pt-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8E8E4]/50 mb-3"><LayoutList size={24} color="#8A8A8A" /></div>
                  <h3 className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>No active pickups</h3>
                </div>
              )}
            </motion.div>
          )}

          {tab === "pending" && (
            <motion.div key="pending" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
              {pendingVerification.length > 0 ? pendingVerification.map((d) => (
                <div key={d.id} className="rounded-[20px] bg-[#FEFCE8] p-4 shadow-sm border border-[#FEF08A]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[15px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>Food Arrived!</h3>
                      <p className="mt-0.5 text-[12px] text-[#854D0E]" style={{ fontFamily: "var(--font-jakarta)" }}>{d.title}</p>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-[13px] text-[#713F12]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    Confirm receipt by uploading a distribution photo. This closes the loop for the donor.
                  </p>

                  <button 
                    onClick={() => handleVerify(d.id)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#EAB308] py-2.5 text-[13px] font-bold text-white shadow-sm active:scale-95 transition-transform" style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    <Camera size={16} />
                    Upload Proof
                  </button>
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center pt-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8E8E4]/50 mb-3"><ShieldCheck size={24} color="#8A8A8A" /></div>
                  <h3 className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>All caught up!</h3>
                </div>
              )}
            </motion.div>
          )}

          {tab === "completed" && (
            <motion.div key="completed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
              {impactStories.map((story) => (
                <div key={story.id} className="flex overflow-hidden rounded-[20px] bg-white shadow-sm">
                  <div className="h-[100px] w-[100px] shrink-0 bg-[#E8E8E4]">
                    {story.imageUrl && <img src={story.imageUrl} alt="Proof" className="h-full w-full object-cover" />}
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-3">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 size={12} color="#1A6B3C" />
                      <span className="text-[10px] font-bold text-[#1A6B3C] uppercase tracking-wider">Verified</span>
                    </div>
                    <h4 className="mt-1 text-[15px] font-bold text-[#0A0A0A] line-clamp-1" style={{ fontFamily: "var(--font-outfit)" }}>{story.beneficiariesCount} People Fed</h4>
                    <p className="mt-1 text-[12px] text-[#4A4A4A] line-clamp-1" style={{ fontFamily: "var(--font-jakarta)" }}>From {story.foodType}</p>
                    <button 
                      onClick={() => handleViewStory(story.id)}
                      className="mt-2 text-[12px] font-bold text-[#1A6B3C] underline flex items-center" style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      View Story <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
              {impactStories.length === 0 && (
                <div className="flex flex-col items-center justify-center pt-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8E8E4]/50 mb-3"><Heart size={24} color="#8A8A8A" /></div>
                  <h3 className="text-[16px] font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>No stories yet</h3>
                  <p className="text-[13px] text-[#4A4A4A] mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>Upload proof to generate impact stories.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
