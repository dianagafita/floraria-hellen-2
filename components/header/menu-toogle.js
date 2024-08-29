import { motion } from "framer-motion";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle, isOpen }) => (
  <button onClick={toggle} className="">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
        initial={isOpen ? "open" : "closed"}
        strokeWidth="0.6"
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        initial={isOpen ? "open" : "closed"}
        transition={{ duration: 0.1 }}
        strokeWidth="0.6"
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 15 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
        initial={isOpen ? "open" : "closed"}
        strokeWidth="0.6"
      />
    </svg>
  </button>
);

export default MenuToggle;
