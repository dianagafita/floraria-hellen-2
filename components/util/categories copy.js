import { SIDENAV_ITEMS } from "@/constants";
import classes from "./a.module.css";
import Link from "next/link";
import img from "./aa.jpeg";
import img1 from "./bb.jpeg";
import img2 from "./cc.jpeg";

const IMAGE_MAP = {
  default: [img], // Default image set
  buchete: [img.src, img1.src, img2.src], // Images for "speciale" category
  aranjamente: ["./a.jpeg"], // Images for "nunta" category
  // Add more categories with corresponding image sets here
};
export default function Categories({ type }) {
  const data = SIDENAV_ITEMS.find((item) => item.path === `/${type}`);
  const images = IMAGE_MAP[type] || IMAGE_MAP.default; // Fallback to default if no specific type is found
  console.log(type);
  if (!data) {
    return null;
  }

  return (
    <section className={classes.sections}>
      <h1>{data.title}</h1>
      <div className={classes.grid}>
        {data.subMenuItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.path}
            className={`${classes.item} ${
              idx === 1
                ? classes["item--large"]
                : idx > 1
                ? classes["item--medium"]
                : ""
            }`}
            style={{ backgroundImage: `url(${images[idx % images.length]})` }} // Set image dynamically
          >
            <div className={classes["item__details"]}>{item.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
