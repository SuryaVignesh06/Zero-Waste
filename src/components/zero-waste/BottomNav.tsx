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
  TrendingUp,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: any;
  screen: any;
}

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  user: [
    { id: "home", label: "Home", icon: Home, screen: "home" },
    { id: "marketplace", label: "Shop", icon: ShoppingBag, screen: "marketplace" },
    { id: "donate", label: "Donate", icon: HandHeart, screen: "donate" },
    { id: "impact", label: "Activity", icon: Activity, screen: "impact" },
    { id: "profile", label: "Profile", icon: User, screen: "profile" },
  ],
  shop: [
    { id: "home", label: "Shop", icon: Store, screen: "home" },
    { id: "impact", label: "Activity", icon: Activity, screen: "impact" },
    { id: "profile", label: "Profile", icon: User, screen: "profile" },
  ],
  ngo: [
    { id: "home", label: "Feed", icon: HeartHandshake, screen: "home" },
    { id: "map", label: "Map", icon: MapPin, screen: "ngo-feed" },
    { id: "impact", label: "Activity", icon: Activity, screen: "impact" },
    { id: "profile", label: "Profile", icon: User, screen: "profile" },
  ],
  volunteer: [
    { id: "home", label: "Hub", icon: Bike, screen: "home" },
    { id: "impact", label: "Activity", icon: Activity, screen: "impact" },
    { id: "profile", label: "Profile", icon: User, screen: "profile" },
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
        className="absolute bottom-28 right-4 z-40"
        aria-label="AI Assistant"
      >
        <div className="zw-aura relative flex h-12 w-12 items-center justify-center rounded-full bg-[#16A34A] shadow-lg">
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
            className="absolute bottom-28 left-4 z-40"
            aria-label="Cart"
          >
            <div
              className="flex h-12 items-center gap-2 rounded-full bg-white px-4 shadow-lg"
              style={{ boxShadow: "0 4px 20px rgba(17, 24, 39, 0.12)" }}
            >
              <ShoppingBag size={16} className="text-[#16A34A]" />
              <span
                className="text-sm font-bold text-[#111827]"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
              >
                {cartCount()}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating pill-shaped bottom navigation */}
      <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-4 pt-2">
        <div
          className="mx-auto flex max-w-md items-center justify-around rounded-[36px] px-2 py-2"
          style={{
            background: "#ffffff",
            boxShadow: "0 8px 32px rgba(17, 24, 39, 0.1)",
          }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              screen === item.screen ||
              (item.id === "home" && homeScreensByRole[role].includes(screen));

            const isCenter = item.id === "donate";

            return (
              <motion.button
                key={item.id}
                onClick={() => setScreen(item.screen)}
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-1 flex-col items-center justify-center gap-1 py-1.5"
              >
                {isCenter ? (
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="-mt-7 flex h-14 w-14 items-center justify-center rounded-[22px]"
                    style={{
                      background: "linear-gradient(135deg, #16a34a, #15803d)",
                      boxShadow: "0 8px 24px rgba(22, 163, 74, 0.35)",
                    }}
                  >
                    <Icon size={24} className="text-white" strokeWidth={2.4} />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="relative flex items-center justify-center"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-bg"
                        className="absolute h-10 w-10 rounded-full"
                        style={{ background: "#dcfce7" }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      />
                    )}
                    <Icon
                      size={22}
                      strokeWidth={isActive ? 2.4 : 1.8}
                      className={`relative ${isActive ? "text-[#16A34A]" : "text-[#94a3b8]"}`}
                      fill={isActive ? "currentColor" : "none"}
                      fillOpacity={isActive ? 0.15 : 0}
                    />
                  </motion.div>
                )}
                {!isCenter && (
                  <span
                    className={`text-[10px] tracking-tight ${isActive ? "text-[#16A34A] font-semibold" : "text-[#94a3b8] font-medium"}`}
                  >
                    {item.label}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}
