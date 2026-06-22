"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import type { Role } from "@/lib/types";
import { Home, MapPin, ShoppingBag, User, Inbox, Sparkles, HeartHandshake, Bike, Store } from "lucide-react";

interface TabDef {
  id: string;
  icon: any;
  screen: any;
}

const TABS_BY_ROLE: Record<Role, TabDef[]> = {
  user: [
    { id: "home", icon: Home, screen: "home" },
    { id: "rescue", icon: MapPin, screen: "ngo-feed" },
    { id: "market", icon: ShoppingBag, screen: "marketplace" },
    { id: "profile", icon: User, screen: "impact" },
  ],
  ngo: [
    { id: "feed", icon: Inbox, screen: "ngo-feed" },
    { id: "map", icon: MapPin, screen: "volunteer-map" },
    { id: "profile", icon: User, screen: "impact" },
  ],
  shop: [
    { id: "home", icon: Store, screen: "shop-dashboard" },
    { id: "profile", icon: User, screen: "impact" },
  ],
  volunteer: [
    { id: "home", icon: Bike, screen: "volunteer-map" },
    { id: "profile", icon: User, screen: "impact" },
  ],
};

const homeScreensByRole: Record<Role, string[]> = {
  user: ["home", "marketplace", "checkout", "order-tracking", "donate"],
  ngo: ["ngo-feed", "volunteer-map"],
  shop: ["shop-dashboard"],
  volunteer: ["volunteer-map"],
};

export function BottomNav() {
  const role = useAppStore((s) => s.role);
  const screen = useAppStore((s) => s.screen);
  const setScreen = useAppStore((s) => s.setScreen);
  const setAssistantOpen = useAppStore((s) => s.setAssistantOpen);
  const cartCount = useAppStore((s) => s.cartCount);
  const setCartOpen = useAppStore((s) => s.setCartOpen);

  if (!role) return null;
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

      {/* Floating cart button (user only) */}
      {role === "user" && cartCount() > 0 && (
        <motion.button
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCartOpen(true)}
          className="absolute left-4 z-40"
          style={{ bottom: "100px" }}
          aria-label="Cart"
        >
          <div
            className="flex h-12 items-center gap-2 rounded-full px-4"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.60)",
              boxShadow: "0px 4px 24px rgba(0,0,0,0.08)",
            }}
          >
            <ShoppingBag size={16} className="text-[#1A6B3C]" />
            <span className="text-sm font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
              {cartCount()}
            </span>
          </div>
        </motion.button>
      )}

      {/* Liquid glassmorphism bottom navigation */}
      <div className="absolute inset-x-0 z-30 flex justify-center px-5" style={{ bottom: "16px", pointerEvents: "none" }}>
        <div
          className="flex items-center justify-between rounded-[28px] p-2"
          style={{
            width: "100%",
            maxWidth: "340px",
            pointerEvents: "auto",
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(28px) saturate(200%)",
            WebkitBackdropFilter: "blur(28px) saturate(200%)",
            border: "1px solid rgba(255,255,255,0.60)",
            boxShadow: "0px -1px 0px rgba(0,0,0,0.04), 0px -8px 32px rgba(0,0,0,0.08), inset 0px 1px 0px rgba(255,255,255,0.6)",
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
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute flex items-center justify-center"
                    style={{
                      width: "48px",
                      height: "36px",
                      borderRadius: "14px",
                      background: "linear-gradient(135deg, #0A0A0A, #1a1a1a)",
                      boxShadow: "0px 4px 16px rgba(0,0,0,0.2), inset 0px 1px 0px rgba(255,255,255,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  >
                    <Icon size={20} className="text-white" strokeWidth={2.4} />
                  </motion.div>
                )}
                {!isActive && (
                  <Icon size={22} className="text-[#8A8A8A]" strokeWidth={1.8} />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}
