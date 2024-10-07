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
        <div className="p-20 absolute inset-0 flex items-center justify-end text-black text-center bg-black bg-opacity-50 px-5 ">
          <div className=" flex items-center justify-center text-black text-center px-5 ">
            <span className="relative text-white  pt-10 pb-5 px-5 md:px-6  flex flex-col">
              <span className="absolute    fontWedding font-[200] top-[-0.8rem] md:top-[-0.3rem] right-0 text-[4rem]">
                catalog
              </span>
              <span className="uppercase fontElegant text-[1.5rem]  md:text-[2rem] text-end">
                LUMANARI{" "}
              </span>
            </span>
          </div>
        </div>
      </div>
      <TitleByPath paths={paths} />
      <h1 className="fontElegant text-[2rem] mt-[1.5rem] mx-[1.5rem] mb-1 ">
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
