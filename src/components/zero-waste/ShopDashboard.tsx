"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { formatINR } from "./Countdown";
import {
  Plus,
  Package,
  ShoppingBag,
  TrendingUp,
  Leaf,
  Store,
  Star,
  Clock,
  MapPin,
  Check,
  X,
  AlertCircle,
  Sparkles,
  Trash2,
  Edit,
  ChevronRight,
} from "lucide-react";

const displayFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";

const STATUS_FLOW = ["new", "accepted", "packing", "ready", "completed"];
const STATUS_LABELS: Record<string, string> = {
  new: "New",
  accepted: "Accepted",
  packing: "Packing",
  ready: "Ready",
  completed: "Completed",
};

export function ShopDashboard() {
  const [tab, setTab] = useState<"overview" | "orders" | "inventory">("overview");
  const shopListings = useAppStore((s) => s.shopListings);
  const shopOrders = useAppStore((s) => s.shopOrders);
  const updateOrderStatus = useAppStore((s) => s.updateOrderStatus);

  const newOrders = shopOrders.filter((o) => o.status === "new");
  const activeOrders = shopOrders.filter((o) => o.status !== "completed");
  const todayRevenue = shopListings.reduce((s, l) => s + l.revenueToday, 0);
  const todaySold = shopListings.reduce((s, l) => s + l.soldToday, 0);
  const wastePrevented = todaySold * 0.4;

  return (
    <div className="flex h-full flex-col bg-[#FCFCF9]">
      {/* Header */}
      <div className="bg-white px-5 pb-4 pt-5" style={{ boxShadow: "0 2px 12px rgba(17, 24, 39, 0.04)" }}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
            }}
          >
            <Store size={20} className="text-white" />
          </div>
          <div>
            <h1
              className="text-base font-bold tracking-tight text-[#111827]"
              style={{ fontFamily: displayFont }}
            >
              FreshMart Anna Nagar
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
              <span className="flex items-center gap-1">
                <Star size={10} className="fill-[#f59e0b] text-[#f59e0b]" />
                4.6
              </span>
              <span>·</span>
              <span className="rounded-full bg-[#f0fdf4] px-2 py-0.5 font-semibold text-[#16A34A]">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-1 rounded-full bg-[#f1f5f9] p-1">
          {[
            { id: "overview", label: "Overview" },
            { id: "orders", label: `Orders ${newOrders.length > 0 ? `(${newOrders.length})` : ""}` },
            { id: "inventory", label: "Inventory" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className="flex-1 rounded-full px-3 py-2 text-[12px] font-semibold transition-all"
              style={{
                background: tab === t.id
                  ? "linear-gradient(135deg, #16a34a, #15803d)"
                  : "transparent",
                color: tab === t.id ? "#ffffff" : "#64748b",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto zw-scroll px-5 pb-32 pt-4">
        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Stats grid — alternating pastel backgrounds */}
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  icon={<ShoppingBag size={16} />}
                  label="Today's Orders"
                  value={String(shopOrders.length)}
                  trend="+3"
                  bg="#f0fdf4"
                  iconBg="linear-gradient(135deg, #16a34a, #15803d)"
                  color="#16A34A"
                />
                <StatCard
                  icon={<TrendingUp size={16} />}
                  label="Revenue Today"
                  value={formatINR(todayRevenue)}
                  trend="+12%"
                  bg="#fffbeb"
                  iconBg="linear-gradient(135deg, #f59e0b, #d97706)"
                  color="#f59e0b"
                />
                <StatCard
                  icon={<Package size={16} />}
                  label="Active Listings"
                  value={String(shopListings.length)}
                  trend="2 expiring"
                  bg="#eff6ff"
                  iconBg="linear-gradient(135deg, #3b82f6, #1d4ed8)"
                  color="#3b82f6"
                />
                <StatCard
                  icon={<Leaf size={16} />}
                  label="Waste Prevented"
                  value={`${wastePrevented.toFixed(1)}kg`}
                  trend="this week"
                  bg="#fdf2f8"
                  iconBg="linear-gradient(135deg, #ec4899, #be185d)"
                  color="#ec4899"
                />
              </div>

              {/* AI insight card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 overflow-hidden bg-white p-5"
                style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="zw-ai-border h-8 w-8 rounded-xl p-[1.5px]">
                    <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                      <Sparkles size={14} className="text-[#16A34A]" />
                    </div>
                  </div>
                  <span
                    className="text-[13px] font-bold text-[#111827]"
                    style={{ fontFamily: displayFont }}
                  >
                    AI Demand Forecast
                  </span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[#64748b]">
                  Based on your sales pattern, <b>3 milk packs</b> and{" "}
                  <b>2 vegetable packs</b> are likely to remain unsold tomorrow.
                  Pre-list them at discount now.
                </p>
                <button
                  className="mt-3 text-[11px] font-semibold text-white"
                  style={{
                    borderRadius: 22,
                    background: "linear-gradient(135deg, #16a34a, #15803d)",
                    padding: "8px 16px",
                  }}
                >
                  Pre-list with AI suggestion
                </button>
              </motion.div>

              {/* Quick action */}
              <button className="mt-4 flex w-full items-center justify-between bg-white p-5 text-left active:scale-98" style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-white"
                    style={{
                      background: "linear-gradient(135deg, #16a34a, #15803d)",
                    }}
                  >
                    <Plus size={18} />
                  </div>
                  <div>
                    <div
                      className="text-[13px] font-bold text-[#111827]"
                      style={{ fontFamily: displayFont }}
                    >
                      List new near-expiry product
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      Scan barcode or add manually
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-[#94a3b8]" />
              </button>

              {/* Expiring soon */}
              <h2 className="mt-5 mb-3 text-[12px] font-bold uppercase tracking-wide text-[#64748b]">
                Expiring Soon
              </h2>
              <div className="space-y-2">
                {shopListings
                  .filter((l) => l.daysToExpiry <= 2)
                  .map((l) => (
                    <div
                      key={l.id}
                      className="flex items-center gap-3 p-3"
                      style={{
                        borderRadius: 22,
                        background: "linear-gradient(135deg, #fef3c7, #ffffff)",
                      }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f59e0b] text-white">
                        <AlertCircle size={16} />
                      </div>
                      <div className="flex-1">
                        <div
                          className="text-[12px] font-bold text-[#111827]"
                          style={{ fontFamily: displayFont }}
                        >
                          {l.name}
                        </div>
                        <div className="text-[11px] text-[#92400e]">
                          Expires in {l.daysToExpiry} day · {l.qtyLeft} left
                        </div>
                      </div>
                      <button
                        className="text-[11px] font-bold text-white"
                        style={{
                          borderRadius: 22,
                          background: "linear-gradient(135deg, #f59e0b, #d97706)",
                          padding: "8px 14px",
                        }}
                      >
                        Boost
                      </button>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {tab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {activeOrders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="overflow-hidden bg-white"
                  style={{ borderRadius: 32, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}
                >
                  <div className="flex items-center justify-between border-b border-[#f1f5f9] p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[13px] font-bold text-[#111827]"
                          style={{ fontFamily: displayFont }}
                        >
                          {order.customerName}
                        </span>
                        <StatusPill status={order.status} />
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] text-[#94a3b8]">
                        <span>#{order.id.toUpperCase()}</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin size={9} /> {order.distance}km
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <Clock size={9} /> just now
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-base font-bold text-[#111827]"
                        style={{ fontFamily: displayFont }}
                      >
                        {formatINR(order.total)}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    {order.items.map((item, ii) => (
                      <div
                        key={ii}
                        className="flex justify-between py-1 text-[12px]"
                      >
                        <span className="text-[#64748b]">
                          <b>{item.qty}x</b> {item.name}
                        </span>
                        <span className="font-medium text-[#111827]">
                          {formatINR(item.price * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {order.status === "new" && (
                    <div className="flex gap-2 border-t border-[#f1f5f9] p-4">
                      <button
                        onClick={() => updateOrderStatus(order.id, "accepted")}
                        className="flex h-10 flex-1 items-center justify-center gap-1.5 bg-[#f1f5f9] text-[12px] font-semibold text-[#64748b]"
                        style={{ borderRadius: 22 }}
                      >
                        <X size={14} /> Decline
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, "accepted")}
                        className="flex h-10 flex-1 items-center justify-center gap-1.5 text-[12px] font-semibold text-white"
                        style={{
                          borderRadius: 22,
                          background: "linear-gradient(135deg, #16a34a, #15803d)",
                        }}
                      >
                        <Check size={14} strokeWidth={3} /> Accept
                      </button>
                    </div>
                  )}

                  {order.status !== "new" && order.status !== "completed" && (
                    <div className="border-t border-[#f1f5f9] p-4">
                      <button
                        onClick={() => {
                          const nextIdx = STATUS_FLOW.indexOf(order.status) + 1;
                          if (nextIdx < STATUS_FLOW.length) {
                            updateOrderStatus(order.id, STATUS_FLOW[nextIdx]);
                          }
                        }}
                        className="flex h-10 w-full items-center justify-center gap-1.5 text-[12px] font-semibold text-white"
                        style={{
                          borderRadius: 22,
                          background: "linear-gradient(135deg, #16a34a, #15803d)",
                        }}
                      >
                        Mark as{" "}
                        {
                          STATUS_LABELS[
                            STATUS_FLOW[
                              Math.min(
                                STATUS_FLOW.indexOf(order.status) + 1,
                                STATUS_FLOW.length - 1
                              )
                            ]
                          ]
                        }
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}

              {activeOrders.length === 0 && (
                <div className="mt-20 flex flex-col items-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f0fdf4]">
                    <Check size={32} className="text-[#16A34A]" />
                  </div>
                  <p
                    className="mt-4 text-base font-bold text-[#111827]"
                    style={{ fontFamily: displayFont }}
                  >
                    No active orders
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {tab === "inventory" && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {shopListings.map((l, i) => {
                const isCritical = l.daysToExpiry <= 1;
                const isWarning = l.daysToExpiry <= 2 && !isCritical;
                return (
                  <motion.div
                    key={l.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 bg-white p-3"
                    style={{ borderRadius: 28, boxShadow: "0 4px 20px rgba(17, 24, 39, 0.06)" }}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center bg-gradient-to-br ${l.imageColor}`}
                      style={{ borderRadius: 22 }}
                    >
                      <span
                        className="text-base font-bold text-white/85"
                        style={{ fontFamily: displayFont }}
                      >
                        {l.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div
                        className="text-[13px] font-bold text-[#111827]"
                        style={{ fontFamily: displayFont }}
                      >
                        {l.name}
                      </div>
                      <div className="text-[11px] text-[#94a3b8]">
                        {l.qtyLeft} left · {l.soldToday} sold today
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span
                          className="text-[12px] font-bold text-[#111827]"
                          style={{ fontFamily: displayFont }}
                        >
                          {formatINR(l.discountedPrice)}
                        </span>
                        <span className="text-[10px] text-[#94a3b8] line-through">
                          {formatINR(l.originalPrice)}
                        </span>
                        <span
                          className="rounded-md px-1.5 py-0.5 text-[9px] font-bold"
                          style={{
                            background: isCritical
                              ? "#fef2f2"
                              : isWarning
                                ? "#fef3c7"
                                : "#f0fdf4",
                            color: isCritical
                              ? "#ef4444"
                              : isWarning
                                ? "#f59e0b"
                                : "#16A34A",
                          }}
                        >
                          {l.daysToExpiry}d left
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b] active:scale-90">
                        <Edit size={12} />
                      </button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#94a3b8] active:scale-90">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  trend,
  bg,
  iconBg,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  bg: string;
  iconBg: string;
  color: string;
}) {
  return (
    <div
      className="p-4"
      style={{
        borderRadius: 28,
        background: bg,
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl text-white"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <span
          className="text-[10px] font-semibold"
          style={{ color }}
        >
          {trend}
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 text-xl font-bold text-[#111827]"
        style={{ fontFamily: displayFont }}
      >
        {value}
      </motion.div>
      <div className="text-[10px] text-[#64748b]">{label}</div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    new: { bg: "#fffbeb", color: "#f59e0b" },
    accepted: { bg: "#f0fdf4", color: "#16A34A" },
    packing: { bg: "#fef3c7", color: "#92400e" },
    ready: { bg: "#dbeafe", color: "#1d4ed8" },
    completed: { bg: "#f1f5f9", color: "#64748b" },
  };
  const s = styles[status] || styles.new;
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase"
      style={{ background: s.bg, color: s.color }}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
