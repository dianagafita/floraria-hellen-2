"use client";

import { useState, useEffect } from "react";
import ItemCard from "@/components/items/item-card";
import SortItems from "@/components/util/sort-items";
import { sortItems } from "@/hooks/useSortItems";

export default function SortableFlowerList({
  flowers,
  flowerType,
  type,
  subtype,
}) {
  const [sortedFlowers, setSortedFlowers] = useState(flowers);
  const [sortOption, setSortOption] = useState("Recomandare");

  useEffect(() => {
    setSortedFlowers(sortItems([...flowers], sortOption));
  }, [sortOption, flowers]);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div>
      <SortItems
        nrOfProducts={sortedFlowers.length}
        onSortChange={handleSortChange}
      />
      <ItemCard
        images={sortedFlowers}
        type={type}
        flowerType={flowerType}
        subtype={subtype}
      />
    </div>
  );
}
