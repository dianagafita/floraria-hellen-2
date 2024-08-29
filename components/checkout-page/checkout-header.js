import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import icon from "@/assets/images/header-logo2.jpg";

export default function CheckoutHeader() {
  return (
    <div className="fle flex-col w-full justify-center">
      <Link href="/" className="relative mx-auto  block w-[13rem] h-[7rem]">
        <Image
          quality={100}
          src={icon}
          alt="Image"
          className="object-contain w-full"
          fill
          priority
        />
      </Link>
      <div className="flex w-full justify-center  mb-5">
        <Link className="font-[300] text-[12px] flex items-center" href="/cart">
          Cos <ChevronLeft className="ml-2 mr-1" strokeWidth={1} size={15} />
        </Link>
        <span className="font-[500] text-[12px] flex items-center">
          Livrare{" "}
          <ChevronRight className="ml-2 mr-1" strokeWidth={1} size={15} />
        </span>
        <Link className="font-[300] text-[12px] flex items-center" href="/cart">
          Plata <ChevronRight className="ml-2" strokeWidth={1} size={15} />
        </Link>
      </div>
    </div>
  );
}
