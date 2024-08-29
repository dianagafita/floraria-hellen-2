import { useEffect } from "react";
import styles from "./ScrollComponent.module.css";
import Image from "next/image";
import img from "./5.jpeg";
import img2 from "./4.png";
import Link from "next/link";

const ScrollComponentReverse = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(`.${styles.section}`);

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
          section.classList.add(styles.animate);
        } else {
          section.classList.remove(styles.animate);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`${styles.section}`}>
        {/* Image on the left */}
        <div className={styles.left}>
          <Image src={img} alt="Glorious Nature" layout="fill" />
        </div>
        <div className={styles.middle}>
          <Image src={img2} alt="Glorious Nature" layout="fill" />
        </div>

        {/* Text on the right */}
        <div className={styles.right}>
          <div className={styles.content}>
            <h2 className="mb-10 text-[20px]">POFTITI DE VA IUBITI</h2>
            <p className="mb-10 text-sm md:text-md">
              În cadrul emisiunii Poftiți de vă iubiti, alături de inegalabilul
              Nea Marin, am avut onoarea de a participa cu flori și aranjamente
              florale pentru o nuntă de neuitat. Fiecare detaliu a fost creat cu
              pasiune, astfel încât să reflecte dragostea și bucuria momentului.
            </p>
            <Link
              className="tracking-wider text-[#404040] text-[15px] font-[100] underline underline-offset-[4px] underline decoration-1 underline-[#404040] hover:text-black"
              href="https://www.youtube.com/watch?v=NO_aywpY6oQ&list=PLIHV3kXdIJCEWh8nyXJLiTKFmq3b_lQJ9&t=1068s"
            >
              Link la emisiune
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollComponentReverse;
