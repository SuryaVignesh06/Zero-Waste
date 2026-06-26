"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { springBouncy } from "@/lib/animations";

export function SuccessAnimation() {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={springBouncy}
      className="flex flex-col items-center justify-center p-8"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, ...springBouncy }}
          className="absolute inset-0 bg-accent-gold/20 rounded-full pulse-ring"
        />
        <CheckCircle2 size={80} className="text-accent-gold relative z-10" />
      </div>
    </motion.div>
  );
}
