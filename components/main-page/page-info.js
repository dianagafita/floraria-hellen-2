import { TbTruckDelivery } from "react-icons/tb";
import { PiFlowerThin } from "react-icons/pi";
import { CalendarDays } from "lucide-react";

export default function PageInfo() {
  return (
    <div className="shadow-lg border-t border-gray-200 border-opacity-50">
      <div className=" flex w-full bg-white h-auto  p-4  md:h-[5rem]  justify-between items-center ">
        <div className="flex flex-col   md:mx-20">
          <TbTruckDelivery
            strokeWidth={0.6}
            className="icon-size self-center"
          />
          <span className="xxsFont">LIVRARE PROGRAMATA</span>
        </div>
        <div className="flex flex-col">
          <PiFlowerThin strokeWidth={1} className="icon-size self-center" />
          <span className="xxsFont">FLORI PROASPETE</span>
        </div>

        <div className="flex flex-col   md:mx-20">
          <CalendarDays strokeWidth={0.6} className="icon-size self-center" />
          <span className="xxsFont">LIVRARI LUNI-DUMINICA</span>
        </div>
      </div>
    </div>
  );
}
