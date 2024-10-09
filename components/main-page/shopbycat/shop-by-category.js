"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import img from "./aranj2.jpeg";
import img2 from "./buchet1.jpeg";
import buchetmireasa1 from "./bm2.jpeg";
import aranjmasa from "./aranjmasa1.jpeg";
import img4 from "./aranj1.jpeg";
import cris from "./cris.jpeg";
import botez from "./botez1.jpeg";
import nunta from "./nunta.jpeg";
import lumanari from "./lum.jpeg";
import buchetmireasa from "./bucmir.jpeg";

import { ChevronRight } from "lucide-react";
import EmblaCarousel from "../sec-car";
import Title from "@/components/util/title";
import Link from "next/link";
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const categories = {
  FLORI: [
    {
      src: img,
      alt: "Aranjamente",
      text: "Aranjamente",
      id: 1,
      link: "/aranjamente",
    },
    {
      src: img4,
      alt: "Aranjamente",
      text: "Aranjamente",
      id: 2,
      link: "/aranjamente",
    },
    {
      src: img2,
      alt: "Plante",
      text: "Plante",
      id: 3,
      link: "/speciale/plante",
    },
    { src: img2, alt: "Buchete", text: "Buchete", id: 4, link: "/buchete" },
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
      <div className=" flex flex-col">
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

        <div className="md:hidden m-5">
          <EmblaCarousel
            images={displayedImages}
            slides={displayedImages}
            options={OPTIONS}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            hoveredIndex={hoveredIndex}
          />
        </div>

        <div className="hidden md:grid grid-cols-1 gap-4 w-screen p-5">
          <AnimatePresence>
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="relative grid grid-cols-3 gap-4 font-[200]"
            >
              {displayedImages.slice(0, 2).map((image) => (
                <div
                  key={image.id}
                  onMouseEnter={() => handleMouseEnter(image.id)}
                  onMouseLeave={handleMouseLeave}
                  className={`relative w-full h-96 ${
                    image.id === 1 ? "col-span-2" : "col-span-1"
                  }`}
                >
                  <span className="absolute top-2 left-2 z-10 text-white px-2 py-1 font-[200]">
                    <span>{image.text}</span>
                    <Link
                      href={`${image.link}`}
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
                    className={`absolute inset-0 flex items-center justify-center text-white text-center bg-black bg-opacity-30 text-5xl font-[100] rounded-sm ${
                      hoveredIndex === image.id ? "opacity-0" : "opacity-100"
                    }`}
                  ></div>
                </div>
              ))}
            </motion.div>

            <motion.div
              key={`${selectedCategory}-2`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 w-full h-full font-[200]"
            >
              {displayedImages.slice(2, 4).map((image) => (
                <div
                  key={image.id}
                  onMouseEnter={() => handleMouseEnter(image.id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full h-96"
                >
                  <span className="absolute top-2 left-2 z-10 text-white px-2 py-1 font-[200]">
                    <span>{image.text}</span>
                    <Link
                      href={`/${
                        image.text.toLowerCase() === "plante"
                          ? "speciale/plante"
                          : image.text.toLowerCase()
                      }`}
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
                    className={`absolute inset-0 flex items-center justify-center text-white text-center bg-black bg-opacity-30 text-5xl font-[100] rounded-sm ${
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
