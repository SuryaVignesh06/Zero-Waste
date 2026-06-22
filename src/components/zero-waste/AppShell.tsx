"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { Onboarding } from "./Onboarding";
import { Login } from "./Login";
import { Otp } from "./Otp";
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

  // Full-screen flows (no bottom nav)
  if (screen === "onboarding") {
    return <div style={{ flex: 1, minHeight: 0 }}><Onboarding /></div>;
  }
  if (screen === "login") {
    return <div style={{ flex: 1, minHeight: 0 }}><Login /></div>;
  }
  if (screen === "otp") {
    return <div style={{ flex: 1, minHeight: 0 }}><Otp /></div>;
  }
  if (screen === "role-select") {
    return <div style={{ flex: 1, minHeight: 0 }}><RoleSelect /></div>;
  }

  const renderScreen = () => {
    switch (screen) {
      case "home": return role === "shop" ? <ShopDashboard /> : role === "ngo" ? <NgoFeed /> : role === "volunteer" ? <VolunteerMap /> : <HomeUser />;
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
