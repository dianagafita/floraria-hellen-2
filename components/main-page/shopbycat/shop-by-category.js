"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import img from "./martie3.jpeg";
import img1 from "./buctr.webp";
import img2 from "./buchetr.webp";
import buchetmireasa1 from "./some.png";
import aranjmasa from "./aranjmasa1.jpeg";
import img4 from "./aranjtr.webp";
import cris from "./cris.jpeg";
import botez from "./botez1.jpeg";
import nunta from "./nunta.jpeg";
import lumanari from "./lum.jpeg";
import buchetmireasa from "./bucmir.jpeg";
import martisor from "./mr3.jpeg";
import martisor2 from "./mr2.jpeg";
import paste from "./paste.jpeg";
import coroane from "./aranjtr2.webp";
import { ChevronRight } from "lucide-react";
import EmblaCarousel from "../sec-car";
import Title from "@/components/util/title";
import Link from "next/link";

const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const categories = {
  FLORI: [
    {
      src: img1,
      alt: "Buchete trandafiri",
      text: "Buchete trandafiri",
      id: 1,
      link: "/buchete/buchete-trandafiri",
    },
    {
      src: img2,
      alt: "Buchete trandafiri",
      text: "Buchete trandafiri",
      id: 3,
      link: "/buchete/buchete-trandafiri",
    },
    {
      src: img4,
      alt: "Craciun",
      text: "Aranjamente trandafiri",
      id: 2,
      link: "/aranjamente/aranjamente-trandafiri",
    },
    {
      src: coroane,
      alt: "Coronite",
      text: "Aranjamente trandafiri",
      id: 4,
      link: "/aranjamente/aranjamente-trandafiri",
    },
  ],
  NUNTI: [
    {
      src: nunta,
      alt: "Masa oficiala",
      text: "Masa oficiala",
      id: 1,
      link: "/evenimente/masa-oficiala",
    },
    {
      src: aranjmasa,
      alt: "Aranajamente",
      text: "Aranajamente",
      id: 3,
      link: "/evenimente/nunta/aranjamente-masa",
    },
    {
      src: buchetmireasa,
      alt: "Buchete mireasa",
      text: "Buchete mireasa",
      id: 2,
      link: "/evenimente/nunta/buchete-mireasa",
    },
    {
      src: lumanari,
      alt: "Lumanari",
      text: "Lumanari",
      id: 4,
      link: "/evenimente/lumanari",
    },
  ],
  BOTEZ: [
    {
      src: cris,
      alt: "Aranjamente cristelnita",
      text: "Aranjamente cristelnita",
      id: 1,
      path: "/evenimente/botez/aranjamente-cristelnita",
    },
    {
      src: botez,
      alt: "Photo corner",
      text: "Photo corner",
      id: 3,
      link: "/evenimente/botez/photo-corner",
    },
  ],
};
const OPTIONS = { dragFree: true, loop: true };

const ShopByCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("FLORI");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };
  const displayedImages = categories[selectedCategory];

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <div className=" flex flex-col my-20">
        <div className="items-start m-5">
          <Title>CATEGORII</Title>
        </div>

        <div className="flex items-center justify-start flex-wrap ml-5">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              type="button"
              className={`mr-5 font-[100] ${
                selectedCategory === category
                  ? "underline decoration-[rgb(116,10,10)] underline-offset-8 decoration-[1.5px]"
                  : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Responsive grid layout - sm: 2, md: 3, lg: 4 per row */}
        <div className="p-5">
          <AnimatePresence>
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap gap-4 font-[200]"
            >
              {displayedImages.map((image) => (
                <div
                  key={image.id}
                  onMouseEnter={() => handleMouseEnter(image.id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] aspect-[2/3]"
                >
                  <span className="absolute top-4 left-4 z-10 text-white px-2 py-1 font-[200]">
                    <span>{image.text}</span>
                    <Link
                      href={`${image.link || "#"}`}
                      className="mt-2 text-[12px] font-[100] flex items-center"
                    >
                      CUMPARA{" "}
                      <ChevronRight
                        size={16}
                        strokeWidth={1.5}
                        className="ml-1"
                      />
                    </Link>
                  </span>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-sm transition-opacity duration-300"
                  />
                  <div
                    className={`absolute inset-0 bg-black bg-opacity-10 rounded-sm transition-opacity duration-300 ${
                      hoveredIndex === image.id ? "opacity-0" : "opacity-100"
                    }`}
                  ></div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default ShopByCategory;
