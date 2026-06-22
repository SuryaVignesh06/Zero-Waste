"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { Onboarding } from "./Onboarding";
import { RoleSelect } from "./RoleSelect";
import { HomeUser } from "./HomeUser";
import { Marketplace } from "./Marketplace";
import { ProductDetailSheet, CartSheet } from "./ProductDetailSheet";
import { DonateFood } from "./DonateFood";
import { Checkout, OrderTracking } from "./Checkout";
import { NgoFeed } from "./NgoFeed";
import { VolunteerMap } from "./VolunteerMap";
import { ShopDashboard } from "./ShopDashboard";
import { ImpactDashboard } from "./ImpactDashboard";
import { Profile } from "./Profile";
import { BottomNav } from "./BottomNav";
import { AiAssistant } from "./AiAssistant";

export function AppShell() {
  const { screen, role, setScreen } = useAppStore();

  useEffect(() => {
    if (role) {
      switch (role) {
        case "shop": setScreen("shop-dashboard"); break;
        case "ngo": setScreen("ngo-feed"); break;
        case "volunteer": setScreen("volunteer-map"); break;
        default: setScreen("home");
      }
    }
  }, [role]);

  if (screen === "onboarding") {
    return (
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <Onboarding />
      </div>
    );
  }

  if (screen === "role-select") {
    return (
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <RoleSelect />
      </div>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case "home":
        if (role === "shop") return <ShopDashboard />;
        if (role === "ngo") return <NgoFeed />;
        if (role === "volunteer") return <VolunteerMap />;
        return <HomeUser />;
      case "marketplace": return <Marketplace />;
      case "donate": return <DonateFood />;
      case "checkout": return <Checkout />;
      case "order-tracking": return <OrderTracking />;
      case "ngo-feed": return <NgoFeed />;
      case "volunteer-map": return <VolunteerMap />;
      case "shop-dashboard": return <ShopDashboard />;
      case "impact": return <ImpactDashboard />;
      case "profile": return <Profile />;
      default: return <HomeUser />;
    }
  };

  // CRITICAL: NO AnimatePresence/motion.div wrapper — it breaks flex height chain
  // The screen renders directly inside a flex container with minHeight: 0
  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", position: "relative" }}>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        {renderScreen()}
      </div>
      <ProductDetailSheet />
      <CartSheet />
      <AiAssistant />
      <BottomNav />
    </div>
  );
}
