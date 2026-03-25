export const smoothEase = [0.25, 0.8, 0.25, 1] as const;

export const defaultTransition = {
  duration: 0.7,
  ease: smoothEase,
};

export const springConfig = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
};

export const fastTransition = {
  duration: 0.2,
  ease: "easeOut" as const,
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

export const blurIn = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: defaultTransition,
  },
};

export const slideUpScale = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: defaultTransition,
  },
};
