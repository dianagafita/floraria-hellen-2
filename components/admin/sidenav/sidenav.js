import { BsHouse } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { TbUsers } from "react-icons/tb";
import Link from "next/link";
import { TbBuildingChurch } from "react-icons/tb";

export default function SidenavAdmin() {
  return (
    <div className="h-[100vh] fixed z-[20] w-[60px] border-r shadow-lg p-4 flex flex-col bg-white">
      <Link href="/admin/dashboard" className="text-[1.5rem] my-4">
        <BsHouse />
      </Link>
      <Link
        href="/admin/dashboard/orders "
        className="text-[1.4rem] my-4 text-[#505050] hover:text-black"
      >
        <BiCart />
      </Link>{" "}
      <Link
        href="/admin/dashboard/event-products"
        className="text-[1.4rem] my-4 text-[#505050] hover:text-black"
      >
        <TbBuildingChurch />
      </Link>
      <Link
        href="/admin/dashboard/products"
        className="text-[1.4rem] my-4 text-[#505050] hover:text-black"
      >
        <GiCardboardBoxClosed />
      </Link>
      <Link
        href="/admin/dashboard/users"
        className="text-[1.4rem] my-4 text-[#505050] hover:text-black"
      >
        <TbUsers />
      </Link>
    </div>
  );
}
