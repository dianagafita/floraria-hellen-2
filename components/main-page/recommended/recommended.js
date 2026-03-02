"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import img from "./4.jpeg";
import img2 from "./2.jpeg";
import img3 from "./3.jpeg";
import img4 from "./1.jpeg";
import img5 from "./5.jpeg";

const products = [
  { img: img,  name: "Buchet de trandafiri",  href: "/buchete/buchete-trandafiri" },
  { img: img2, name: "Aranjament floral",      href: "/aranjamente" },
  { img: img3, name: "Buchet mixt",            href: "/buchete" },
  { img: img4, name: "Buchet pastel",          href: "/buchete" },
  { img: img5, name: "Aranjament nuntă",       href: "/nunti-botezuri" },
];

export default function Recommended() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10 md:mb-14">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-neutral-300 inline-block" />
              Preferatele clienților
            </p>
            <h2 className="fontElegant text-[clamp(1.8rem,4vw,3rem)] font-[300] text-neutral-900 leading-tight">
              Recomandări
            </h2>
          </div>
          <Link
            href="/buchete"
            className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-neutral-500 hover:text-neutral-900 border-b border-neutral-300 hover:border-neutral-900 pb-0.5 transition-colors"
          >
            Vezi toate <span>→</span>
          </Link>
        </div>

        {/* Product grid — clean modern cards */}
        <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((product, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="group flex-none w-48 md:w-auto flex flex-col rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden"
            >
              <Link href={product.href} className="block">
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-1.5 px-3.5 pt-3 pb-4">
                <p className="text-[11px] text-neutral-400">Recomandat</p>
                <p className="fontElegant text-sm md:text-[15px] font-[300] text-neutral-900 leading-snug">
                  {product.name}
                </p>
                <Link
                  href={product.href}
                  className="mt-1 inline-flex items-center gap-1 text-[11px] font-[100] text-[rgb(120,6,6)] hover:text-[rgba(120,6,6,0.8)] underline underline-offset-4 decoration-[0.5px]"
                >
                  Cumpără <span>→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile "see all" */}
        <div className="mt-8 md:hidden">
          <Link
            href="/buchete"
            className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-neutral-500 border-b border-neutral-300 pb-0.5"
          >
            Vezi toate <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
