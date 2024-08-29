import React, { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./arr";
import "./a.css";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
const TWEEN_FACTOR_BASE = 0.2;

const EmblaCarousel = (props) => {
  const { slides, options, hoveredIndex, handleMouseEnter, handleMouseLeave } =
    props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla2__parallax__layer");
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
        const tweenNode = tweenNodes.current[slideIndex];
        tweenNode.style.transform = `translateX(${translate}%)`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);
  }, [emblaApi, tweenParallax]);

  return (
    <div className="embla2">
      <div className="embla2__viewport" ref={emblaRef}>
        <div className="embla2__container">
          {slides.map((image, index) => (
            <div
              className="embla2__slide"
              key={index}
              onMouseEnter={() => handleMouseEnter(image.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="embla2__parallax">
                <div className="embla2__parallax__layer">
                  <span className="absolute bottom-2 text-center z-10 text-white px-2 py-1 font-[200]">
                    <span>{image.text}</span>
                    <span className="mt-2 text-[12px] font-[100] flex items-center">
                      CUMPARA{" "}
                      <ChevronRight
                        size={16}
                        strokeWidth={1.5}
                        className="ml-1"
                      />
                    </span>
                  </span>
                  <Image
                    className="embla2__slide__img embla2__parallax__img"
                    src={image.src}
                    alt="Your alt text"
                    width={200}
                    height={200}
                  />
                  <div
                    className={`absolute inset-0 rounded-[10px] flex items-center justify-center text-white text-center bg-black bg-opacity-30 text-5xl font-[100] ${
                      hoveredIndex === image.id ? "opacity-0" : "opacity-100"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla2__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla2__dot".concat(
              index === selectedIndex ? " embla2__dot--selected" : ""
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
