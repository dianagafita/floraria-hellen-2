"use client";
import { useState } from "react";

import Image from "next/image";

export function FeaturedImageGallery({ images, type }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="grid grid-cols-3 md:grid-cols-1 gap-1 md:gap-4 w-full">
      <div className="col-span-2 md:col-span-1">
        <Image
          className={`${
            type ? "md:h-[550px] lg:h-[460px]" : "md:h-[460px]"
          } w-full h-[400px]  object-cover object-center`}
          src={active}
          width={200}
          height={200}
          alt="Main image"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
        {images.map((imgelink, index) => (
          <div key={index} className="w-full h-[198px]  md:h-24">
            <Image
              onClick={() => setActive(imgelink)}
              src={imgelink}
              width={200}
              height={200}
              className="cursor-pointer rounded-sm object-cover object-center w-full h-full"
              alt="Gallery image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
