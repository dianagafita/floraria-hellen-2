import Image from "next/image";
import Link from "next/link";

export default function ItemCard({
  images,
  moreStyle,
  type,
  flowerType,
  subtype,
}) {
  return (
    <ul
      className={`${
        moreStyle === "searchItem"
          ? " h-[200px] md:h-[250px] mx-10 md:mx-20 lg:mx-40 flex"
          : " grid grid-cols-2 md:grid-cols-4 justify-items-center gap-2"
      }   m-5  justify-center ${type === "search" ? "my-10" : ""}`}
    >
      {images.map((img) => (
        <li
          key={img.id}
          className={` flex flex-col  bg-white ${
            moreStyle === "searchItem"
              ? "w-[120px] h-[200px] md:p-1 md:w-[150px] md:h-full"
              : "w-[44vw] h-[60vw] min-h-[230px]  md:w-[23vw] md:h-[40vw] md:max-h-[400px] lg:w-full lg:h-[50vw] md:max-h-[400px]"
          }    mb-5`}
        >
          <div className="relative w-full h-full">
            <Link
              href={
                type === "speciale"
                  ? `/speciale/${flowerType}/${img.id}`
                  : type === "search"
                  ? `/products/${img.name}/${img.id}`
                  : subtype
                  ? `/${flowerType}/${subtype}/${img.id}`
                  : `/${flowerType}/${img.name}/${img.id}`
              }
            >
              <Image
                className={`${
                  moreStyle === "searchItem" ? "object-contain" : "object-cover"
                } h-full transition-opacity duration-300 opacity-100 hover:opacity-0`}
                src={img.images_url[0]}
                alt="Original Image"
                fill
              />
              <Image
                className={`${
                  moreStyle === "searchItem" ? "object-contain" : "object-cover"
                }  w-full h-full transition-opacity duration-300 opacity-0 hover:opacity-100`}
                src={img.images_url[1]}
                alt="Hover Image"
                fill
              />
            </Link>
          </div>
          <div className=" p-2 2xl:p-10 w-full">
            <p className="font-[300] fontSimple  mb-1 text-xs md:text-[16px] mt-3  text-center">
              {img.name}{" "}
            </p>
            <p
              translate="no"
              className="text-center mb-2 text-sm md:text-base 2xl:text-xl font-[100]"
            >
              {img.price} lei
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
