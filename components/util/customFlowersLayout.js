import Image from "next/image";

export default async function FlowerPageLayout({ mainImage }) {
  return (
    <div className="relative w-full">
      <div className="relative h-[335px] w-full">
        <Image src={mainImage} alt="" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-end text-black text-center bg-black bg-opacity-50 px-5">
          <span className="tracking-widest  bg-white  py-10 px-10 md:px-20 md:mr-20 flex flex-col  text-sm md:text-2xl">
            BUCHETE DE FLORI{" "}
            <span className="text-[10px] text-end font-[100] text-[#A8A8A8]">
              Flori naturale si proapete
            </span>
          </span>{" "}
        </div>
      </div>
    </div>
  );
}
