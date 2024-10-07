"use client";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./butt";
import Image from "next/image";
import img from "./10.jpeg";
import img2 from "./aranjamente.jpeg";
import img3 from "./11.jpeg";
import imgSmall1 from "./10.jpeg"; // Add smaller images for mobile view
import imgSmall2 from "./10.jpeg";
import imgSmall3 from "./10.jpeg";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

// Define two sets of images: one for larger screens, one for smaller screens
const largeImages = [img, img2, img3];
const smallImages = [imgSmall1, imgSmall2, imgSmall3];

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // Track screen size
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  // Detect screen size changes
  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth < 768); // Adjust for mobile screen sizes
    };

    // Set initial value and add event listener for window resize
    checkMobileScreen();
    window.addEventListener("resize", checkMobileScreen);

    return () => window.removeEventListener("resize", checkMobileScreen);
  }, []);

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

  // Choose the appropriate image set based on screen size
  const imagesToUse = isMobile ? smallImages : largeImages;

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {imagesToUse.map((img, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number ">
                <Image src={img} alt="" layout="fill" objectFit="cover" />
                <div className="absolute inset-0 flex justify-center text-white text-center bg-black bg-opacity-50 text-5xl font-[100]"></div>

                <div className="flex flex-col absolute md:top-30 right-10 items-end font-[100]">
                  <span className="tracking-widest bg-white py-10 px-5 md:px-20 md:mr-20 flex flex-col text-sm md:text-2xl">
                    ARANJAMENTE FLORALE{" "}
                    <span className="text-[10px] text-end font-[100] text-[#A8A8A8]">
                      Flori naturale si proaspete
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

        {/* Thumbnails */}
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
