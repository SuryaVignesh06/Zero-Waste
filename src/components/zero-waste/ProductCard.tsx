"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown, formatINR } from "./Countdown";
import {
  Sparkles,
  MapPin,
  Bell,
  Plus,
  Star,
  Flame,
  Leaf,
  Clock,
  TrendingUp,
} from "lucide-react";
import type { Product } from "@/lib/types";

const displayFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

interface ProductCardProps {
  product: Product;
  index?: number;
  onClick?: () => void;
}

export function ProductCard({ product, index = 0, onClick }: ProductCardProps) {
  const addToCart = useAppStore((s) => s.addToCart);
  const setActiveProduct = useAppStore((s) => s.setActiveProduct);

  const discountPct = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) *
      100
  );

  const handleClick = () => {
    setActiveProduct(product);
    onClick?.();
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="group relative flex flex-col overflow-hidden bg-white text-left transition-all hover:shadow-lg"
      style={{
        borderRadius: 32,
        boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)",
      }}
    >
      {/* Image */}
      <div
        className={`relative aspect-square w-full overflow-hidden bg-gradient-to-br ${product.imageColor}`}
        style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
      >
        {/* Discount badge */}
        <div className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#16A34A] shadow-sm">
          {discountPct}% OFF
        </div>
        {/* AI match badge */}
        {product.isAiMatch && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#16A34A] px-2 py-1 shadow-sm">
            <Sparkles size={9} className="text-white" />
            <span className="text-[9px] font-bold uppercase tracking-wide text-white">
              AI
            </span>
          </div>
        )}
        {/* Product initial */}
        <div className="flex h-full items-center justify-center">
          <span
            className="text-5xl font-bold text-white/85"
            style={{ fontFamily: displayFont }}
          >
            {product.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1 text-[10px] text-[#64748b]">
          <MapPin size={9} />
          <span className="truncate">
            {product.shopName} · {product.shopDistanceKm}km
          </span>
        </div>
        <h3
          className="mt-1 line-clamp-2 text-[13px] font-semibold leading-snug text-[#111827]"
          style={{ fontFamily: displayFont }}
        >
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span
            className="text-base font-bold text-[#111827]"
            style={{ fontFamily: displayFont }}
          >
            {formatINR(product.discountedPrice)}
          </span>
          <span className="text-[11px] text-[#94a3b8] line-through">
            {formatINR(product.originalPrice)}
          </span>
        </div>

        {/* Add button */}
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          whileTap={{ scale: 0.85 }}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full text-white active:scale-90"
          style={{
            background: "linear-gradient(135deg, #16a34a, #15803d)",
            boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
          }}
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

export function RescueAlertCard({
  donation,
  index = 0,
  onClick,
}: RescueAlertCardProps) {
  const setActiveDonation = useAppStore((s) => s.setActiveDonation);

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        setActiveDonation(donation);
        onClick?.();
      }}
      className="relative flex w-[200px] flex-shrink-0 flex-col overflow-hidden bg-white text-left"
      style={{
        borderRadius: 32,
        boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)",
      }}
    >
      <div
        className={`relative h-24 w-full overflow-hidden bg-gradient-to-br ${donation.imageColor}`}
        style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
      >
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm">
          <Leaf size={9} className="text-[#16A34A]" />
          <span className="text-[9px] font-bold uppercase text-[#16A34A]">
            {donation.servings} servings
          </span>
        </div>
        <div className="absolute left-3 top-3 rounded-full bg-[#ef4444] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
          Rescue
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h4
          className="line-clamp-1 text-[12px] font-bold text-[#111827]"
          style={{ fontFamily: displayFont }}
        >
          {donation.donorName}
        </h4>
        <p className="mt-0.5 line-clamp-1 text-[10px] text-[#64748b]">
          {donation.title}
        </p>
        <div className="mt-2 flex items-center gap-1.5 rounded-2xl bg-[#fef3c7] px-2.5 py-1.5">
          <Flame size={10} className="text-[#f59e0b]" />
          <span className="text-[9px] font-semibold uppercase text-[#92400e]">
            Expires
          </span>
          <Countdown deadline={donation.expiryDeadline} variant="compact" />
        </div>
      </div>
    </motion.button>
  );
}

export function SectionHeader({
  title,
  action,
  onAction,
  icon,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        {icon}
        <h2
          className="text-[18px] font-bold tracking-tight text-[#111827]"
          style={{ fontFamily: displayFont }}
        >
          {title}
        </h2>
      </div>
      {action && (
        <button
          onClick={onAction}
          className="rounded-full bg-[#f0fdf4] px-3 py-1 text-[12px] font-semibold text-[#16A34A] active:scale-95"
        >
          {action}
        </button>
      )}
    </div>
  );
}

export function HeroCarousel() {
  const cards = [
    {
      title: "Save up to 70%",
      subtitle: "On near-expiry groceries",
      gradient: "linear-gradient(135deg, #16a34a, #15803d)",
      icon: <TrendingUp size={20} className="text-white" />,
    },
    {
      title: "Rescue food now",
      subtitle: "5 surplus meals near you",
      gradient: "linear-gradient(135deg, #60a5fa, #3b82f6)",
      icon: <Leaf size={20} className="text-white" />,
    },
    {
      title: "Earn impact points",
      subtitle: "Every rescue counts",
      gradient: "linear-gradient(135deg, #f9a8d4, #ec4899)",
      icon: <Sparkles size={20} className="text-white" />,
    },
  ];

  return (
    <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 no-scrollbar">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="relative flex h-[120px] w-[260px] flex-shrink-0 flex-col justify-between overflow-hidden p-5"
          style={{
            borderRadius: 32,
            background: c.gradient,
            boxShadow: "0 8px 24px rgba(17, 24, 39, 0.1)",
          }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/25">
            {c.icon}
          </div>
          <div>
            <h3
              className="text-base font-bold tracking-tight text-white"
              style={{ fontFamily: displayFont }}
            >
              {c.title}
            </h3>
            <p className="text-[11px] text-white/85">{c.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function TopBar({
  areaName = "Anna Nagar",
  onBellClick,
}: {
  areaName?: string;
  onBellClick?: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-5 pb-3 pt-5">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0fdf4]">
          <MapPin size={14} className="text-[#16A34A]" />
        </div>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-wide text-[#94a3b8]">
            Deliver to
          </div>
          <button className="flex items-center gap-1 text-[14px] font-bold text-[#111827]" style={{ fontFamily: displayFont }}>
            {areaName}
            <motion.svg
              animate={{ y: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path
                d="M2 3.5L5 6.5L8 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        </div>
      </div>
      <button
        onClick={onBellClick}
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white active:scale-95"
        style={{ boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}
      >
        <Bell size={18} className="text-[#64748b]" />
        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#ef4444] ring-2 ring-white" />
      </button>
    </div>
  );
}
