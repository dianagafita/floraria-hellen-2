import { motion } from "framer-motion";
const menuItemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 50 },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: { type: "spring", stiffness: 500, damping: 50 },
  },
};
export default function MenuItem({ className, children }) {
  return (
    <motion.li variants={menuItemVariants} className={className}>
      {children}
    </motion.li>
  );
}
