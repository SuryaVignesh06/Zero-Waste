"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import type { Role } from "@/lib/types";
import {
  Home,
  ShoppingBag,
  HandHeart,
  Activity,
  User,
  Store,
  Bike,
  MapPin,
  Sparkles,
  HeartHandshake,
} from "lucide-react";

interface NavItem {
  id: string;
  icon: any;
  screen: any;
}

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  user: [
    { id: "home", icon: Home, screen: "home" },
    { id: "marketplace", icon: ShoppingBag, screen: "marketplace" },
    { id: "donate", icon: HandHeart, screen: "donate" },
    { id: "impact", icon: Activity, screen: "impact" },
    { id: "profile", icon: User, screen: "profile" },
  ],
  shop: [
    { id: "home", icon: Store, screen: "home" },
    { id: "impact", icon: Activity, screen: "impact" },
    { id: "profile", icon: User, screen: "profile" },
  ],
  ngo: [
    { id: "home", icon: HeartHandshake, screen: "home" },
    { id: "map", icon: MapPin, screen: "ngo-feed" },
    { id: "impact", icon: Activity, screen: "impact" },
    { id: "profile", icon: User, screen: "profile" },
  ],
  volunteer: [
    { id: "home", icon: Bike, screen: "home" },
    { id: "impact", icon: Activity, screen: "impact" },
    { id: "profile", icon: User, screen: "profile" },
  ],
};

export function BottomNav() {
  const role = useAppStore((s) => s.role);
  const screen = useAppStore((s) => s.screen);
  const setScreen = useAppStore((s) => s.setScreen);
  const setAssistantOpen = useAppStore((s) => s.setAssistantOpen);
  const cartCount = useAppStore((s) => s.cartCount);
  const setCartOpen = useAppStore((s) => s.setCartOpen);

  if (!role) return null;
  const items = NAV_BY_ROLE[role];

  const homeScreensByRole: Record<Role, string[]> = {
    user: ["home", "marketplace", "donate", "impact", "profile", "checkout", "order-tracking"],
    shop: ["home", "shop-dashboard", "impact", "profile"],
    ngo: ["home", "ngo-feed", "impact", "profile"],
    volunteer: ["home", "volunteer-map", "impact", "profile"],
  };

  return (
    <>
      {/* Floating AI Assistant button */}
      <motion.button
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setAssistantOpen(true)}
        className="absolute right-4 z-40"
        style={{ bottom: "104px" }}
        aria-label="AI Assistant"
      >
        <div className="zw-aura relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a1a]">
          <Sparkles size={20} className="text-white" />
        </div>
      </motion.button>

      {/* Floating cart button (user only) */}
      <AnimatePresence>
        {role === "user" && cartCount() > 0 && (
          <motion.button
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 50 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCartOpen(true)}
            className="absolute left-4 z-40"
            style={{ bottom: "104px" }}
            aria-label="Cart"
          >
            <div className="glass-light flex h-12 items-center gap-2 rounded-full px-4 shadow-lg">
              <ShoppingBag size={16} className="text-[#047857]" />
              <span className="text-sm font-bold text-[#1a1a1a]">{cartCount()}</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating glass bottom navigation — circular, black glass, icons only */}
      <div
        className="absolute inset-x-0 z-30 flex justify-center"
        style={{ bottom: "20px", pointerEvents: "none" }}
      >
        <div
          className="glass-nav flex items-center gap-1 rounded-full px-2 py-2"
          style={{ pointerEvents: "auto" }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              screen === item.screen ||
              (item.id === "home" && homeScreensByRole[role].includes(screen));

            return (
              <motion.button
                key={item.id}
                onClick={() => setScreen(item.screen)}
                whileTap={{ scale: 0.85 }}
                className="relative flex items-center justify-center"
                style={{ width: "48px", height: "48px" }}
                aria-label={item.id}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute rounded-full bg-white"
                    style={{ inset: "4px" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.4 : 1.8}
                  className={`relative ${isActive ? "text-[#047857]" : "text-white/70"}`}
                  fill={isActive ? "currentColor" : "none"}
                  fillOpacity={isActive ? 0.15 : 0}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}
