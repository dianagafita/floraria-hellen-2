"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Title from "@/components/util/title";

export default function ProductsWithoutImagesPage() {
  const [products, setProducts] = useState([]);
  const [eventProducts, setEventProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/products-without-images");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products ?? []);
          setEventProducts(data.eventProducts ?? []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <Title>Se încarcă...</Title>
      </div>
    );
  }

  const total = products.length + eventProducts.length;

  return (
    <div className="p-6">
      <Title moreStyle="mb-6">Produse fără imagini valide</Title>
      <p className="text-sm text-neutral-600 mb-6">
        Aceste produse nu sunt afișate în magazin (lipsă imagine sau link invalid).
        Total: <strong>{total}</strong>.
      </p>

      {products.length > 0 && (
        <div className="bg-white rounded-md border border-neutral-200 overflow-hidden mb-8">
          <h2 className="px-4 py-3 border-b border-neutral-200 font-medium text-neutral-800">
            Produse ({products.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Nume</th>
                  <th className="px-4 py-3">Categorie</th>
                  <th className="px-4 py-3">Acțiune</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="px-4 py-3">{p.id}</td>
                    <td className="px-4 py-3">{p.name ?? "—"}</td>
                    <td className="px-4 py-3">{p.product_type ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Link
                        href="/admin/dashboard/products"
                        className="text-[#5A0707] hover:underline"
                      >
                        Mergi la Produse
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {eventProducts.length > 0 && (
        <div className="bg-white rounded-md border border-neutral-200 overflow-hidden">
          <h2 className="px-4 py-3 border-b border-neutral-200 font-medium text-neutral-800">
            Produse evenimente ({eventProducts.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Nume</th>
                  <th className="px-4 py-3">Tip eveniment</th>
                  <th className="px-4 py-3">Acțiune</th>
                </tr>
              </thead>
              <tbody>
                {eventProducts.map((p) => (
                  <tr key={p.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="px-4 py-3">{p.id}</td>
                    <td className="px-4 py-3">{p.name ?? "—"}</td>
                    <td className="px-4 py-3">{p.event_type ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Link
                        href="/admin/dashboard/event-products"
                        className="text-[#5A0707] hover:underline"
                      >
                        Mergi la Produse evenimente
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {total === 0 && (
        <p className="text-neutral-600">Toate produsele au cel puțin o imagine validă.</p>
      )}
    </div>
  );
}
