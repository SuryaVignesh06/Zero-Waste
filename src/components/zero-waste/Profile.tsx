"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { ChevronRight, MapPin, CreditCard, Bell, Shield, HelpCircle, Settings, LogOut, Award, Star, Recycle, ShoppingBag, Heart, Package } from "lucide-react";

export function Profile() {
  const setScreen = useAppStore((s) => s.setScreen);
  const role = useAppStore((s) => s.role);
  const impactPoints = useAppStore((s) => s.impactPoints);
  const mealsSaved = useAppStore((s) => s.mealsSaved);
  const moneySaved = useAppStore((s) => s.moneySaved);

  const MENU_SECTIONS = [
    { title: "Account", items: [{ icon: MapPin, label: "Saved Addresses", sub: "2 addresses" }, { icon: CreditCard, label: "Payment Methods", sub: "UPI, 1 card" }, { icon: Bell, label: "Notifications", sub: "Push, Email" }] },
    { title: "Orders & Donations", items: [{ icon: ShoppingBag, label: "My Orders", sub: "12 orders" }, { icon: Heart, label: "Donation History", sub: "8 donations" }, { icon: Package, label: "Saved Products", sub: "5 items" }] },
    { title: "Preferences", items: [{ icon: Recycle, label: "Switch Role", sub: role, action: "switch" }, { icon: Shield, label: "Privacy & Security", sub: "Verified account" }, { icon: Settings, label: "App Settings", sub: "Theme, Language" }] },
    { title: "Support", items: [{ icon: HelpCircle, label: "Help Center", sub: "FAQs, Contact" }, { icon: Star, label: "Rate Zero-Waste", sub: "on Play Store" }] },
  ];

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }} className="bg-[#f5f1ed]">
      <div className="bg-white px-5 py-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <h1 className="text-[24px] font-bold tracking-tight text-[#1a1a1a]">Profile</h1>
      </div>

      <main style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: "120px" }}>
        <div className="px-5 pt-4 space-y-5">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden p-6 text-white" style={{ borderRadius: "24px", background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 8px 24px rgba(4, 120, 87, 0.3)" }}>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20"><span className="text-2xl font-bold">R</span></div>
              <div className="flex-1"><h2 className="text-lg font-bold tracking-tight">Ramesh Kumar</h2><p className="text-[12px] text-white/85">+91 98765 43210</p><div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold uppercase"><Award size={10} />Gold Member</div></div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/20 pt-5 text-center">
              <div><div className="text-lg font-bold">{impactPoints.toLocaleString("en-IN")}</div><div className="text-[10px] text-white/80">Points</div></div>
              <div><div className="text-lg font-bold">{mealsSaved}</div><div className="text-[10px] text-white/80">Meals saved</div></div>
              <div><div className="text-lg font-bold">\u20B9{moneySaved}</div><div className="text-[10px] text-white/80">Saved</div></div>
            </div>
          </motion.div>

          {MENU_SECTIONS.map((section, si) => (
            <motion.div key={si} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + si * 0.08 }}>
              <h3 className="mb-2 ml-2 text-[12px] font-bold uppercase tracking-wide text-[#4a4a4a]">{section.title}</h3>
              <div className="overflow-hidden bg-white" style={{ borderRadius: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
                {section.items.map((item, ii) => { const Icon = item.icon; return (
                  <button key={ii} onClick={() => { if (item.action === "switch") setScreen("role-select"); }} className={`flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[#faf7f3] ${ii > 0 ? "border-t border-[#f3efe9]" : ""}`}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ecfdf5] text-[#047857]"><Icon size={16} /></div>
                    <div className="flex-1"><div className="text-[13px] font-semibold text-[#1a1a1a]">{item.label}</div><div className="text-[11px] text-[#8e8e93]">{item.sub}</div></div>
                    <ChevronRight size={16} className="text-[#8e8e93]" />
                  </button>
                ); })}
              </div>
            </motion.div>
          ))}

          <button onClick={() => setScreen("onboarding")} className="flex w-full items-center justify-center gap-2 bg-white py-3.5 text-[13px] font-semibold text-[#dc2626] active:scale-98" style={{ borderRadius: "14px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
            <LogOut size={16} />Log Out
          </button>
          <p className="text-center text-[11px] text-[#8e8e93]">Zero-Waste v1.0.0 · Made with care</p>
        </div>
      </main>
    </div>
  );
}
