import Link from "next/link";
import React from "react";
import firmaIncredereLogo from "./logo_ro.png";
import Image from "next/image";
import { FOOTER_MENU } from "@/constants";

export default function MainFooter() {
  return (
    <div className="w-full  border-t border-[#E0E0E0]  text-sm text-[#606060]">
      <ul className="flex text-sx flex-wrap justify-center   font-[100] p-5 ">
        {FOOTER_MENU.map((item) => (
          <Link
            href={item.href}
            key={item.title}
            className="p-2 whitespace-nowrap"
          >
            {item.title}
          </Link>
        ))}
      </ul>

      <div className="flex flex-col items-center ">
        <Link href="https://www.firmadeincredere.ro/company,8116,popa-lenuta-servicii-intreprindere-individuala-floraria-hellen-design-floral-si-decorare-evenimente">
          <div className="h-[3rem] w-[3rem] relative">
            <Image
              src={firmaIncredereLogo}
              alt="Firma Incredere Logo"
              fill
              className="object-cover"
            />
          </div>
        </Link>
        <p className="xxsFont text-[#606060]">
          &copy; 2024 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
}
