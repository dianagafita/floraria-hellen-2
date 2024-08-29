import Image from "next/image";
import { BUCHET_MENU } from "@/constants";
import Title from "../util/title";

export default function ShortcutItemCard() {
  return (
    <div className="scrollbar grid grid-rows-1 grid-flow-col overflow-x-auto items-center mb-5">
      <Title>CATEGORII</Title>
      {BUCHET_MENU.map((image, index) => (
        <div
          key={index}
          className="relative m-3 my-6 w-[26vw] h-[30vw] md:w-[21vw] md:h-[15vw] overflow-hiddenß shadow-lg hover:shadow-lg transition-shadow duration-300"
        >
          <Image
            src={image.image}
            alt={image.title}
            className="object-cover w-full h-full "
            fill
          />
          <div className="absolute inset-0 bg-black  opacity-40 from-black to-transparent  hover:opacity-0 transition-opacity duration-300"></div>
          <div className="absolute shadow-lg right-[-20px] bottom-[-20px] p-3 bg-white text-center text-[13px] font-[200]  whitespace-nowrap">
            <span>{image.title}</span>
          </div>{" "}
        </div>
      ))}
    </div>
  );
}
