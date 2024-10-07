import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "@/constants";
import { motion } from "framer-motion";
import Search from "../searchbar/search";
import Searchbar from "../searchbar/search-bar";

export default function SideNav({ isSearching, isVisible, openSearch }) {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isSideNavHovered, setIsSideNavHovered] = useState(false);
  const [isSubMenuHovered, setIsSubMenuHovered] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isSideNavHovered && !isSubMenuHovered) {
      setActiveSubMenu(null);
    }
  }, [isSideNavHovered, isSubMenuHovered]);

  const updateSubmenuPosition = (rect) => {
    setSubmenuPosition({ top: rect.bottom, left: rect.left });
  };

  return (
    <>
      <div
        // style={{ fontFamily: "Bile", fontWeight: 600, letterSpacing: 2 }}
        className="w-full bg-transparent flex pb-3 borde-b md:flex hidden flex-col "
        onMouseEnter={() => setIsSideNavHovered(true)}
        onMouseLeave={() => setIsSideNavHovered(false)}
      >
        <div className="flex items-between justify-center w-full">
          <div className="flex flex-row items-center">
            {SIDENAV_ITEMS.map((item, idx) => (
              <div key={idx} className="lg:mx-3 md:mx-2">
                <MenuItem
                  item={item}
                  onClose={() => setActiveSubMenu(null)}
                  setActiveSubMenu={setActiveSubMenu}
                  activeSubMenu={activeSubMenu}
                  updateSubmenuPosition={updateSubmenuPosition}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isSearching ? "auto" : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 100 }}
        className="overflow-hidden w-full md:hidden flex flex-col"
      >
        {/* <MobileSearch /> */}
      </motion.div>
      {activeSubMenu && (
        <FullWidthSubMenu
          activeSubMenu={activeSubMenu}
          subMenuItems={activeSubMenu.subMenuItems}
          onClose={() => setActiveSubMenu(null)}
          onMouseEnter={() => setIsSubMenuHovered(true)}
          onMouseLeave={() => setIsSubMenuHovered(false)}
          submenuPosition={submenuPosition}
        />
      )}
      <Searchbar isVisible={isVisible} openSearch={openSearch} />
    </>
  );
}

function MenuItem({ item, setActiveSubMenu, onClose, updateSubmenuPosition }) {
  const itemRef = useRef(null);
  const pathname = usePathname();

  const handleMouseEnter = () => {
    if (item.submenu) {
      setActiveSubMenu(item);
      if (itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect();
        updateSubmenuPosition(rect);
      }
    } else {
      setActiveSubMenu(null);
    }
  };

  return (
    <div
      ref={itemRef}
      className="relative font-[200] md:text-[11.2px] lg:text-[12px] 2xl:text-[18px] my-2"
      onMouseEnter={handleMouseEnter}
    >
      {item.submenu ? (
        <div
          className={`relative link-underline flex flex-row items-center w-full justify-between whitespace-nowrap ${
            pathname === item.path
              ? "underline decoration-[rgb(130,6,6)] underline-offset-4 decoration-[1.5px]"
              : " link-underline-black"
          }`}
          style={{ overflow: "hidden" }}
        >
          <div className="flex flex-row space-x-4 items-center">
            {item.icon}
            {item.title === "EVENIMENTE" ? (
              <span className="cursor-default text-l flex relative text-transform: uppercase">
                {item.title}
              </span>
            ) : (
              <Link
                href={item.path}
                className="text-l flex relative text-transform: uppercase"
              >
                {item.title}
              </Link>
            )}
          </div>
        </div>
      ) : (
        <Link
          href={item.path}
          className={`whitespace-nowrap flex flex-row space-x-1 items-center text-transform: uppercase ${
            item.path === pathname
              ? "font-800 underline decoration-[rgb(130,6,6)] underline-offset-4 decoration-[1.5px]"
              : "link-underline link-underline-black"
          }`}
        >
          {item.icon}
          <span className="flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
}

export function FullWidthSubMenu({
  subMenuItems,
  onClose,
  activeSubMenu,
  onMouseEnter,
  onMouseLeave,
  submenuPosition,
}) {
  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: "3%" }}
      exit={{ y: "5%" }}
      transition={{ type: "spring", stiffness: 500, damping: 50 }}
      className={`absolute bg-white z-50 shadow-lg ${
        activeSubMenu.title === "EVENIMENTE" ? "w-screen left-0" : "w-fit"
      }`}
      style={
        activeSubMenu.title === "EVENIMENTE"
          ? { top: submenuPosition.top }
          : { left: submenuPosition.left - 15, top: submenuPosition.top }
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {activeSubMenu.title === "EVENIMENTE" ? (
        <div className="flex justify-between px-[2vw] w-[100vw] ">
          {subMenuItems?.map((subItem, idx) => (
            <SubMenu key={idx} subItem={subItem} onClose={onClose} />
          ))}
        </div>
      ) : (
        <div className="flex-col justify-between px-2 py-3 min-w-[150px] lg:max-w-[350px]">
          {subMenuItems?.map((subItem, idx) => (
            <SubMenu key={idx} subItem={subItem} onClose={onClose} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function SubMenu({ subItem, onClose }) {
  const pathname = usePathname();

  const handleClick = () => {
    onClose();
  };

  return (
    <div className="hidden md:flex items-center whitespace-nowrap">
      <div className="text-center my-2 mx-2">
        <Link
          href={subItem.path}
          className={`text-[14px] 2xl:text-[20px] font-[300] ${
            subItem.path === pathname
              ? "font-800 underline decoration-[rgb(130,6,6)] underline-offset-4 decoration-[1.5px]"
              : "link-underline link-underline-black"
          }`}
          onClick={handleClick}
        >
          {subItem.title}
        </Link>
      </div>
      {subItem.subMenuItemsMenu && (
        <div className="border-l flex flex-col my-5">
          {subItem.subMenuItemsMenu.map((menuItem, index) => (
            <Link
              key={index}
              href={menuItem.path}
              className={`text-sm 2xl:text-[20px]  font-[100] mx-2 my-1 text-[#404040] hover:text-[#202020] ${
                menuItem.path === pathname
                  ? "font-500 underline decoration-[rgb(130,6,6)] underline-offset-4 decoration-[1.5px]"
                  : ""
              }`}
              onClick={handleClick}
            >
              {menuItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
