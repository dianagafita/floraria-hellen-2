import SidenavAdmin from "@/components/admin/sidenav/sidenav";

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-[#F0F0F0] flex relative w-full h-full">
      <SidenavAdmin className="flex-shrink-0" />
      <main className=" ml-[60px] flex-grow overflow-x-auto">{children}</main>
    </div>
  );
}
