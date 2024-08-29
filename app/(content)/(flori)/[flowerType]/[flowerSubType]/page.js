import {
  getProductsBySubType,
  getProductsByType,
} from "@/app/api/store/products";
import { getTitleOfPath } from "@/components/path";
import SortableFlowerList from "@/components/sort";
import Categories from "@/components/util/categories";
import FlowerPageLayout from "@/components/util/customFlowersLayout";
import { TitleByPath } from "@/components/util/getPathTitle";
import Loading from "@/lib/loading";
import { redirect } from "next/navigation";

const validFlowerTypes = [
  "buchete-flori-uscate",
  "buchete-trandafiri",
  "buchete-flori-primavara",
  "buchete-flori-vara",
  "buchete-flori-toamna",
  "aranjamente-nou-nascut",
  "aranjamente-flori-uscate",
  "aranjamente-trandafiri",
  "aranjamente-flori-primavara",
  "aranjamente-flori-vara",
  "aranjamente-flori-toamna",
  "craciun",
  "paste",
  "martie",
  "sf-valentin",
];

export default async function RosesBouquetsPage({ params }) {
  const { flowerSubType, flowerType } = params;

  const { title, subTitle } = getTitleOfPath(
    `/${flowerType}`,
    `/${flowerType}/${flowerSubType}`
  );

  const paths = [
    {
      href: `/${flowerType}`,
      title: title,
      style: "text-black-300/75",
    },
    {
      href: `/${flowerType}/${flowerSubType}`,
      title: subTitle,
      style: "text-black-300/75",
    },
  ];

  if (flowerSubType && !validFlowerTypes.includes(flowerSubType)) {
    redirect("/");
  }

  let flowerBouquets;

  if (flowerSubType) {
    flowerBouquets = await getProductsBySubType({
      type: `${flowerType}`,
      subtype: `${flowerSubType}`,
    });
  } else {
    flowerBouquets = await getProductsByType({
      type: `${flowerType}`,
    });
  }

  return (
    <div className="flex flex-col h-[100%]">
      <FlowerPageLayout />
      <TitleByPath paths={paths} />

      <Categories />
      {!flowerBouquets ? (
        <Loading />
      ) : (
        <SortableFlowerList
          flowers={flowerBouquets}
          type="flori"
          flowerType={flowerType}
          subtype={flowerSubType}
        />
      )}
    </div>
  );
}
