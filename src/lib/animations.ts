// ============================================================
//  ANIMATION SYSTEM — Duolingo-inspired spring animations
// ============================================================

// --- Core Spring Configs ---

export const springSnappy = {
  type: "spring",
  stiffness: 500,
  damping: 28,
  mass: 0.8,
};

export const springDefault = {
  type: "spring",
  stiffness: 320,
  damping: 26,
  mass: 1,
};

export const springGentle = {
  type: "spring",
  stiffness: 220,
  damping: 28,
  mass: 1,
};

// Duolingo-style: overshoot then settle
export const springBouncy = {
  type: "spring",
  stiffness: 460,
  damping: 16,
  mass: 0.9,
};

// Super bouncy — for celebration / reward elements
export const springCelebration = {
  type: "spring",
  stiffness: 600,
  damping: 12,
  mass: 0.7,
};

// For the liquid morphing page transition
export const springLiquid = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 1.1,
};

// Check for reduced motion safely (client-side only)
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Returns duration 0 if reduced motion is preferred
export const getPageTransition = () => {
  return prefersReducedMotion() ? { duration: 0 } : springLiquid;
};

// --- Page Transition Variants ---

// Liquid slide: feels like content morphs from one screen into the next
export const liquidPageVariants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: 18,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springLiquid,
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    y: -12,
    filter: "blur(3px)",
    transition: { duration: 0.22, ease: [0.32, 0, 0.67, 0] },
  },
};

// Slide from right (forward navigation)
export const slideInRight = {
  initial: { opacity: 0, x: 40, scale: 0.97 },
  animate: { opacity: 1, x: 0, scale: 1, transition: springSnappy },
  exit: { opacity: 0, x: -30, scale: 0.98, transition: { duration: 0.2 } },
};

// Slide from left (back navigation)
export const slideInLeft = {
  initial: { opacity: 0, x: -40, scale: 0.97 },
  animate: { opacity: 1, x: 0, scale: 1, transition: springSnappy },
  exit: { opacity: 0, x: 30, scale: 0.98, transition: { duration: 0.2 } },
};

// --- Child / Item Variants ---

// Duolingo-style: each card pops in with a slight bounce
export const fadeInUp = {
  initial: { opacity: 0, y: 24, scale: 0.94 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springBouncy,
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.96,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

// Stagger container — children animate in sequence
export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// --- Reward / Celebration ---

// Pop effect for XP / achievement badges
export const popIn = {
  initial: { opacity: 0, scale: 0, rotate: -8 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: springCelebration,
  },
};

// Shimmer pulse — for active/live items
export const shimmerPulse = {
  animate: {
    scale: [1, 1.04, 1],
    opacity: [1, 0.85, 1],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Tap bounce — wrap interactive cards in this
export const tapBounce = {
  whileTap: { scale: 0.94, transition: { duration: 0.08 } },
  whileHover: { scale: 1.02, transition: springSnappy },
};

// --- Legacy exports for backward compat ---
export const fadeUp = fadeInUp;
export const staggerContainer = staggerChildren;
export const cardVariants = fadeInUp;
export const springJuicy = springBouncy;
