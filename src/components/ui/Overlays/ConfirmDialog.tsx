"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { SecondaryButton } from "../Buttons/SecondaryButton";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = false
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-overlay z-[110] backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[111] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-bg-card-light w-full max-w-sm rounded-3xl p-6 shadow-float pointer-events-auto"
            >
              <h3 className="text-h2 mb-2">{title}</h3>
              <p className="text-body mb-8">{description}</p>
              
              <div className="flex gap-3">
                <div className="flex-1">
                  <SecondaryButton onClick={onClose}>{cancelLabel}</SecondaryButton>
                </div>
                <div className="flex-1">
                  <PrimaryButton 
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className={isDestructive ? "bg-color-urgent hover:bg-red-600 text-white" : ""}
                  >
                    {confirmLabel}
                  </PrimaryButton>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
