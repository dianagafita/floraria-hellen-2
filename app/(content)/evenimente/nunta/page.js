import classes from "./wedding-menu-styles.module.css";
import imgs from "./iii.png";
import Image from "next/image";
import { TitleByPath } from "@/components/util/getPathTitle";
import Link from "next/link";
import { SIDENAV_ITEMS } from "@/constants";

const paths = [
  { href: "/evenimente", title: "EVENIMENTE", style: "text-black-300/75" },
  { href: "/evenimente/nunta", title: "NUNTA", style: "text-black" },
];

export default function Page() {
  const weddingSubMenuItems =
    SIDENAV_ITEMS.find(
      (menu) => menu.title === "EVENIMENTE"
    )?.subMenuItems.find((submenu) => submenu.title === "NUNTA")
      ?.subMenuItemsMenu || [];

  return (
    <div>
      <div className="relative h-[500px] max-h-[300px] w-full">
        <Image
          src={imgs}
          alt=""
          fill
          style={{
            objectFit: "cover",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-end text-black text-center ">
          <span className="bg-white py-10 px-20 mr-20 flex flex-col text-2xl">
            NUNTA{" "}
            <span className="text-[10px] font-[100] text-[#A8A8A8]">
              Flori naturale si proapete
            </span>
            <Link
              href="/request-offer"
              className="text-[13px] font-[100] text-[#606060] hover:text-[#404040] underline underline-offset-2"
            >
              CERE OFERTA
            </Link>
          </span>
        </div>
      </div>
      <TitleByPath paths={paths} />
      <section className={classes.sections}>
        <h1>CATEGORII</h1>
        <div className={classes.grid}>
          {weddingSubMenuItems.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              className={`${classes.item} ${classes["item--large"]}`}
            >
              <div
                className={classes["item__details"]}
                style={{ paddingLeft: "1rem" }}
              >
                <span className={classes["padding"]}>{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
