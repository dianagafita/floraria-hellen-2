"use client";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./butt";
import Image from "next/image";
import img from "./cr.jpeg";
import vday from "./8m.jpeg";
import img2 from "./aranjamente.jpeg";
import img3 from "./nunta.jpeg";
import imgSmall1 from "./cr.jpeg"; // Add smaller images for mobile view
import imgSmall2 from "./three.jpeg";
import imgSmall3 from "./nunta.jpeg";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import craciun from "./craciun3.jpeg";
import larges from "./craciunmain.jpeg";
import larges2 from "./8m.jpeg";
// Define two sets of images: one for larger screens, one for smaller screens
const largeImages = [
  {
    img: larges2.src,
    title: "FLORI DE 1 si 8 MARTIE",
    upperTitle: "Pentru sarbatori de iubire!",
    subtitle: "CUMPARA",
  },
  // { img: imgSmall2, title: "ARANJAMENTE FLORALE", subtitle: "CUMPARA" },
  {
    img: img3,
    title: "DECORATIUNI NUNTI SI EFECTE",
    upperTitle: "Flori naturale si proaspete",
    subtitle: "CERE OFERTA",
  },
];
const smallImages = [
  {
    img: larges2,
    title: "FLORI DE 1 si 8 MARTIE",
    upperTitle: "Pentru clipe de iubire!",
    subtitle: "CUMPARA",
  },
  // { img: imgSmall2, title: "ARANJAMENTE FLORALE", subtitle: "CUMPARA" },
  { img: imgSmall3, title: "BUCHETE DE MIREASA", subtitle: "CERE OFERTA" },
];

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // Track screen size
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true }, [
    // Autoplay({ delay: 5000, stopOnInteraction: false }),
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
    [emblaMainApi, emblaThumbsApi],
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
                <Image
                  src={imgs.img}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />
                <div className="absolute inset-0 flex justify-center text-white text-center bg-black bg-opacity-30 text-5xl font-[100]"></div>

                <div className="absolute top-10 right-10 md:top-16 md:right-10 flex flex-col items-end font-[100] text-white">
                  <span className="fontWedding text-[40px] md:text-[60px] text-end text-white leading-none">
                    {imgs.upperTitle}
                  </span>
                  <span className="fontElegant tracking-widest flex flex-col text-xl md:text-3xl text-end -mt-1">
                    {imgs.title}
                    <Link
                      href="/buchete/buchete-trandafiri"
                      className="fontSimple text-[13px] text-end font-[100] text-white hover:text-[rgba(255,255,255,0.7)] underline underline-offset-2 mt-2"
                    >
                      {imgs.subtitle}
                    </Link>
                  </span>
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
