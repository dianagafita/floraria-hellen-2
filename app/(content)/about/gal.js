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
            <h2>A glorious nature shot.</h2>
            <p>
              Wow. What a wonderful image. And look! There are even more images
              on the right side. Amazing. If you click below, I bet youll get
              teleported to a magical land.
            </p>
            <button
              className={styles.btnPrimary}
              onClick={() => alert("I lied")}
            >
              Learn more
            </button>
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
