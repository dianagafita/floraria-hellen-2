import Title from "@/components/util/title";
import { FeaturedImageGallery } from "@/components/pages/photoGallery";
import Link from "next/link";
import { getComponentById } from "@/app/api/events/products";
import Loading from "@/lib/loading";

export default async function ComponentPage({ params }) {
  const title = decodeURIComponent(params.componentId);
  const componentDetails = await getComponentById(params.componentId);

  const paths = [
    { href: "/evenimente", title: "EVENIMENTE", style: "text-black-300/75" },
    { href: "/evenimente/nunta", title: "NUNTA", style: "text-black" },
    {
      href: "/evenimente/nunta/aranjamente-masa",
      title: "ARANJAMENTE FLORALE",
      style: "text-black",
    },
    {
      href: `/evenimente/nunta/aranjamente-masa/${params.componentId}`,
      title: title,
      style: "text-black",
    },
  ];
  if (!componentDetails) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full min-h-[70vh] mb-20">
      <div className="md:flex  w-full md:mt-10 ">
        <div className="md:w-1/2 md:p-5 mb-10">
          <FeaturedImageGallery
            type="event"
            images={componentDetails.images_url}
          />{" "}
        </div>
        <div className="mx-5 my-20 md:my-5 flex flex-col md:ml-10 md:w-1/2 h-[460px]">
          <div className="flex flex-col ">
            <span className="mx-auto text-[20px] lg:text-[25px] fontElegant uppercase">
              {componentDetails.name}
            </span>
            <div className="flex flex-col">
              <span className="my-2 flex flex-col ">
                Detalii suplimentare:
                <span className="my-1 text-sm font-[100]">
                  La produsele cu flori naturale pot exista usoare variatii de
                  culoare fata de imaginea prezentata.
                </span>
                <span className="text-sm font-[100] mb-10">
                  Anumite flori din aranjamente pot fi disponibile doar in
                  anumite perioade din an.
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span>ID #35688</span>
          <span className="text-[13px] my-2 text-[#505050] font-[100]">
            Pentru a putea cere o oferta veti avea nevoie de ID ul produsului.
          </span>
          <Link
            href="/request-offer"
            className="text-[13px] font-[100] text-[#606060] hover:text-[#404040] underline underline-offset-2"
          >
            CERE OFERTA
          </Link>
        </div>
      </div>
    </div>
  );
}
