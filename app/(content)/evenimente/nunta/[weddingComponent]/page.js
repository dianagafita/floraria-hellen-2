import Image from "next/image";
import React from "react";
import img from "./t.jpeg";
import { TitleByPath } from "@/components/util/getPathTitle";
import imgs from "./1.jpeg";
import img2 from "./3.jpeg";
import img3 from "./4.jpeg";
import img4 from "./5.jpeg";
import img5 from "./6.jpeg";
import img6 from "./7.jpeg";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getComponentByType } from "@/app/api/events/products";
import Loading from "@/lib/loading";
import { getTitleOfPath } from "@/components/path";

const imga = [
  {
    src: img2,
    href: `/evenimente/wedding/flowers/ARANJAMENT TRANDAFIRI SI BUJORI`,
  },
  { src: img3, href: `/evenimente/wedding/flowers/1` },
  { src: img4, href: `/evenimente/wedding/flowers/1` },
  { src: img5, href: `/evenimente/wedding/flowers/1` },
  { src: img6, href: `/evenimente/wedding/flowers/1` },
  { src: imgs, href: `/evenimente/wedding/flowers/1` },
];
const validWeddingComponent = [
  "nunta-completa",
  "buchete-mireasa",
  "aranjamente-masa",
  "decoratiuni-sali",
  "intrare-sala-covor-rosu",
  "biserica",
  "cununie-civila",
  "masa-oficiala",
  "photo-corner",
  "masina-fum",
  "fantana-ciocolata",
  "lumanari-biserica",
  "corsaj-cocarede-bratari-coronite",
];

export default async function WeddingPage({ params }) {
  const { weddingComponent } = params;
  if (!validWeddingComponent.includes(weddingComponent)) {
    redirect("/");
  }
  const flowerBouquets = await getComponentByType({
    type: `${weddingComponent}`,
    event: "nunta",
  });

  const { title, subTitle, nestedSubTitle } = getTitleOfPath(
    "/evenimente",
    "/evenimente/nunta",
    `/evenimente/nunta/${weddingComponent}`
  );

  const paths = [
    { href: "/evenimente", title: "EVENIMENTE", style: "text-black-300/75" },
    { href: "/evenimente/nunta", title: "NUNTA", style: "text-black" },
    {
      href: `/evenimente/nunta/${weddingComponent}`,
      title: nestedSubTitle,
      style: "text-black",
    },
  ];
  return (
    <div className="min-h-screen h-full">
      {" "}
      <div className="relative h-[335px] w-full">
        <Image src={img} alt="" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-end text-black text-center bg-black bg-opacity-50 px-5">
          <span className="tracking-widest  bg-white  py-10 px-10 md:px-20 md:mr-20 flex flex-col  text-sm md:text-2xl">
            NUNTA{" "}
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
      {!flowerBouquets ? (
        <Loading />
      ) : (
        <div className="flex gap-4 mx-5 mt-[4rem] mb-[5rem]  flex-wrap justify-center ">
          {flowerBouquets.map((image, index) => (
            <Link
              href={`/evenimente/nunta/${weddingComponent}/${image.id}`}
              key={index}
              className="relative group overflow-hidden"
            >
              <Image
                className="w-[400px] h-[500px] rounded-sm object-cover overflow-hidden"
                src={image.images_url[0]}
                width={400}
                height={500}
                alt=""
                layout="fixed" // Use "fixed" or remove `layout="responsive"`
              />

              <span className=" tracking-widest  absolute inset-0 flex items-center justify-center md:bg-gradient-to-r from-[rgba(0,0,0,0.3)] to-white-600  text-white text-center opacity-0 translate-x-[-100%] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out">
                DETALII
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
