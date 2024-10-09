"use client";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./butt";
import Image from "next/image";
import img from "./10.jpeg";
import img2 from "./aranjamente.jpeg";
import img3 from "./nunta.jpeg";
import imgSmall1 from "./prima.jpeg"; // Add smaller images for mobile view
import imgSmall2 from "./three.jpeg";
import imgSmall3 from "./nunta.jpeg";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

// Define two sets of images: one for larger screens, one for smaller screens
const largeImages = [
  { img: img.src, title: "BUCHETE DE FLORI", subtitle: "CUMPARA" },
  { img: imgSmall2, title: "ARANJAMENTE FLORALE", subtitle: "CUMPARA" },
  { img: img3, title: "DECORATIUNI NUNTI SI EFECTE", subtitle: "CERE OFERTA" },
];
const smallImages = [
  { img: imgSmall1, title: "BUCHETE DE FLORI", subtitle: "CUMPARA" },
  { img: imgSmall2, title: "ARANJAMENTE FLORALE", subtitle: "CUMPARA" },
  { img: imgSmall3, title: "BUCHETE DE MIREASA", subtitle: "CERE OFERTA" },
];

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

  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
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

  const imagesToUse = isMobile ? smallImages : largeImages;

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {imagesToUse.map((imgs, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number ">
                <Image src={imgs.img} alt="" layout="fill" objectFit="cover" />
                <div className="absolute inset-0 flex justify-center text-white text-center bg-black bg-opacity-50 text-5xl font-[100]"></div>

                <div className="flex flex-col absolute md:top-30 right-3 items-end font-[100] text-white">
                  <span className="relative fontElegant tracking-widest  py-10 px-5  flex flex-col text-[20px] md:text-3xl ">
                    {imgs.title}
                    <span className="absolute top-3  md:top-4 right-0 fontWedding text-[30px]  md:text-[45px] text-end text-white ">
                      Flori naturale si proaspete
                    </span>
                    <Link
                      href="/aranjamente"
                      className="fontSimple text-[13px] text-end font-[100] text-white hover:text-black underline underline-offset-2"
                    >
                      {imgs.subtitle}
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
