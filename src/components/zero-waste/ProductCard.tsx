"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown, formatINR } from "./Countdown";
import {
  Sparkles,
  MapPin,
  Bell,
  Plus,
  Flame,
  Leaf,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  index?: number;
  onClick?: () => void;
}

export function ProductCard({ product, index = 0, onClick }: ProductCardProps) {
  const addToCart = useAppStore((s) => s.addToCart);
  const setActiveProduct = useAppStore((s) => s.setActiveProduct);

  const discountPct = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  const handleClick = () => {
    setActiveProduct(product);
    onClick?.();
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="group relative flex flex-col overflow-hidden bg-white text-left"
      style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}
    >
      <div className={`relative aspect-square w-full overflow-hidden bg-gradient-to-br ${product.imageColor}`} style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
        <div className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#047857]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          {discountPct}% OFF
        </div>
        {product.isAiMatch && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#047857] px-2 py-1">
            <Sparkles size={9} className="text-white" />
            <span className="text-[9px] font-bold uppercase tracking-wide text-white">AI</span>
          </div>
        )}
        <div className="flex h-full items-center justify-center">
          <span className="text-5xl font-bold text-white/85">{product.name.charAt(0)}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-center gap-1 text-[10px] text-[#8e8e93]">
          <MapPin size={9} />
          <span className="truncate">{product.shopName} · {product.shopDistanceKm}km</span>
        </div>
        <h3 className="mt-1 line-clamp-2 text-[13px] font-semibold leading-snug text-[#1a1a1a]">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-base font-bold text-[#1a1a1a]">{formatINR(product.discountedPrice)}</span>
          <span className="text-[11px] text-[#8e8e93] line-through">{formatINR(product.originalPrice)}</span>
        </div>

        <motion.div
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          whileTap={{ scale: 0.85 }}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1a1a] text-white active:scale-90"
        >
          <Plus size={18} strokeWidth={2.8} />
        </motion.div>
      </div>
    </motion.button>
  );
}

interface RescueAlertCardProps {
  donation: any;
  index?: number;
  onClick?: () => void;
}

export function RescueAlertCard({ donation, index = 0, onClick }: RescueAlertCardProps) {
  const setActiveDonation = useAppStore((s) => s.setActiveDonation);

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => { setActiveDonation(donation); onClick?.(); }}
      className="relative flex w-[190px] flex-shrink-0 flex-col overflow-hidden bg-white text-left"
      style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}
    >
      <div className={`relative h-24 w-full overflow-hidden bg-gradient-to-br ${donation.imageColor}`} style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-2 py-1" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <Leaf size={9} className="text-[#047857]" />
          <span className="text-[9px] font-bold uppercase text-[#047857]">{donation.servings} srv</span>
        </div>
        <div className="absolute left-3 top-3 rounded-full bg-[#e76f51] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
          Rescue
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h4 className="line-clamp-1 text-[12px] font-bold text-[#1a1a1a]">{donation.donorName}</h4>
        <p className="mt-0.5 line-clamp-1 text-[10px] text-[#8e8e93]">{donation.title}</p>
        <div className="mt-2 flex items-center gap-1.5 rounded-xl bg-[#fef3c7] px-2.5 py-1.5">
          <Flame size={10} className="text-[#d97706]" />
          <span className="text-[9px] font-semibold uppercase text-[#92400e]">Expires</span>
          <Countdown deadline={donation.expiryDeadline} variant="compact" />
        </div>
      </div>
    </motion.button>
  );
}

export function SectionHeader({ title, action, onAction, icon }: { title: string; action?: string; onAction?: () => void; icon?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        {icon}
        <h2 className="text-[18px] font-bold tracking-tight text-[#1a1a1a]">{title}</h2>
      </div>
      {action && (
        <button onClick={onAction} className="flex items-center gap-0.5 text-[13px] font-semibold text-[#047857] active:scale-95">
          {action}
          <ChevronRight size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

export function HeroCarousel() {
  const cards = [
    { title: "Save up to 70%", subtitle: "On near-expiry groceries", bg: "linear-gradient(135deg, #047857, #064e3b)", icon: <TrendingUp size={20} className="text-white" /> },
    { title: "Rescue food now", subtitle: "5 surplus meals near you", bg: "linear-gradient(135deg, #d97706, #b45309)", icon: <Leaf size={20} className="text-white" /> },
    { title: "Earn impact points", subtitle: "Every rescue counts", bg: "linear-gradient(135deg, #7c3aed, #5b21b6)", icon: <Sparkles size={20} className="text-white" /> },
  ];

  return (
    <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="relative flex h-[110px] w-[240px] flex-shrink-0 flex-col justify-between overflow-hidden p-4"
          style={{ borderRadius: "20px", background: c.bg, boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">{c.icon}</div>
          <div>
            <h3 className="text-base font-bold tracking-tight text-white">{c.title}</h3>
            <p className="text-[11px] text-white/85">{c.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function TopBar({ areaName = "Anna Nagar", onBellClick }: { areaName?: string; onBellClick?: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 pb-3 pt-5">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ecfdf5]">
          <MapPin size={14} className="text-[#047857]" />
        </div>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-wide text-[#8e8e93]">Deliver to</div>
          <button className="flex items-center gap-1 text-[14px] font-bold text-[#1a1a1a]">
            {areaName}
            <motion.svg animate={{ y: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }} width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>
        </div>
      </div>
      <button onClick={onBellClick} className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white active:scale-95" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}>
        <Bell size={18} className="text-[#4a4a4a]" />
        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#e76f51] ring-2 ring-white" />
      </button>
    </div>
  );
}
