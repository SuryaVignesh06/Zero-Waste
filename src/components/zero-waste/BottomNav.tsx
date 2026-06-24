"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import type { Role } from "@/lib/types";
import { Home, MapPin, ShoppingBag, User, Inbox, Sparkles, HeartHandshake, Bike, Store, Users, Clock, Camera, HandHeart } from "lucide-react";

interface TabDef {
  id: string;
  icon: any;
  screen: string;
  label: string;
  center?: boolean;
}

const TABS_BY_ROLE: Record<Role, TabDef[]> = {
  user: [
    { id: "home", icon: Home, screen: "userHome", label: "Home" },
    { id: "reserve", icon: Store, screen: "localSavingsMarket", label: "Reserve" },
    { id: "donate", icon: Camera, screen: "donateFood", label: "Donate", center: true },
    { id: "track", icon: MapPin, screen: "donationTracking", label: "Track" },
    { id: "profile", icon: User, screen: "userProfile", label: "Profile" },
  ],
  ngo: [
    { id: "feed", icon: Inbox, screen: "ngoFeed", label: "Feed" },
    { id: "map", icon: MapPin, screen: "ngoMap", label: "Map" },
    { id: "volunteers", icon: Users, screen: "ngoVolunteers", label: "Team" },
    { id: "profile", icon: User, screen: "ngoProfile", label: "Profile" },
  ],
  shopkeeper: [
    { id: "home", icon: Store, screen: "shopkeeperDashboard", label: "Shop" },
    { id: "profile", icon: User, screen: "impactDashboard", label: "Profile" },
  ],
  volunteer: [
    { id: "home", icon: Home, screen: "volunteerHome", label: "Home" },
    { id: "history", icon: Clock, screen: "volunteerHistory", label: "History" },
    { id: "profile", icon: User, screen: "volunteerProfile", label: "Profile" },
  ],
  recipient: [
    { id: "home", icon: Home, screen: "recipientHome", label: "Home" },
    { id: "request", icon: HandHeart, screen: "foodRequest", label: "Request" },
    { id: "profile", icon: User, screen: "recipientProfile", label: "Profile" },
  ],
};

const homeScreensByRole: Record<Role, string[]> = {
  user: ["home", "userHome", "donateFood", "donationTracking", "localSavingsMarket"],
  ngo: ["ngoFeed", "ngoMap"],
  shopkeeper: ["shopkeeperDashboard"],
  volunteer: ["volunteerHome"],
  recipient: ["recipientHome", "foodRequest"],
};

export function BottomNav() {
  const role = useAppStore((s) => s.role);
  const screen = useAppStore((s) => s.screen);
  const setScreen = useAppStore((s) => s.setScreen);
  const setAssistantOpen = useAppStore((s) => s.setAssistantOpen);

  if (!role) return null;
  if (["shopkeeperSetup", "productDetailReserve", "reservationConfirmation", "addProductWizard", "ngoDistributionProofUploader", "donorImpactStoryView", "donate", "donation-tracking", "delivery-tracking", "ngoDeliveryTracking", "volunteerMap"].includes(screen)) return null;

  const tabs = TABS_BY_ROLE[role];

  return (
    <>
      {/* Floating AI Assistant button */}
      <motion.button
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setAssistantOpen(true)}
        className="absolute right-4 z-40"
        style={{ bottom: "100px" }}
        aria-label="AI Assistant"
      >
        <div className="zw-ai-border h-12 w-12 rounded-full p-[2px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white/95 backdrop-blur-md">
            <Sparkles size={20} className="text-[#1A6B3C]" />
          </div>
        </div>
      </motion.button>

      {/* Removed Floating cart button as e-commerce is removed */}

      {/* Liquid glassmorphism bottom navigation */}
      <div className="absolute inset-x-0 z-30 flex justify-center px-4" style={{ bottom: "16px", pointerEvents: "none" }}>
        <div
          className="flex items-center justify-between rounded-[28px] p-2"
          style={{
            width: "100%",
            maxWidth: "360px",
            height: "70px",
            pointerEvents: "auto",
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(40px) saturate(200%)",
            WebkitBackdropFilter: "blur(40px) saturate(200%)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12), inset 0px 1px 2px rgba(255, 255, 255, 0.8)",
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = screen === tab.screen || (tab.id === "home" && homeScreensByRole[role].includes(screen));

            return (
              <motion.button
                key={tab.id}
                onClick={() => setScreen(tab.screen)}
                whileTap={{ scale: 0.88 }}
                className="relative flex flex-1 items-center justify-center"
                style={{ height: "48px" }}
                aria-label={tab.id}
              >
                {isActive ? (
                  <div className="relative flex flex-col items-center justify-center w-full h-full">
                    <motion.div
                      layoutId="activeTabSquircle"
                      className="absolute"
                      style={{
                        width: "52px",
                        height: "44px",
                        borderRadius: "14px",
                        background: "#0A0A0A",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                    <Icon size={20} className="relative z-10 text-white mt-0.5" strokeWidth={2.4} />
                    <span className="relative z-10 text-white mt-0.5" style={{ fontSize: "10px", fontWeight: 600, fontFamily: "var(--font-jakarta)" }}>
                      {tab.label}
                    </span>
                  </div>
                ) : (
                  <Icon size={22} className="text-[#8A8A8A]" strokeWidth={2} />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}
