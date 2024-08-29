import EmblaCarousel from "@/components/main-page/carousel";
import PageInfo from "@/components/main-page/page-info";
import Recommended from "@/components/main-page/recommended/recommended";
import ShopByCategory from "@/components/main-page/shopbycat/shop-by-category";

const OPTIONS = {};
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default async function Home() {
  return (
    <div>
      <div className="z-1 absolut top-0 ">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <PageInfo />
      <div className="relative w-full md:h-[120px] h-[220px] my-10 ">
        <span className=" flex flex-col absolute top-2 mx-4 z-10 text-black  px-2 py-1 ">
          <span className="text-2xl text-center font-[300] mb-3">
            FLORARIE CU LIVRARE LA DOMICILIU
          </span>
          <span className=" text-base text-center font-[100] mb-10">
            Descoperiți universul nostru vibrant al florilor, unde frumusețea
            naturii întâlnește creativitatea și pasiunea pentru aranjamente
            florale desăvârșite. LaFloraria Hellen, transformăm fiecare ocazie
            într-o poveste de neuitat, oferindu-vă buchete și aranjamente
            florale care să inspire și să emoționeze.
          </span>
        </span>{" "}
      </div>{" "}
      <ShopByCategory />
      <Recommended />
    </div>
  );
}
