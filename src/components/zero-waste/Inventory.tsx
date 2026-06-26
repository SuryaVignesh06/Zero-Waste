"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Plus, Search, SlidersHorizontal, Pencil, HeartHandshake } from "lucide-react";

import { ScreenWrapper } from "../ui/ScreenWrapper";
import { HiringStyleCard } from "../ui/Cards/HiringStyleCard";
import { staggerChildren } from "@/lib/animations";

export function Inventory() {
  const { inventory, setActiveScreen, donateFromInventory, setSelectedInventoryItem, setShowAddMenu } = useAppStore();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = ["All", "Expiring Soon", "Vegetables", "Fruits", "Dairy", "Bakery", "Packaged"];

  const filteredInventory = inventory.filter(item => {
    // Exclude soft-deleted or removed items
    if (item.status === "removed") return false;
    
    if (searchQuery && !item.itemName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filter === "All") return true;
    if (filter === "Expiring Soon") return item.daysToExpiry <= 5 && item.status === "in_stock";
    return item.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <ScreenWrapper 
      className="bg-transparent"
      floatingContent={
        <button 
          onClick={() => {
            setShowAddMenu(true);
          }}
          className="fixed bottom-[100px] right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-button transition-transform active:scale-95 z-30 bg-text-primary hover:scale-105 pointer-events-auto"
        >
          <Plus size={24} className="text-bg-base" />
        </button>
      }
    >
      <div className="pt-4 pb-4 relative z-20">
        <h1 className="text-h1 mb-6">Manage Inventory</h1>

        <div className="flex gap-3">
          <div className="flex-1 bg-bg-card-light rounded-2xl flex items-center px-4 py-3 shadow-sm border border-border-light">
            <Search size={18} className="text-text-muted" />
            <input 
              type="text" 
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none ml-3 text-body text-text-primary placeholder:text-text-muted"
            />
          </div>
          <button className="w-12 h-12 bg-bg-card-light rounded-2xl flex items-center justify-center shadow-sm border border-border-light shrink-0 text-text-primary">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="px-6 py-4 z-10 relative">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 hide-scrollbar">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-4 py-2 rounded-xl text-caption font-bold transition-colors ${
                filter === f 
                  ? "bg-text-primary text-bg-base shadow-md" 
                  : "bg-bg-card-light text-text-muted border border-border-light"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 relative z-10">
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-4"
        >
          {filteredInventory.map(item => {
            const isUrgent = item.daysToExpiry <= 1;
            const isListed = item.status === "listed_for_sale" || item.status === "listed_for_donation";
            const progressValue = isUrgent ? 15 : Math.max(10, Math.min(100, (item.daysToExpiry / 7) * 100));
            const progressColor = isUrgent ? "var(--color-urgent)" : "var(--color-warning)";
            const progressLabel = isUrgent ? "Expiring Today" : `${item.daysToExpiry} Days Left`;
            const expiryStatus = item.daysToExpiry <= 1 ? "urgent" : item.daysToExpiry <= 5 ? "warning" : "normal";

            return (
              <HiringStyleCard
                key={item.id}
                avatarSrc={item.photos[0]}
                fallbackInitial={item.itemName[0]}
                title={item.itemName}
                subtitle={`${item.quantity} ${item.unit} available • Expiry: ${new Date(item.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                progressLabel={progressLabel}
                progressValue={progressValue}
                progressColor={progressColor}
                isListed={isListed}
                expiryStatus={expiryStatus}
                onTopRightAction={() => {
                  setSelectedInventoryItem(item.id);
                  setActiveScreen("edit-inventory-item");
                }}
                onAction1={() => {
                  setSelectedInventoryItem(item.id);
                  setActiveScreen("edit-inventory-item");
                }}
                onAction2={() => {
                  donateFromInventory(item.id, item.quantity, 4);
                  setActiveScreen("donation-success");
                }}
                action1Icon={<Pencil size={18} className="text-text-primary" />}
                action2Icon={<HeartHandshake size={18} className="text-text-primary" />}
              />
            );
          })}

          {filteredInventory.length === 0 && (
            <div className="text-center py-12">
              <p className="text-body text-text-muted">No items found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}
