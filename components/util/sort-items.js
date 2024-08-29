// import { SORT_ITEMS } from "@/constants";
// import React from "react";

// export default function SortItems({ nrOfProducts }) {
//   return (
//     <div className=" flex justify-between items-center my-5 mx-5">
//       <span className=" text-[14px] font-[300]">
//         {nrOfProducts} {nrOfProducts === 1 ? "produs" : "produse"}
//       </span>
//       <div className=" rounded-sm border border-black border-[0.9px] text-black text-[12px] md:text-[13px]  p-1 md:px-2 font-[300] ">
//         <select className="focus:outline-none">
//           {SORT_ITEMS.map((opt) => (
//             <option key={opt.title}>{opt.title}</option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import { SORT_ITEMS } from "@/constants";

export default function SortItems({ nrOfProducts, onSortChange }) {
  const [selectedOption, setSelectedOption] = useState(SORT_ITEMS[0].title);

  const handleSortChange = (e) => {
    const selected = e.target.value;
    setSelectedOption(selected);
    onSortChange(selected); // Trigger the sort callback
  };

  return (
    <div className="flex justify-between items-center my-10 mx-5">
      <span className="text-[14px] font-[300]">
        {nrOfProducts} {nrOfProducts === 1 ? "produs" : "produse"}
      </span>
      <div className=" rounded-sm border border-white border-[0.9px] text-black text-[12px] md:text-[13px] p-1 md:px-2 font-[300]">
        <select
          value={selectedOption}
          onChange={handleSortChange}
          className="focus:outline-none px-2 !w-[200px]"
        >
          {SORT_ITEMS.map((opt) => (
            <option key={opt.title}>{opt.title}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
