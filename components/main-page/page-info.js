import { TbTruckDelivery } from "react-icons/tb";
import { PiFlowerThin } from "react-icons/pi";
import { CalendarDays } from "lucide-react";

const perks = [
  {
    icon: TbTruckDelivery,
    label: "Livrare programată",
    sub: "la adresa dorită",
  },
  {
    icon: PiFlowerThin,
    label: "Flori proaspete",
    sub: "din selecție zilnică",
  },
  {
    icon: CalendarDays,
    label: "Luni – Duminică",
    sub: "comenzi non-stop",
  },
];

export default function PageInfo() {
  return (
    <div className="bg-[#faf9f7] border-y border-neutral-100">
      <div className="max-w-4xl mx-auto grid grid-cols-3 divide-x divide-neutral-200 py-5 px-4">
        {perks.map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 px-4 text-center"
          >
            <Icon strokeWidth={0.8} className="w-5 h-5 text-neutral-500" />
            <p className="text-[11px] md:text-xs font-[300] text-neutral-800 tracking-wide uppercase">
              {label}
            </p>
            <p className="text-[10px] font-[100] text-neutral-500 hidden md:block">
              {sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
