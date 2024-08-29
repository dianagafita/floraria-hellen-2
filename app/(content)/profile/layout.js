"use client";
import Image from "next/image";
import imgs from "./po.jpeg";

export default function ProfileLayout({ children }) {
  return (
    <>
      <div className="relative">
        <div className="relative h-[160px] w-[100vw] order-last">
          <Image
            src={imgs}
            alt="Profile Header Image"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex justify-center text-white text-center bg-black bg-opacity-50 text-5xl font-[100]"></div>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl md:text-4xl font-[100]">
            PROFIL
          </span>
        </div>
      </div>
      {children}
    </>
  );
}
