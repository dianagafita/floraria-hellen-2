import { TitleByPath } from "@/components/util/getPathTitle";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getComponentByType } from "@/app/api/events/products";
import Loading from "@/lib/loading";
import { getTitleOfPath } from "@/components/path";
import FlowerImage from "../../nunta/[weddingComponent]/ims";

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
  return (
    <div className="min-h-[100vh]">
      {" "}
      <div className="relative h-[335px] w-full">
        <div className="absolute inset-0 flex items-center justify-end text-black text-center bg-black bg-opacity-50 px-5">
          <span className="tracking-widest  bg-white  py-10 px-5 md:px-20 md:mr-20 flex flex-col  text-sm md:text-2xl">
            BOTEZ{" "}
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
      <h1 className="text-[2rem] m-[1.5rem] ">GALERIE FOTO</h1>
      <h2 className="text-[1rem] mx-[1.5rem] font-[100] ">
        ALEGETI DIN MODELE DE MAI JOS
      </h2>
      {!christeningComponents ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 md:flex gap-4 m-5">
          {christeningComponents.map((image, index) => (
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
