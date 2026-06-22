import type { Variants } from "framer-motion";

export const pageVariants: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const sheetVariants: Variants = {
  initial: { y: "100%" },
  animate: { y: 0, transition: { type: "spring", damping: 28, stiffness: 300, mass: 0.8 } },
  exit: { y: "100%", transition: { duration: 0.26, ease: "easeIn" } },
};

export const tapScale = { whileTap: { scale: 0.95, transition: { duration: 0.1 } } };

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } },
};

export const pulseRing: Variants = {
  animate: { scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6], transition: { duration: 2.2, repeat: Infinity, ease: "easeOut" } },
};
