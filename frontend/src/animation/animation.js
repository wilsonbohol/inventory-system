export const modalFadeScale = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

// Spinner rotation
export const spinnerRotate = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    },
  },
};
