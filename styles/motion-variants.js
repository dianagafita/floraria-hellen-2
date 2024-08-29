export const variants = {
  open: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
  closed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
};

export const variansts_sidenav_items = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};

export const sidebarVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      opacity: { duration: 0.05 }, // Specify duration for opacity transition

      type: "spring",
      stiffness: 500,
      damping: 50,
      staggerChildren: 0.1,
    },
  },
  closed: {
    x: "-100%",
    opacity: 0, // Add opacity transition here
    transition: {
      opacity: { duration: 0.05 }, // Specify duration for opacity transition
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  },
};

export const cartModalVariants = {
  open: {
    x: "0", // The modal is fully visible at this position
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 50,
      staggerChildren: 0.1,
    },
  },
  closed: {
    x: "100%", // Move the modal off-screen to the right
    opacity: 0, // Add opacity transition here
    transition: {
      opacity: { duration: 0.01 }, // Specify duration for opacity transition
      type: "spring",
      stiffness: 500,
      damping: 40,
    },
  },
};

export const menuItemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 35, // Reduced damping for less resistance and faster settling
      staggerChildren: 0.005, // Reduced staggering for faster sequential animation
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      type: "spring",
      stiffness: 700,
      damping: 50,
      staggerChildren: 0.005,
    },
  },
};

export const variants_nested_sub_menu_item = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 50,
      staggerChildren: 0.01,
    },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 150,
      staggerChildren: 0.01,
    },
  },
};
