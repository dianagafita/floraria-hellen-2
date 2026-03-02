import Hero from "@/components/main-page/carousel";
import PageInfo from "@/components/main-page/page-info";
import Recommended from "@/components/main-page/recommended/recommended";
import ShopByCategory from "@/components/main-page/shopbycat/shop-by-category";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero — negative margin pulls it above layout padding so it sits edge-to-edge behind the transparent header */}
      <section className="relative w-full -mt-[4.5rem] md:-mt-[6.5rem]">
        <Hero />
      </section>

      {/* USP strip */}
      <PageInfo />

      {/* Editorial intro */}
      <section className="px-5 md:px-10 lg:px-20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Location tag */}
          <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-neutral-300 inline-block" />
            Gura Humorului · Suceava
          </p>

          {/* Big editorial headline + right-side description */}
          <div className="grid md:grid-cols-[1fr_auto] md:gap-16 items-end">
            <div className="space-y-3">
              {/* Primary identity line */}
              <p className="fontSimple text-[11px] md:text-xs tracking-[0.3em] uppercase text-neutral-500">
                Florărie cu livrare la domiciliu
              </p>
              <h1 className="fontElegant text-[clamp(2.4rem,6vw,5rem)] font-[300] leading-[1.1] text-neutral-900">
                Flori proaspete pentru
                <br />
                <em className="not-italic text-[rgb(120,6,6)]">fiecare ocazie</em>
                <br />
                specială
              </h1>
            </div>

            <div className="mt-8 md:mt-0 max-w-xs space-y-5">
              <p className="text-sm font-[100] text-neutral-600 leading-relaxed">
                Buchete și aranjamente florale realizate cu pasiune, livrate la
                ușa ta în Gura Humorului și împrejurimi — de la gesturi simple
                de apreciere până la decoruri complete de nuntă și botez.
              </p>
              <Link
                href="/buchete"
                className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-neutral-800 border-b border-neutral-400 hover:border-neutral-900 pb-0.5 transition-colors"
              >
                Explorează colecțiile <span>→</span>
              </Link>
            </div>
          </div>

          {/* Thin divider */}
          <div className="mt-12 md:mt-16 h-px bg-neutral-100" />
        </div>
      </section>

      {/* Collections bento grid — dark section */}
      <ShopByCategory />

      {/* Recommended products — warm cream section */}
      <Recommended />
    </div>
  );
}
