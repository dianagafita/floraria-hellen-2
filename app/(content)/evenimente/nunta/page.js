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
        <div className="p-20 absolute inset-0 flex items-center justify-end text-black text-center bg-black bg-opacity-40 px-5 ">
          <div className=" flex items-end justify-end text-black text-center px-5 ">
            <span className="relative text-black  pt-10 pb-5 px-5 md:px-6  flex flex-col">
              <span className="absolute text-white   fontWedding font-[200] top-[-0.3rem] right-0 text-[4rem]">
                catalog
              </span>
              <span className="uppercase fontElegant text-[25px]  md:text-[3rem] text-end text-white">
                NUNTA
              </span>
            </span>
          </div>
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
