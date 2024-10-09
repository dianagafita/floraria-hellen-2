"use client";
import img from "./logo2.png";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import MobileHeaderFooter from "../footer/mobile-header-footer";
import { SIDENAV_ITEMS } from "@/constants";
import {
  menuItemVariants,
  sidebarVariants,
  variants_nested_sub_menu_item,
} from "@/styles/motion-variants";
import Image from "next/image";

export default function MobileHeader({ isOpen, toggleOpen }) {
  const pathname = usePathname();

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`fixed z-[60]  inset-0 w-[70%] flex flex-col  md:hidden bg-white`}
      >
        <X
          className="mt-9  self-end mr-4"
          size={30}
          strokeWidth={0.3}
          onClick={toggleOpen}
        />
        {/* <Link href="/" className="mt-5 min-w-[105px] max-w-[150px] mx-auto ">
          <Image
            src={img}
            alt=""
            width={100}
            height={200}
            layout="responsive"
            className="object-contain overflow-hidden"
          />
        </Link>{" "} */}
        <motion.ul className="mt-10 grid  w-full px-3 max-h-screen overflow-y-auto ">
          {SIDENAV_ITEMS.map((item, idx) => (
            <MenuItemWithSubMenu
              key={idx}
              item={item}
              isOpen={isOpen}
              toggleOpen={toggleOpen}
              pathname={pathname}
            />
          ))}
        </motion.ul>
        <MobileHeaderFooter toggleOpen={toggleOpen} />
      </motion.nav>
    </>
  );
}

function MenuItemWithSubMenu({ item, isOpen, toggleOpen, pathname }) {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSubMenuOpen(false);
    }
  }, [isOpen]);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <>
      <motion.li variants={menuItemVariants} className="mb-2 text-sm px-2">
        {item.submenu && (
          <button
            className="cursor-pointer flex w-full font-light md:text-xl py-2"
            onClick={toggleSubMenu}
          >
            <div className=" flex flex-row justify-between w-full items-center ">
              {item.title === "EVENIMENTE" ? (
                <span
                  className={`cursor-default ${
                    pathname.includes(item.path) ? "font-[400]" : ""
                  }`}
                >
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.path}
                  onClick={toggleOpen}
                  className={` ${
                    pathname.includes(item.path) ? "font-[400]" : ""
                  }`}
                >
                  {item.title}
                </Link>
              )}

              <div
                style={{
                  fontWeight: "100",
                  marginLeft: "0.5rem",
                  paddingLeft: "0.5rem",
                  borderLeft: "rgb(204, 204, 204) solid 1px",
                }}
              >
                <div className={`${subMenuOpen && "rotate-180"}`}>
                  <ChevronDown
                    size={32}
                    strokeWidth={0.5}
                    width="20"
                    height="20"
                  />
                </div>
              </div>
            </div>
          </button>
        )}
        {!item.submenu && (
          <Link
            href={item.path}
            onClick={toggleOpen}
            passHref
            className={`text-transform: uppercase flex w-full font-light text-m md:text-xl py-1 ${
              item.path === pathname ? "font-[400] text-black" : ""
            }`}
          >
            {item.title}
          </Link>
        )}
      </motion.li>
      {item.subMenuItems && (
        <motion.ul
          initial={false}
          animate={subMenuOpen ? "open" : "closed"}
          variants={variants_nested_sub_menu_item}
          className={`ml-2 flex flex-col ${
            subMenuOpen ? "" : "mt-[1rem] hidden md:block"
          }`}
        >
          {item.subMenuItems.map((subItem, subIdx) => (
            <MenuItemWithNestedSubMenu
              key={subIdx}
              item={subItem}
              isOpen={isOpen}
              toggleOpen={toggleOpen}
              pathname={pathname}
            />
          ))}
        </motion.ul>
      )}
    </>
  );
}

function MenuItemWithNestedSubMenu({ item, isOpen, toggleOpen, pathname }) {
  const [nestedSubMenuOpen, setNestedSubMenuOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setNestedSubMenuOpen(false);
    }
  }, [isOpen]);

  const toggleNestedSubMenu = () => {
    setNestedSubMenuOpen(!nestedSubMenuOpen);
  };

  return (
    <>
      <motion.li variants={variants_nested_sub_menu_item} className="mb-2 ">
        {item.subMenuItemsMenu ? (
          <button
            className="flex w-full  font-light  md:text-xl px-2"
            onClick={toggleNestedSubMenu}
          >
            <div className="flex flex-row justify-between w-full items-center ">
              <span
                className={`text-[13px]  ${
                  pathname.includes(item.path) ? "font-[400]" : ""
                }`}
              >
                <Link onClick={toggleOpen} href={item.path}>
                  {item.title}
                </Link>
              </span>
              <div
                style={{
                  fontWeight: "100",
                  marginLeft: "0.5rem",
                  paddingLeft: "0.5rem",
                  borderLeft: "rgb(204, 204, 204) solid 1px",
                }}
              >
                <div className={`${nestedSubMenuOpen && "rotate-180"}`}>
                  <ChevronDown
                    size={32}
                    strokeWidth={0.5}
                    width="20"
                    height="20"
                  />
                </div>
              </div>
            </div>
          </button>
        ) : (
          <Link
            href={item.path}
            onClick={toggleOpen}
            passHref
            className={` flex w-full font-light text-[14px] px-2 ${
              item.path === pathname ? "font-[400] text-black" : ""
            }`}
          >
            {item.title}
          </Link>
        )}
      </motion.li>
      {item.subMenuItemsMenu && isOpen && (
        <motion.ul
          initial={false}
          animate={nestedSubMenuOpen ? "open" : "closed"}
          variants={variants_nested_sub_menu_item}
          className={` flex flex-col mb-2 text-[13px] font-[100] px-2 ${
            nestedSubMenuOpen ? "" : "hidden md:block "
          }`}
        >
          {item.subMenuItemsMenu.map((nestedSubItem, nestedSubIdx) => (
            <motion.li
              key={nestedSubIdx}
              variants={menuItemVariants}
              className="font-[100] mb-2"
            >
              <Link
                href={nestedSubItem.path}
                onClick={toggleOpen}
                className={`${
                  nestedSubItem.path === pathname ? "font-[400]" : ""
                }`}
              >
                {nestedSubItem.title}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </>
  );
}
