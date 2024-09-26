import Image from "next/image";
import React from "react";
import img from "./t.jpeg";
import { TitleByPath } from "@/components/util/getPathTitle";
import Link from "next/link";
import { getCandles } from "@/app/api/events/products";
import Loading from "@/lib/loading";
import FlowerImage from "./ims";

export default async function CandlesPage() {
  const weddingComponentItem = await getCandles();

  const paths = [
    { href: "/evenimente", title: "EVENIMENTE", style: "text-black-300/75" },
    { href: "/evenimente/lumanari", title: "LUMANARI", style: "text-black" },
  ];
  const sortedItems = weddingComponentItem.sort((a, b) => a.id - b.id);

  return (
    <div className=" min-h-[100vh]">
      {" "}
      <div className="relative h-[335px] w-full">
        <Image src={img} alt="" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-end text-black text-center bg-black bg-opacity-50 px-5">
          <span className="tracking-widest  bg-white  py-10 px-10 md:px-20 md:mr-20 flex flex-col  text-sm md:text-2xl">
            LUMANARI{" "}
            <span className="text-[10px] text-end font-[100] text-[#A8A8A8]">
              Flori naturale si proapete
            </span>
            <Link
              href="/request-offer"
              className="text-[13px] text-end font-[100] text-[#606060] hover:text-[#404040] underline underline-offset-2"
            >
              CERE OFERTA{" "}
            </Link>
          </span>{" "}
        </div>
      </div>
      <TitleByPath paths={paths} />
      <h1 className="text-[2rem] mt-[1.5rem] mx-[1.5rem] mb-3 ">
        GALERIE FOTO
      </h1>
      <h2 className="text-[1rem] mx-[1.5rem] font-[100] ">
        ALEGETI DIN MODELE DE MAI JOS
      </h2>
      {!weddingComponentItem ? (
        <Loading />
      ) : (
        <div className="flex gap-4 mx-5 mt-[4rem] mb-[5rem] flex-wrap justify-center ">
          {sortedItems.map((image, index) => (
            <FlowerImage
              key={index}
              src={image.images_url[0]}
              alt={`Flower image ${index + 1}`}
              href={`/evenimente/lumanari/${image.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
