"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import img1 from "./buctr.webp";
import botez from "./botez1.jpeg";
import nunta from "./nunta.jpeg";
import Link from "next/link";

const collections = [
  {
    id: "flori",
    label: "Flori de zi cu zi",
    title: "Buchete și aranjamente cu trandafiri",
    description:
      "Buchete elegante și aranjamente cu trandafiri, potrivite pentru aniversări, mulțumiri sau simple gesturi de apreciere.",
    image: img1,
    imageAlt: "Buchet de trandafiri",
    primaryLink: {
      label: "Explorează buchete",
      href: "/buchete/buchete-trandafiri",
    },
  },
  {
    id: "nunti",
    label: "Colecția Nuntă",
    title: "Decor complet pentru ziua nunții",
    description:
      "Buchete de mireasă, lumânări, aranjamente de masă și decor pentru ceremonie, gândite să se potrivească stilului evenimentului tău.",
    image: nunta,
    imageAlt: "Decor de nuntă",
    primaryLink: {
      label: "Planifică decorul",
      href: "/evenimente/nunta",
    },
  },
  {
    id: "botez",
    label: "Colecția Botez",
    title: "Aranjamente delicate pentru botez",
    description:
      "Aranjamente pentru cristelnică, photo corner și decor de sală, create în tonuri blânde, potrivite pentru primele momente speciale.",
    image: botez,
    imageAlt: "Decor botez",
    primaryLink: {
      label: "Descoperă colecția",
      href: "/evenimente/botez",
    },
  },
];

const ShopByCategory = () => {
  return (
    <section className="py-16 md:py-24 px-5 md:px-10 lg:px-20">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-10 md:mb-14">
        <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-neutral-300 inline-block" />
          Colecțiile noastre
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <h2 className="fontElegant text-[clamp(1.8rem,4vw,3rem)] font-[300] text-neutral-900 leading-tight">
            Alege colecția potrivită
          </h2>
          <p className="text-xs text-neutral-500 font-[100] max-w-sm md:text-right">
            Flori de zi cu zi, nunți și botezuri —<br className="hidden md:block" /> fiecare colecție gândită cu atenție.
          </p>
        </div>
      </div>

      {/* Three wide editorial rows */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="max-w-6xl mx-auto space-y-6 md:space-y-8"
      >
        {collections.map((collection, index) => (
          <article
            key={collection.id}
            className="group grid gap-5 md:gap-8 md:grid-cols-2 items-center rounded-2xl border border-neutral-200 bg-white/80 px-4 py-5 md:px-7 md:py-7"
          >
            {/* Image */}
            <div
              className={`relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl ${
                index % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              <Image
                src={collection.image}
                alt={collection.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Text */}
            <div
              className={`space-y-3 md:space-y-4 ${
                index % 2 === 1 ? "md:order-1 md:text-right" : ""
              }`}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                {collection.label}
              </p>
              <h3 className="fontElegant text-xl md:text-2xl lg:text-[1.6rem] font-[300] text-neutral-900 leading-snug">
                {collection.title}
              </h3>
              <p className="text-xs md:text-sm font-[100] text-neutral-600 leading-relaxed max-w-md">
                {collection.description}
              </p>
              <Link
                href={collection.primaryLink.href}
                className={`inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-[rgb(120,6,6)] hover:text-[rgba(120,6,6,0.8)] border-b border-transparent hover:border-[rgb(120,6,6)] pb-px transition-colors ${
                  index % 2 === 1 ? "justify-end" : ""
                }`}
              >
                {collection.primaryLink.label}
                <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </motion.div>
    </section>
  );
};

export default ShopByCategory;
