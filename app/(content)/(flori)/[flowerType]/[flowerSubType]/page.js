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
import img from "./trand.jpeg";
import img1 from "./acraciun.jpg";
import img2 from "./5.jpeg";
import martie from "./martie.jpeg";
import img3 from "./5.jpeg";
import drag from "./pr.jpeg";
import primavara from "./pr.jpeg";

const validFlowerTypes = [
  { title: "buchete-flori-uscate", img: img },
  {
    title: "buchete-trandafiri",
    img: img,
  },
  {
    title: "buchete-flori-primavara",
    img: primavara,
  },
  { title: "buchete-flori-vara", img: img1 },
  { title: "buchete-flori-toamna", img: img2 },
  { title: "aranjamente-craciun", img: img1 },
  { title: "aranjamente-dragobete", img: drag },
  { title: "aranjamente-nou-nascut", img: img3 },
  { title: "aranjamente-flori-diverse", img: img2 },
  { title: "aranjamente-trandafiri", img: img },
  { title: "aranjamente-flori-primavara", img: primavara },
  { title: "aranjamente-flori-vara", img: img2 },
  { title: "aranjamente-flori-toamna", img: img2 },
  { title: "craciun", img: img },
  { title: "paste", img: img },
  { title: "martie", img: martie },
  { title: "sf-valentin", img: img },
  { title: "coroane" },
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

  const isValidFlowerType = validFlowerTypes.some(
    (type) => type.title === flowerSubType
  );

  if (flowerSubType && !isValidFlowerType) {
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
  const selectedFlowerType = validFlowerTypes.find(
    (type) => type.title === flowerSubType
  );

  return (
    <div className="flex flex-col h-[100%]">
      <FlowerPageLayout
        type="subtype"
        title={subTitle}
        mainImage={selectedFlowerType?.img || img}
      />
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
