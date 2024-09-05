"use client";
import React, { useState } from "react";
import { SORT_ITEMS } from "@/constants";

export default function SortItems({ nrOfProducts, onSortChange }) {
  const [selectedOption, setSelectedOption] = useState(SORT_ITEMS[0].title);

  const handleSortChange = (e) => {
    const selected = e.target.value;
    setSelectedOption(selected);
    onSortChange(selected);
  };

  return (
    <div className="flex justify-between items-center my-10 mx-5 ">
      <span className="text-[13px]  2xl:text-[20px] font-[300]">
        {nrOfProducts} {nrOfProducts === 1 ? "produs" : "produse"}
      </span>
      <div className=" rounded-sm border border-white border-[0.9px] text-black  font-[300]">
        <select
          value={selectedOption}
          onChange={handleSortChange}
          className=" text-[13px] md:text-[15px] 2xl:text-[20px] focus:outline-none px-2 md:py-2 md:px-3 !w-[160px] md:!w-[250px]"
        >
          {SORT_ITEMS.map((opt) => (
            <option key={opt.title}>{opt.title}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
