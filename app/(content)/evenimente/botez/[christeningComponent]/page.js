import { TitleByPath } from "@/components/util/getPathTitle";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getComponentByType } from "@/app/api/events/products";
import Loading from "@/lib/loading";
import { getTitleOfPath } from "@/components/path";
import FlowerImage from "../../nunta/[weddingComponent]/ims";
import imgs from "../botez.jpeg";
import Image from "next/image";
const validChristeningComponent = [
  "aranjamente-cristelnita",
  "aranjamente-florale",
  "decoratiuni-sala",
  "photo-corner",
  "fantana-ciocolata",
  "lumanari-botez",
];

export default async function ChristeningPage({ params }) {
  const { christeningComponent } = params;
  if (!validChristeningComponent.includes(christeningComponent)) {
    redirect("/");
  }
  const christeningComponents = await getComponentByType({
    type: `${christeningComponent}`,
    event: "botez",
  });

  const { title, subTitle, nestedSubTitle } = getTitleOfPath(
    "/evenimente",
    "/evenimente/botez",
    `/evenimente/botez/${christeningComponent}`
  );

  const paths = [
    { href: "/evenimente", title: "EVENIMENTE", style: "text-black-300/75" },
    { href: "/evenimente/botez", title: "BOTEZ", style: "text-black" },
    {
      href: `/evenimente/botez/${christeningComponent}`,
      title: nestedSubTitle,
      style: "text-black",
    },
  ];
  const sortedItems = christeningComponents.sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-[100vh]">
      <div className="relative h-[335px] w-full">
        <Image src={imgs} alt="" fill className="object-cover" />
        <div className="p-20 absolute inset-0 flex items-center justify-end text-black text-center bg-black bg-opacity-50 px-5 ">
          <div className=" flex items-center justify-center text-black text-center px-5 ">
            <span className="relative text-white  pt-10 pb-5 px-5 md:px-6  flex flex-col">
              <span className="absolute    fontWedding font-[200] top-[-0.8rem] md:top-[-0.3rem] right-0 text-[4rem]">
                catalog
              </span>
              <span className="uppercase fontElegant text-[1.5rem]  md:text-[2rem] text-end">
                {nestedSubTitle}
              </span>
            </span>
          </div>
        </div>
      </div>
      <TitleByPath paths={paths} />
      <h1 className="text-[2rem]  mx-[1.5rem] mt-[1.5rem] fontElegant ">
        GALERIE FOTO
      </h1>
      <h2 className="text-[1rem] mx-[1.5rem] font-[100] ">
        ALEGETI DIN MODELE DE MAI JOS
      </h2>
      {!christeningComponents ? (
        <Loading />
      ) : (
        <div className="flex gap-4 mx-5 mt-[4rem] mb-[5rem] flex-wrap justify-center ">
          {sortedItems.map((image, index) => (
            <FlowerImage
              key={index}
              src={image.images_url[0]}
              alt={`Flower image ${index + 1}`}
              href={`/evenimente/nunta/${christeningComponent}/${image.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
