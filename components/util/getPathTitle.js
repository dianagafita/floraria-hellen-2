import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function TitleByPath({ paths }) {
  return (
    <span className="uppercase font-[200]  flex bg-[#490606] bg-opacity-0 shadow-sm p-3 text-[10px] md:text-[11.5px] text-black-300/50">
      <Link href="/">ACASA</Link>
      {paths.map((pa) => (
        <div key={pa.title} className="flex items-center whitespace-nowrap">
          <span className="mx-2 ">
            <ChevronRight strokeWidth={0.7} size={15} />
          </span>
          <Link href={pa.href} className={pa.style}>
            {pa.title}
          </Link>
        </div>
      ))}
    </span>
  );
}
