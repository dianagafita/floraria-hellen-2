import Image from "next/image";
import i from "./1.jpeg";
import Title from "@/components/util/title";
import { TitleByPath } from "@/components/util/getPathTitle";
import { getProductsByType } from "@/app/api/store/products";
import { redirect } from "next/navigation";
import SortableFlowerList from "../../../../components/sort";
import { getTitleOfPath } from "@/components/path";
import Loading from "@/lib/loading";

const validFlowerTypes = ["plante", "flori-criogenate", "coroane-funerare"];
const titles = ["PLANTE IN GHIVECI", "FLORI CRIOGENATE", "COROANE FUNERARE"];

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
    <div className="h-[100%]">
      <div className="relative w-full h-[335px]">
        <Image
          src={i}
          alt="Main Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center bg-black bg-opacity-50">
          {flowerType === "plante" ? (
            <Title>{titles[0]}</Title>
          ) : flowerType === "flori-criogenate" ? (
            <Title>{titles[1]}</Title>
          ) : (
            <Title>{titles[2]}</Title>
          )}
        </div>
      </div>

      <TitleByPath paths={paths} />
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
