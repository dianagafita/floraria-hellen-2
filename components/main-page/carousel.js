"use client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./butt";
import Image from "next/image";
import img from "./10.jpeg";
import img2 from "./11.jpeg";
import img3 from "./12.jpeg";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
const images = [img, img2, img3];
const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {images.map((img, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number ">
                <Image src={img} alt="" layout="fill"></Image>
                <div className="absolute inset-0 flex  justify-center text-white text-center bg-black bg-opacity-50 text-5xl font-[100]"></div>
                {/* <span className="absolute inset-0 border-4 border-white"></span>
                <span className="absolute inset-1 border-2 border-white m-2"></span> */}

                <div className="flex flex-col absolute md:top-30 right-10  items-end font-[100]   ">
                  {/*  <span className="text-3xl md:text-4xl text-end">
                    ARANJAMENTE
                  </span>
                  <span className="text-base mb-10 font-[100]">
                    {" "}
                    pentru orice ocazie
                  </span>
                  <button className="rounded-sm w-fit font-[100] bg-[rgba(255,255,255,0.6)] text-sm md:text-base text-white py-2 px-4">
                    COMANDA ACUM
                  </button>*/}
                  <span className="tracking-widest  bg-white  py-10 px-5 md:px-20 md:mr-20 flex flex-col  text-sm md:text-2xl">
                    ARANJAMENTE FLORALE{" "}
                    <span className="text-[10px] text-end font-[100] text-[#A8A8A8]">
                      Flori naturale si proapete
                    </span>
                    <Link
                      href="/aranjamente"
                      className="text-[13px] text-end font-[100] text-[#606060] hover:text-[#404040] underline underline-offset-2"
                    >
                      CUMPARA{" "}
                    </Link>
                  </span>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="embla-thumbs">
          <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className="embla-thumbs__container">
              {slides.map((index) => (
                <Thumb
                  key={index}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
