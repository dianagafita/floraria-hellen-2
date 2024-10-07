"use client";

import { GoogleTranslate } from "@/app/(content)/GoogleTranslate";
import classes from "./header.module.css";
import { Facebook, Instagram, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function MiniHeaderSection({ prefLangCookie }) {
  return (
    <div className={`bg-transparent hidden md:block `}>
      <div className={classes["mini_header"]}>
        <PhoneCall
          strokeWidth={1.5}
          style={{ width: "15px", height: "15px" }}
        />
        <span className="text-[10x] text-[#838282] font-[200] ml-2">
          072-345-8699
        </span>
        <Link
          href="https://www.instagram.com/floraria.hellen?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          style={{ cursor: "pointer" }}
        >
          <Instagram
            strokeWidth={1.5}
            style={{ width: "15px", height: "15px", marginLeft: "23px" }}
          />
        </Link>
        <Link href="https://www.facebook.com/floraria.hellen">
          <Facebook
            strokeWidth={1.5}
            style={{ width: "15px", height: "15px", marginLeft: "5px" }}
          />
        </Link>
        {/* <LanguageSwitcher /> */}
        {/* <GoogleTranslate langFormat={languagesLong} /> */}
        <GoogleTranslate prefLangCookie={prefLangCookie} />
      </div>
    </div>
  );
}
