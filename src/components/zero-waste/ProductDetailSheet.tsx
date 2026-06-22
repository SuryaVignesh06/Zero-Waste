"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Countdown, formatINR, daysUntil } from "./Countdown";
import {
  X, MapPin, Star, Plus, Minus, Sparkles, ShieldCheck, Clock,
  ShoppingBag, Trash2, ChevronRight, Check,
} from "lucide-react";

export function ProductDetailSheet() {
  const product = useAppStore((s) => s.activeProduct);
  const setActiveProduct = useAppStore((s) => s.setActiveProduct);
  const addToCart = useAppStore((s) => s.addToCart);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const [lastProductId, setLastProductId] = useState<string | null>(null);
  if (product && product.id !== lastProductId) {
    setLastProductId(product.id);
    setQty(1);
    setAdded(false);
  }

  const discountPct = product ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => { setActiveProduct(null); setCartOpen(true); }, 800);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProduct(null)} className="absolute inset-0 z-40 glass-overlay" />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 36 }}
            drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => { if (info.offset.y > 100) setActiveProduct(null); }}
            className="absolute inset-x-0 bottom-0 z-50 max-h-[92%] overflow-y-auto glass-sheet"
            style={{ borderRadius: "28px 28px 0 0", boxShadow: "0 -8px 32px rgba(0,0,0,0.12)" }}
          >
            <div className="sticky top-0 z-10 flex justify-center glass-sheet pt-3 pb-2">
              <div className="h-1.5 w-10 rounded-full bg-[#d1d5db]" />
            </div>
            <button onClick={() => setActiveProduct(null)} className="absolute right-4 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <X size={18} className="text-[#1a1a1a]" />
            </button>

            <div className={`relative h-56 w-full overflow-hidden bg-gradient-to-br ${product.imageColor}`} style={{ borderTopLeftRadius: "28px", borderTopRightRadius: "28px" }}>
              <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-[#047857]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                {discountPct}% OFF
              </div>
              {product.isAiMatch && (
                <div className="absolute right-16 top-4 flex items-center gap-1.5 rounded-full bg-[#047857] px-3 py-1.5" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <Sparkles size={12} className="text-white" />
                  <span className="text-[11px] font-bold uppercase tracking-wide text-white">AI Matched</span>
                </div>
              )}
              <div className="flex h-full items-center justify-center">
                <span className="text-7xl font-bold text-white/85">{product.name.charAt(0)}</span>
              </div>
            </div>

            <div className="px-5 pb-32 pt-5">
              <div className="flex items-center justify-between text-[12px] text-[#4a4a4a]">
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span className="font-medium">{product.shopName} · {product.shopDistanceKm}km away</span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-[#fffbeb] px-2 py-0.5">
                  <Star size={11} className="fill-[#f59e0b] text-[#f59e0b]" />
                  <span className="font-bold text-[#1a1a1a]">{product.shopRating}</span>
                </div>
              </div>

              <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-[#1a1a1a]">{product.name}</h2>

              <div className="mt-3 flex items-end gap-3">
                <span className="text-3xl font-bold text-[#1a1a1a]">{formatINR(product.discountedPrice)}</span>
                <span className="mb-1 text-base text-[#8e8e93] line-through">{formatINR(product.originalPrice)}</span>
                <span className="mb-1.5 rounded-full bg-[#ecfdf5] px-2.5 py-1 text-[11px] font-bold text-[#047857]">Save {formatINR(product.originalPrice - product.discountedPrice)}</span>
              </div>

              <div className="mt-5 overflow-hidden p-5" style={{ borderRadius: "20px", background: "linear-gradient(135deg, #ecfdf5, #ffffff)", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center gap-2">
                  <div className="zw-ai-border h-7 w-7 rounded-lg p-[1.5px]">
                    <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-white">
                      <Sparkles size={13} className="text-[#047857]" />
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-[#1a1a1a]">AI Freshness Analysis</span>
                  <span className="ml-auto text-[11px] font-bold text-[#047857]">{Math.round(product.aiConfidence * 100)}%</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white p-3">
                    <div className="text-[10px] font-medium uppercase tracking-wide text-[#8e8e93]">Best before</div>
                    <div className="text-[13px] font-bold text-[#1a1a1a]">{daysUntil(product.bestBefore)} days</div>
                  </div>
                  <div className="rounded-xl bg-white p-3">
                    <div className="text-[10px] font-medium uppercase tracking-wide text-[#8e8e93]">Safe until (AI)</div>
                    <div className="text-[13px] font-bold text-[#047857]">{daysUntil(product.aiPredictedSafeUntil)} days</div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-bold text-[#1a1a1a]">About this product</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#4a4a4a]">{product.description}</p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <TrustBadge icon={<ShieldCheck size={16} className="text-[#047857]" />} label="Quality checked" />
                <TrustBadge icon={<Clock size={16} className="text-[#047857]" />} label="Fast pickup" />
                <TrustBadge icon={<ShoppingBag size={16} className="text-[#047857]" />} label={`${product.quantity} ${product.unit} left`} />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 glass-sheet px-5 py-3" style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 items-center rounded-2xl bg-[#f3efe9] px-1">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-10 w-10 items-center justify-center rounded-xl text-[#1a1a1a] active:scale-90">
                    <Minus size={16} />
                  </button>
                  <span className="w-7 text-center text-base font-bold">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(product.quantity, q + 1))} className="flex h-10 w-10 items-center justify-center rounded-xl text-[#1a1a1a] active:scale-90">
                    <Plus size={16} />
                  </button>
                </div>
                <motion.button whileTap={{ scale: 0.96 }} onClick={handleAddToCart} className="flex h-12 flex-1 items-center justify-between rounded-2xl text-white" style={{ background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 4px 12px rgba(4, 120, 87, 0.25)" }}>
                  <span className="text-[13px] font-semibold pl-4">{added ? "Added!" : "Add to cart"}</span>
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.div key="check" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="pr-4">
                        <Check size={18} strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <motion.span key="price" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pr-4 text-sm font-bold">
                        {formatINR(product.discountedPrice * qty)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-white p-2.5 text-center" style={{ borderRadius: "14px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      {icon}
      <span className="text-[10px] font-medium leading-tight text-[#4a4a4a]">{label}</span>
    </div>
  );
}

export function CartSheet() {
  const isOpen = useAppStore((s) => s.isCartOpen);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const cart = useAppStore((s) => s.cart);
  const updateQty = useAppStore((s) => s.updateQty);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const cartTotal = useAppStore((s) => s.cartTotal);
  const cartSavings = useAppStore((s) => s.cartSavings);
  const cartCount = useAppStore((s) => s.cartCount);
  const setScreen = useAppStore((s) => s.setScreen);

  const deliveryFee = cart.length > 0 ? 15 : 0;
  const total = cartTotal() + deliveryFee;

  const handleCheckout = () => { setCartOpen(false); setScreen("checkout"); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="absolute inset-0 z-40 glass-overlay" />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 36 }}
            drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => { if (info.offset.y > 100) setCartOpen(false); }}
            className="absolute inset-x-0 bottom-0 z-50 max-h-[85%] overflow-y-auto glass-sheet"
            style={{ borderRadius: "28px 28px 0 0", boxShadow: "0 -8px 32px rgba(0,0,0,0.12)" }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between glass-sheet px-5 py-3 border-b border-[#f3efe9]">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-10 rounded-full bg-[#d1d5db] absolute left-1/2 top-1.5 -translate-x-1/2" />
                <h3 className="text-lg font-bold tracking-tight text-[#1a1a1a]">Your Cart</h3>
                <span className="rounded-full bg-[#ecfdf5] px-2 py-0.5 text-[11px] font-bold text-[#047857]">{cartCount()} items</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3efe9]">
                <X size={16} className="text-[#4a4a4a]" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f3efe9]">
                  <ShoppingBag size={32} className="text-[#8e8e93]" />
                </div>
                <h4 className="mt-4 text-base font-bold text-[#1a1a1a]">Your cart is empty</h4>
                <p className="mt-1 text-[12px] text-[#4a4a4a]">Add products to start saving food</p>
                <button onClick={() => { setCartOpen(false); setScreen("marketplace"); }} className="mt-4 px-5 py-2.5 text-[13px] font-semibold text-white" style={{ borderRadius: "14px", background: "linear-gradient(135deg, #047857, #064e3b)" }}>
                  Browse marketplace
                </button>
              </div>
            ) : (
              <>
                <div className="px-5 py-4">
                  {cart.map((item, i) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.05 }}
                      className="mb-3 flex gap-3 bg-white p-3"
                      style={{ borderRadius: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)" }}
                    >
                      <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center bg-gradient-to-br ${item.product.imageColor}`} style={{ borderRadius: "14px" }}>
                        <span className="text-2xl font-bold text-white/85">{item.product.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="line-clamp-1 text-[13px] font-bold text-[#1a1a1a]">{item.product.name}</h4>
                        <p className="text-[11px] text-[#8e8e93]">{item.product.shopName}</p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="text-sm font-bold text-[#1a1a1a]">{formatINR(item.product.discountedPrice)}</span>
                          <span className="text-[11px] text-[#8e8e93] line-through">{formatINR(item.product.originalPrice)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removeFromCart(item.product.id)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fef2f2] text-[#dc2626] active:scale-90">
                          <Trash2 size={14} />
                        </button>
                        <div className="flex h-8 items-center rounded-xl bg-[#f3efe9]">
                          <button onClick={() => updateQty(item.product.id, item.qty - 1)} className="flex h-8 w-7 items-center justify-center text-[#1a1a1a] active:scale-90">
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center text-[12px] font-bold">{item.qty}</span>
                          <button onClick={() => updateQty(item.product.id, item.qty + 1)} className="flex h-8 w-7 items-center justify-center text-[#1a1a1a] active:scale-90">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mx-5 mb-3 flex items-center gap-2 px-4 py-3" style={{ borderRadius: "14px", background: "linear-gradient(135deg, #047857, #064e3b)" }}>
                  <Sparkles size={16} className="text-white" />
                  <span className="text-[12px] font-semibold text-white">You're saving {formatINR(cartSavings())} on this order</span>
                </div>

                <div className="mx-5 mb-3 bg-white p-5" style={{ borderRadius: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)" }}>
                  <h4 className="text-sm font-bold text-[#1a1a1a]">Bill Details</h4>
                  <div className="mt-3 space-y-2 text-[13px]">
                    <div className="flex justify-between text-[#4a4a4a]">
                      <span>Item total</span>
                      <span className="font-medium text-[#1a1a1a]">{formatINR(cartTotal())}</span>
                    </div>
                    <div className="flex justify-between text-[#4a4a4a]">
                      <span>Delivery fee</span>
                      <span className="font-medium text-[#1a1a1a]">{formatINR(deliveryFee)}</span>
                    </div>
                    <div className="my-2 border-t border-dashed border-[#e8e3dd]" />
                    <div className="flex justify-between">
                      <span className="font-bold text-[#1a1a1a]">To Pay</span>
                      <span className="text-base font-bold text-[#1a1a1a]">{formatINR(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 glass-sheet px-5 py-3" style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleCheckout} className="flex h-12 w-full items-center justify-between text-white" style={{ borderRadius: "14px", background: "linear-gradient(135deg, #047857, #064e3b)", boxShadow: "0 4px 12px rgba(4, 120, 87, 0.25)" }}>
                    <div className="text-left pl-4">
                      <div className="text-base font-bold">{formatINR(total)}</div>
                      <div className="text-[10px] text-white/80">{cartCount()} items</div>
                    </div>
                    <div className="flex items-center gap-1 pr-4 text-[13px] font-semibold">
                      Checkout
                      <ChevronRight size={16} />
                    </div>
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
