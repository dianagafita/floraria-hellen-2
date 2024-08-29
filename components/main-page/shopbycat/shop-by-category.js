"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import img from "./1.jpeg";
import img4 from "./2.jpeg";
import img1 from "./3.jpeg";
import img2 from "@/components/items/TRANDAFIRI.jpg";
import img3 from "@/components/items/HORTENSII.jpg";
import { ChevronRight } from "lucide-react";
import EmblaCarousel from "../sec-car";
import Title from "@/components/util/title";
import Link from "next/link";
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const categories = {
  FLORI: [
    { src: img, alt: "Flori Image 1", text: "Buchete", id: 1 },
    { src: img4, alt: "Flori Image 2", text: "Aranjamente", id: 2 },
    { src: img1, alt: "Flori Image 3", text: "Plante", id: 3 },
    { src: img1, alt: "Flori Image 4", text: "Aranjamente", id: 4 },
  ],
  NUNTI: [
    { src: img2, alt: "Nunti Image 1", text: "Buchet Mireasa", id: 5 },
    { src: img3, alt: "Nunti Image 2", text: "Decoratiuni", id: 6 },
  ],
  BOTEZ: [
    { src: img1, alt: "Botez Image 1", text: "Lumanari", id: 7 },
    { src: img2, alt: "Botez Image 2", text: "Decoratiuni", id: 8 },
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
                      href={`/${image.text.toLowerCase()}`}
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
                    className="object-cover rounded-lg transition-opacity duration-300"
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center text-white text-center bg-black bg-opacity-30 text-5xl font-[100] ${
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
                    className="object-cover rounded-lg transition-opacity duration-300"
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center text-white text-center bg-black bg-opacity-30 text-5xl font-[100] ${
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
