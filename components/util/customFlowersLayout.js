import Image from "next/image";

export default async function FlowerPageLayout({ mainImage, title, type }) {
  return (
    <div className="relative w-full h-full">
      <div className="relative  w-full min-h-[220px] h-[10vh] md:h-[30vh]">
        <Image
          src={mainImage}
          required
          alt=""
          className="object-cover"
          layout="fill"
        />

        <div className="p-20 absolute inset-0 flex items-center justify-center text-black text-center bg-black bg-opacity-40 px-5 ">
          {type && (
            <div className=" flex items-center justify-center text-black text-center px-5 ">
              <span className="relative text-black  pt-10 pb-5 px-5 md:px-6  flex flex-col">
                <span className="absolute text-white   fontWedding font-[200] top-[-0.3rem] right-0 text-[3rem]">
                  catalog
                </span>
                <span className="uppercase fontElegant text-[25px]  md:text-[30px] text-end">
                  {title}{" "}
                </span>
              </span>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
