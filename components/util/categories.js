import { SIDENAV_ITEMS } from "@/constants";
import Link from "next/link";

export default function Categories({ type }) {
  const data = SIDENAV_ITEMS.find((item) => item.path === `/${type}`);
  console.log(type);
  if (!data) {
    return null;
  }
  console.log(data);
  return (
    <section className="w-full my-2 md:my-5">
      <div className=" flex items-center justify-center text-black text-center px-5 ">
        <span className="relative text-black  pt-10 pb-5 px-5 md:px-6  flex flex-col">
          <span className="absolute text-[rgb(120,6,6)]   fontWedding font-[200] top-[-0.3rem] right-0 text-[3rem]">
            catalog{" "}
          </span>
          <span className="uppercase fontElegant text-[25px]  md:text-[30px] text-end">
            {data.title}
          </span>
        </span>{" "}
      </div>{" "}
      <div className="  max-w-[400px] mx-auto w-full flex flex-wrap items-center justify-between ">
        {data.subMenuItems.map((item, idx) => (
          <Link key={idx} href={item.path} className=" px-2 py-1">
            <div className="fontSimple uppercase whitespace-nowrap  font-[500] text-[#404040] text-[11px] hover:text-black">
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
