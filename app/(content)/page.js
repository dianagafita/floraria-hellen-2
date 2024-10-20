import EmblaCarousel from "@/components/main-page/carousel";
import PageInfo from "@/components/main-page/page-info";
import Recommended from "@/components/main-page/recommended/recommended";
import ShopByCategory from "@/components/main-page/shopbycat/shop-by-category";
import PaymentSuccessPage from "./payment-success/page";

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
      <div className="flex flex-col w-full md:h-[120px] h-[220px] my-10 justify-center items-center ">
        <span className="relative top-2 z-10 text-black  py-1 w-full text-center my-10">
          <span className=" fontElegant text-[35px] text-center font-[300] mb-3">
            FLORARIE
          </span>
          <span className="fontWedding absolute top-9 md:top-6 left-[53%] text-[35px]  md:text-[45px]">
            cu livrare la domiciliu
          </span>
        </span>
        <span className="text-base text-center font-[100] mb-10 mx-5">
          Descoperiți universul nostru vibrant al florilor, unde frumusețea
          naturii întâlnește creativitatea și pasiunea pentru aranjamente
          florale desăvârșite. LaFloraria Hellen, transformăm fiecare ocazie
          într-o poveste de neuitat, oferindu-vă buchete și aranjamente florale
          care să inspire și să emoționeze.
        </span>
      </div>
      <ShopByCategory />
      <PaymentSuccessPage />
      {/* <Recommended /> */}
    </div>
  );
}
