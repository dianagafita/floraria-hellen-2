import { SIDENAV_ITEMS } from "@/constants";
import classes from "./a.module.css";
import Link from "next/link";

export default function Categories({ type }) {
  const data = SIDENAV_ITEMS.find((item) => item.path === `/${type}`);

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
          >
            <div className={classes["item__details"]}>{item.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
