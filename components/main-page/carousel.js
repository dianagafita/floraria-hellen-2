"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import larges2 from "./8m.jpeg";
import nunta from "./nunta.jpeg";

const slides = [
  {
    img: larges2,
    tag: "Colecție · 2026",
    headline: ["Flori pentru", "fiecare", "moment"],
    sub: "Buchete și aranjamente cu livrare la domiciliu",
    cta: { label: "Descoperă colecția", href: "/buchete" },
  },
  {
    img: nunta,
    tag: "Evenimente speciale",
    headline: ["Decor de", "nuntă &", "botez"],
    sub: "Aranjamente florale personalizate pentru cele mai importante zile",
    cta: { label: "Cere ofertă", href: "/request-offer" },
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[100svh] min-h-[520px] overflow-hidden bg-black">
      {/* Background images with crossfade */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.img}
            alt=""
            fill
            className="object-cover"
            priority
          />
          {/* Dark gradient overlay — heavier at bottom-left, lighter top-right */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/75 via-black/40 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-14 md:px-14 md:pb-16 lg:px-20 lg:pb-20 max-w-5xl">
        {/* Tag */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`tag-${current}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-4"
          >
            {slide.tag}
          </motion.p>
        </AnimatePresence>

        {/* Headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`headline-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="fontElegant text-[clamp(3rem,8vw,6.5rem)] font-[300] leading-none text-white mb-4"
          >
            {slide.headline.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h1>
        </AnimatePresence>

        {/* Subtitle + CTA row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row sm:items-end gap-5"
          >
            <p className="text-sm md:text-base font-[100] text-white/70 max-w-xs">
              {slide.sub}
            </p>
            <Link
              href={slide.cta.href}
              className="fontSimple inline-flex items-center gap-2 text-[12px] md:text-[13px] tracking-widest uppercase border border-white/50 text-white px-5 py-2.5 hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
            >
              {slide.cta.label}
              <span className="text-lg leading-none">→</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators — minimal dots bottom-right */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[2px] rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-white" : "w-4 bg-white/35"
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 text-white/40">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <span className="h-8 w-px bg-white/25" />
      </div>
    </div>
  );
}
