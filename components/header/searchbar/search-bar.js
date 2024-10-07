"use client";
import { motion } from "framer-motion";
import Search from "./search";

export default function Searchbar({ isVisible, openSearch }) {
  return (
    <motion.div
      className={`fixed top-[4rem] md:top-[9rem] md:top-[12.6rem] left-0 w-full bg-white shadow-lg z-[40] ${
        isVisible ? "h-auto" : "h-0"
      } overflow-hidden`}
      initial={{ height: 0 }}
      animate={{ height: isVisible ? "auto" : 0 }}
      transition={{ duration: 0.3 }}
    >
      <Search pChanges="w-[100%]" openSearch={openSearch} />
    </motion.div>
  );
}
