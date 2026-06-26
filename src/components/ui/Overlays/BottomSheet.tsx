"use client";

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg-overlay z-[100] backdrop-blur-sm"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-bg-card-light rounded-t-3xl z-[101] overflow-hidden flex flex-col max-h-[90vh]"
            style={{ boxShadow: "0 -8px 40px rgba(0,0,0,0.15)" }}
          >
            {/* Drag Handle Area */}
            <div className="w-full pt-4 pb-2 flex justify-center shrink-0">
              <div className="w-12 h-1.5 bg-border-medium rounded-full" />
            </div>

            {/* Header */}
            {title && (
              <div className="px-6 py-2 flex items-center justify-between shrink-0">
                <h3 className="text-h2">{title}</h3>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-bg-input flex items-center justify-center text-text-secondary hover:text-text-primary">
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
