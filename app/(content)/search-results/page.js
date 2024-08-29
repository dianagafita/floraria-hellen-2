"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ItemCard from "@/components/items/item-card";
import Title from "@/components/util/title";
import Loading from "@/lib/loading";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        try {
          const response = await fetch(`/api/search/${query}`);
          if (response.ok) {
            const data = await response.json();
            setResults(data);
          } else {
            console.error("Failed to search products", response.status);
          }
        } catch (error) {
          console.error("Failed to search products", error);
        }
      }
    };

    fetchResults();
  }, [query]);

  if (!results) {
    return <Loading />;
  }

  return (
    <div className="min-h-[80vh]">
      {results.length > 0 ? (
        <div className="my-10 ">
          <Title moreStyle="px-5 text-left text-2xl pb-8">
            Rezultatele cautarii: <span className="font-[400]">{query}</span>
          </Title>
          <ItemCard images={results} type="search" />
        </div>
      ) : (
        <p className="text-[#505050] mt-10">Niciun rezultat găsit.</p>
      )}
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SearchResultsContent />
    </Suspense>
  );
}
