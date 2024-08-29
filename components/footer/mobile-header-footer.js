import { Facebook, Instagram, User } from "lucide-react";
import Link from "next/link";
import MenuItem from "../header/menu-item";
import GoogleTranslate from "@/app/(content)/GoogleTranslate";
import { languagesLong } from "@/constants";
import { useEffect, useState } from "react";

export default function MobileHeaderFooter({ toggleOpen }) {
  const [verify, setVerify] = useState("1");

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const response = await fetch("/api/valid");
      const data = await response.json();

      setVerify(data.userId);
    };

    fetchAuthStatus();
  }, []);

  return (
    <MenuItem className="absolute bottom-0 w-full p-4 bg-white text-center text-sm list-none">
      <div className="flex justify-between items-center h-[2rem] ">
        <div className="flex  items-center  ">
          <User strokeWidth={0.9} size={23} />
          <Link
            href={`${verify ? "/profile" : "/authentification"}`}
            className="ml-2 font-[200]"
            onClick={toggleOpen}
          >
            {verify ? "Contul meu" : "Logare"}
          </Link>
        </div>
        <div className="flex items-center  ">
          <Link
            className="cursor-pointer ]"
            href="https://www.instagram.com/floraria.hellen?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            onClick={toggleOpen}
          >
            <Instagram size={20} strokeWidth={1.3} />
          </Link>
          <Link
            className="cursor-pointer ml-[10px]"
            href="https://www.facebook.com/floraria.hellen"
            onClick={toggleOpen}
          >
            <Facebook size={20} strokeWidth={1.3} />
          </Link>
          <GoogleTranslate langFormat={languagesLong} />
        </div>
      </div>
    </MenuItem>
  );
}
