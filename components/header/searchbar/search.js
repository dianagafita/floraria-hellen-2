"use client";
import ItemCard from "@/components/items/item-card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Loading from "@/lib/loading";
import Link from "next/link";

export default function Search({ inputChanges, pChanges, openSearch }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length > 2) {
      setHasSearched(true);
      try {
        const response = await fetch(`/api/search/${value}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error("Failed to search products", response.status);
        }
      } catch (error) {
        console.error("Failed to search products", error);
      }
    } else {
      setResults([]);
      setHasSearched(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.length > 2) {
      handleClearSearch();
      router.push(`/search-results?query=${query}`);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    if (openSearch) {
      openSearch();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center px-5 ">
        <form
          onSubmit={handleSubmit}
          className="w-full text-black text-center h-[1rem] my-5 flex items-center"
        >
          <p className={`text-black font-[300] text-[16px]  py-1 ${pChanges}`}>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Cauta..."
              className={`text-[16px] focus:outline-none ${inputChanges} placeholder-[#606060] w-full bordr-b border-black  py-1`}
              value={query}
              onChange={handleSearch}
            />
          </p>
        </form>
        <X
          strokeWidth={0.6}
          className="cursor-pointer"
          onClick={handleClearSearch}
        />
      </div>{" "}
      <div>
        {!results && <Loading />}
        {results.length > 0 ? (
          <div className="text-center my-10">
            <ItemCard
              images={results.slice(0, 3)}
              moreStyle="searchItem"
              type="search"
            />
            <Link
              onClick={handleClearSearch}
              href={`/search-results?query=${query}`}
              className=" font-[100] text-[14px] underline underline-offset-4 decoration-[#505050] text-[#505050] hover:text-black hover:decoration-black"
            >
              Vezi toate cele {results.length} rezultate...
            </Link>
          </div>
        ) : (
          hasSearched && (
            <p className="font-[100] text-[14px] text-center py-5">
              Nu s-a gasit niciun rezultat.
            </p>
          )
        )}
      </div>
    </>
  );
}
