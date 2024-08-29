"use client";
import Image from "next/image";
import React from "react";
import Title from "@/components/util/title";
import img from "./4.jpeg";
import img2 from "./2.jpeg";
import img3 from "./3.jpeg";
import img4 from "./1.jpeg";
import img5 from "./5.jpeg";

import Link from "next/link";

export default function Recommended() {
  const images = [img, img2, img3, img4, img5];
  return (
    <div className="bg-white items-center mb-4 overflow-x-auto flex w-full rounded-md p-8 scrollbar">
      <Title>RECOMANDARI</Title>
      {images.map((img, index) => (
        <div key={index} className="flex flex-col items-center mx-10">
          <div className="relative w-[185px] h-[185px] md:w-[300px] md:h-[300px] overflow-hidden">
            <Image
              src={img}
              className="object-cover transition-transform duration-300 transform hover:scale-110"
              fill
              alt=""
            />
            <Link
              href="/"
              className="whitespace-nowrap absolute bottom-0 left-3 border-[1.5px] text-white border-white m-2 py-1 md:py-2 px-3 shadow-md font-[200]"
            >
              Buchet trandafiri
            </Link>
          </div>
        </div>
      ))}

      {/* <div className="flex flex-col items-center">
        <div className="relative w-44 h-44 md:w-[300px] md:h-[300px] overflow-hidden">
          <Image
            src={img2}
            className="object-cover transition-transform duration-300 transform hover:scale-110"
            layout="fill"
          />
          <Link
            href="/"
            className="whitespace-nowrap absolute bottom-0 left-3 border-[1.5px] text-white border-white m-2 py-1 md:py-2 px-3 shadow-md font-[200]"
          >
            Buchet trandafiri
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative w-44 h-44 md:w-[250px] md:h-[250px] my-5 mx-5 overflow-hidden">
          <Image
            src={img3}
            className="object-cover transition-transform duration-300 transform hover:scale-110"
            layout="fill"
          />
          <Link
            href="/"
            className="whitespace-nowrap absolute bottom-0 left-3 border-[1.5px] text-white border-white m-2 py-1 md:py-2 px-3 shadow-md font-[200]"
          >
            Buchet trandafiri
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative w-44 h-44 md:w-[250px] md:h-[250px] overflow-hidden">
          <Image
            src={img4}
            className="object-cover transition-transform duration-300 transform hover:scale-110"
            layout="fill"
          />
          <Link
            href="/"
            className="whitespace-nowrap absolute bottom-0 left-3 border-[1.5px] text-white border-white m-2 py-1 md:py-2 px-3 shadow-md font-[200]"
          >
            Buchet trandafiri
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center mx-10">
        <div className="relative w-44 h-44 md:w-[250px] md:h-[250px] overflow-hidden">
          <Image
            src={img5}
            className="object-cover transition-transform duration-300 transform hover:scale-110"
            layout="fill"
          />
          <Link
            href="/"
            className="whitespace-nowrap absolute bottom-0 left-3 border-[1.5px] text-white border-white m-2 py-1 md:py-2 px-3 shadow-md font-[200]"
          >
            Buchet trandafiri
          </Link>
        </div>
      </div> */}
    </div>
  );
}
