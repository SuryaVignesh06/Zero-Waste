"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  ChevronRight,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  Settings,
  LogOut,
  Award,
  Star,
  Recycle,
  ShoppingBag,
  Heart,
  Package,
} from "lucide-react";

const displayFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

export function Profile() {
  const setScreen = useAppStore((s) => s.setScreen);
  const role = useAppStore((s) => s.role);
  const impactPoints = useAppStore((s) => s.impactPoints);
  const mealsSaved = useAppStore((s) => s.mealsSaved);
  const moneySaved = useAppStore((s) => s.moneySaved);

  const MENU_SECTIONS = [
    {
      title: "Account",
      items: [
        { icon: MapPin, label: "Saved Addresses", sub: "2 addresses" },
        { icon: CreditCard, label: "Payment Methods", sub: "UPI, 1 card" },
        { icon: Bell, label: "Notifications", sub: "Push, Email" },
      ],
    },
    {
      title: "Orders & Donations",
      items: [
        { icon: ShoppingBag, label: "My Orders", sub: "12 orders" },
        { icon: Heart, label: "Donation History", sub: "8 donations" },
        { icon: Package, label: "Saved Products", sub: "5 items" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Recycle, label: "Switch Role", sub: role, action: "switch" },
        { icon: Shield, label: "Privacy & Security", sub: "Verified account" },
        { icon: Settings, label: "App Settings", sub: "Theme, Language" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", sub: "FAQs, Contact" },
        { icon: Star, label: "Rate Zero-Waste", sub: "on Play Store" },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col bg-[#FCFCF9]">
      <div className="bg-white px-5 py-4" style={{ boxShadow: "0 2px 12px rgba(17, 24, 39, 0.04)" }}>
        <h1
          className="text-[24px] font-bold tracking-tight text-[#111827]"
          style={{ fontFamily: displayFont }}
        >
          Profile
        </h1>
      </div>

      <main className="flex-1 overflow-y-auto zw-scroll pb-32">
        {/* Large profile card */}
        <div className="px-5 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden p-6 text-white"
            style={{
              borderRadius: 32,
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              boxShadow: "0 8px 32px rgba(22, 163, 74, 0.3)",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: displayFont }}
                >
                  R
                </span>
              </div>
              <div className="flex-1">
                <h2
                  className="text-lg font-bold tracking-tight"
                  style={{ fontFamily: displayFont }}
                >
                  Ramesh Kumar
                </h2>
                <p className="text-[12px] text-white/85">+91 98765 43210</p>
                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold uppercase">
                  <Award size={10} />
                  Gold Member
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/20 pt-5 text-center">
              <div>
                <div
                  className="text-lg font-bold"
                  style={{ fontFamily: displayFont }}
                >
                  {impactPoints.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-white/80">Points</div>
              </div>
              <div>
                <div
                  className="text-lg font-bold"
                  style={{ fontFamily: displayFont }}
                >
                  {mealsSaved}
                </div>
                <div className="text-[10px] text-white/80">Meals saved</div>
              </div>
              <div>
                <div
                  className="text-lg font-bold"
                  style={{ fontFamily: displayFont }}
                >
                  ₹{moneySaved}
                </div>
                <div className="text-[10px] text-white/80">Saved</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Menu sections */}
        <div className="mt-5 space-y-5 px-5">
          {MENU_SECTIONS.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + si * 0.08 }}
            >
              <h3 className="mb-2 ml-2 text-[12px] font-bold uppercase tracking-wide text-[#64748b]">
                {section.title}
              </h3>
              <div className="overflow-hidden bg-white" style={{ borderRadius: 28, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
                {section.items.map((item, ii) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={ii}
                      onClick={() => {
                        if (item.action === "switch") {
                          setScreen("role-select");
                        }
                      }}
                      className={`flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[#f8fafc] ${
                        ii > 0 ? "border-t border-[#f1f5f9]" : ""
                      }`}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0fdf4] text-[#16A34A]">
                        <Icon size={16} />
                      </div>
                      <div className="flex-1">
                        <div
                          className="text-[13px] font-semibold text-[#111827]"
                          style={{ fontFamily: displayFont }}
                        >
                          {item.label}
                        </div>
                        <div className="text-[11px] text-[#94a3b8]">{item.sub}</div>
                      </div>
                      <ChevronRight size={16} className="text-[#94a3b8]" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Logout */}
          <button
            onClick={() => setScreen("onboarding")}
            className="flex w-full items-center justify-center gap-2 bg-white py-3.5 text-[13px] font-semibold text-[#ef4444] active:scale-98"
            style={{ borderRadius: 22, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}
          >
            <LogOut size={16} />
            Log Out
          </button>

          <p className="text-center text-[11px] text-[#94a3b8]">
            Zero-Waste v1.0.0 · Made with care
          </p>
        </div>
      </main>
    </div>
  );
}
