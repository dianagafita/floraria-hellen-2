import { useEffect, useRef } from "react";
import styles from "./ScrollComponent.module.css";
import Image from "next/image";
import img2 from "./2.jpeg";
import img3 from "./3.jpg";

const ScrollComponent = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
        section.classList.add(styles.animate);
      } else {
        section.classList.remove(styles.animate);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.scrollContainer}>
      <div ref={sectionRef} className={`${styles.section}`}>
        <div className={`${styles.left}`}>
          <div className={styles.content}>
            <h2 className="mb-3 md:mb-10 text-[17px] fontElegant text-black  md:text-[20px]">
              OKTOBERFEST
            </h2>
            <p className="md:mb-10 text-[13px] md:text-md text-black">
              În cadrul festivalului, am participat cu un car alegoric din flori
              de toamna impreuna cu o rochie facuta in intregime din crizanteme.
            </p>
          </div>
        </div>

        <div className={styles.middle}>
          <Image src={img2} alt="Glorious Nature" layout="fill" />
        </div>

        <div className={`${styles.right}`}>
          <div className={styles.tiles}>
            <Image src={img3} alt="Tile Image" layout="fill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollComponent;
