"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "./logo2.png";
import { PiBagThin } from "react-icons/pi";
import { User, Search } from "lucide-react";
import SideNav from "./sidenav/side-nav";
import { useState, useEffect } from "react";
import { useCycle } from "framer-motion";
import MenuToggle from "./menu-toogle";
import MobileHeader from "./header-mobile";
import { useCart } from "@/context/cart-context";
import { useValidUser } from "@/context/auth-context";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isSearching, setIsSearching] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { cartCount, toogleOpenCart } = useCart();
  const { user } = useValidUser();
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-300 ${
          transparent
            ? "bg-transparent border-b border-white/10"
            : "bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-10 lg:px-14 h-16 md:h-[4.5rem]">
          {/* Left — hamburger (mobile) + search (desktop) */}
          <div className="flex items-center gap-3 w-[80px] md:w-[120px]">
            <span className="md:hidden" onClick={() => setIsSearching(false)}>
              <MenuToggle toggle={toggleOpen} isOpen={isOpen} />
            </span>
            <button
              onClick={() => setIsSearching((p) => !p)}
              className={`hidden md:flex transition-colors ${
                transparent
                  ? "text-white/80 hover:text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Search strokeWidth={1} size={20} />
            </button>
          </div>

          {/* Center — logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <div
              className={`transition-all duration-300 ${transparent ? "brightness-0 invert" : ""}`}
            >
              <Image
                src={logo}
                alt="Floraria Hellen"
                priority
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Right — user + cart */}
          <div className="flex items-center gap-3 md:gap-4 justify-end w-[80px] md:w-[120px]">
            <Link
              href={!user ? "/authentification" : "/profile"}
              className={`transition-colors ${
                transparent
                  ? "text-white/80 hover:text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <User strokeWidth={1} size={20} />
            </Link>
            <button
              onClick={() => {
                setIsSearching(false);
                toogleOpenCart();
              }}
              className={`relative transition-colors ${
                transparent
                  ? "text-white/80 hover:text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <PiBagThin size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[rgb(116,10,10)] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-[300]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop nav links row */}
        <div
          className={`hidden md:flex justify-center pb-1 transition-colors ${
            transparent ? "border-white/10" : ""
          }`}
        >
          <SideNav isVisible={isSearching} openSearch={() => setIsSearching((p) => !p)} transparent={transparent} />
        </div>
      </header>

      <MobileHeader isOpen={isOpen} toggleOpen={toggleOpen} />
    </>
  );
}
