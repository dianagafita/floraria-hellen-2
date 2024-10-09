import { getProductsByType } from "@/app/api/store/products";
import Categories from "@/components/util/categories";
import FlowerPageLayout from "@/components/util/customFlowersLayout";
import img from "./zz.jpeg";
import img2 from "./sec.jpeg";
import Loading from "@/lib/loading";
import { redirect } from "next/navigation";
import SortableFlowerList from "@/components/sort";
import { getTitleOfPath } from "@/components/path";

const validFlowerTypes = [
  "buchete",
  "aranjamente",
  "evenimente",
  "ocazii-speciale",
  "funerare-bisericesti",
];

export default async function FlowerBouquetsPage({ params }) {
  const { flowerType } = params;
  if (!validFlowerTypes.includes(flowerType)) {
    redirect("/");
  }

  const { title } = getTitleOfPath(`/${flowerType}`);
  const flowerBouquets = await getProductsByType({
    type: `${flowerType}`,
  });

  const paths = [
    {
      href: `/${flowerType}`,
      title: title,
      style: "text-black-300/75",
    },
  ];

  return (
    <div className="flex flex-col h-[100%]">
      <FlowerPageLayout mainImage={flowerType === "buchete" ? img : img2} />
      {/* <TitleByPath paths={paths} /> */}
      <Categories type={flowerType} />
      {!flowerBouquets ? (
        <Loading />
      ) : (
        <SortableFlowerList flowerType={flowerType} flowers={flowerBouquets} />
      )}{" "}
    </div>
  );
}
