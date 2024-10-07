import Image from "next/image";
import i from "./1.jpeg";
import Title from "@/components/util/title";
import { TitleByPath } from "@/components/util/getPathTitle";
import { getProductsByType } from "@/app/api/store/products";
import { redirect } from "next/navigation";
import SortableFlowerList from "../../../../components/sort";
import { getTitleOfPath } from "@/components/path";
import Loading from "@/lib/loading";

const validFlowerTypes = ["plante", "flori-criogenate", "funerare-bisericesti"];
const titles = [
  "PLANTE IN GHIVECI",
  "FLORI CRIOGENATE",
  "FUNERARE & BISERICESTI",
];

export default async function OtherFlowersPage({ params }) {
  const flowerType = params.otherFlowers || "";

  if (!validFlowerTypes.includes(flowerType)) {
    redirect("/");
  }

  const { title } = getTitleOfPath(`/speciale/${flowerType}`);
  const flowers = await getProductsByType({
    type: flowerType,
  });

  const paths = [{ href: `/${flowerType}`, title, style: "text-black-300/75" }];

  return (
    <div className="min-h-[100vh]">
      <div className="relative w-full min-h-[220px] h-[10vh] md:h-[30vh]">
        <Image
          src={i}
          alt="Main Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center bg-black bg-opacity-50"></div>
      </div>
      <div className="mt-7 flex items-center justify-center text-black text-center ">
        <span className="relative text-black  pt-10 pb-5 px-5 md:px-6  flex flex-col">
          <span className="absolute text-[rgb(120,6,6)]   fontWedding font-[200] top-[-0.3rem] right-0 text-[3rem]">
            catalog{" "}
          </span>
          <span className="uppercase fontElegant text-[25px]  md:text-[30px] text-end ">
            {flowerType === "plante"
              ? titles[0]
              : flowerType === "flori-criogenate"
              ? titles[1]
              : titles[2]}
          </span>
        </span>{" "}
      </div>{" "}
      {!flowers ? (
        <Loading />
      ) : (
        <SortableFlowerList
          flowers={flowers}
          flowerType={flowerType}
          type="speciale"
        />
      )}
    </div>
  );
}
