// import { useEffect } from "react";
// import styles from "./ScrollComponent.module.css";
// import Image from "next/image";

// const ScrollComponent = ({ images }) => {
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll(`.${styles.section}`);

//       sections.forEach((section) => {
//         const rect = section.getBoundingClientRect();
//         const windowHeight = window.innerHeight;

//         if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
//           section.classList.add(styles.animate);
//         } else {
//           section.classList.remove(styles.animate);
//         }
//       });
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <div className={`${styles.section}`}>
//         <div className={`${styles.left}`}>
//           <div className={styles.content}>
//             <h2 className="mb-10 text-[20px] ">OKTOBERFEST</h2>
//             <p className="mb-20 text-center text-[12px] md:text-md">
//               Pentru Oktoberfest, am creat un car alegoric spectaculos, plin de
//               flori colorate și delicate, care aduc un strop de natură în
//               mijlocul sărbătorii. Am completat această magie florală cu o
//               rochie unică, împletită integral din flori, transformând fiecare
//               detaliu într-o poveste de eleganță și frumusețe.
//             </p>
//           </div>
//         </div>

//         <div className={styles.middle}>
//           <Image src={images[0]} alt="Glorious Nature" layout="fill" />
//         </div>

//         <div className={`${styles.right}`}>
//           <div className={styles.tiles}>
//             <Image src={images[1]} alt="Tile Image" layout="fill" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ScrollComponent;
import { useEffect, useRef } from "react";
import styles from "./ScrollComponent.module.css";
import Image from "next/image";
import img2 from "./2.jpeg";
import img3 from "./3.jpg";

const ScrollComponent = () => {
  const sectionRef = useRef(null); // Create a reference to the section element

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the section is in view
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
