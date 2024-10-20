"use client"; // This is a client component

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const FlowerImage = ({ src, alt, href }) => {
  const [dimensions, setDimensions] = useState({ width: null, height: null });

  const handleLoadingComplete = ({ naturalWidth, naturalHeight }) => {
    setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const isVertical =
    dimensions.width &&
    dimensions.height &&
    dimensions.width < dimensions.height;

  return (
    <Link href={href} className="relative group overflow-hidden">
      <Image
        priority
        className={`rounded-sm object-cover overflow-hidden ${
          isVertical
            ? "h-full w-full w-[250px] min-h-[300px] max-h-[350px]"
            : "h-[250px] w-full min-w-[450px]"
        }`}
        src={src}
        alt={alt}
        width={isVertical ? 400 : 400}
        height={isVertical ? 500 : 300}
        onLoadingComplete={handleLoadingComplete}
      />
      <span className="tracking-widest absolute inset-0 flex items-center justify-center md:bg-gradient-to-r from-[rgba(0,0,0,0.3)] to-white-600 text-white text-center opacity-0 translate-x-[-100%] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out">
        DETALII
      </span>
    </Link>
  );
};

export default FlowerImage;
