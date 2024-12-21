"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PiBagThin } from "react-icons/pi";
import { CiCreditCard1 } from "react-icons/ci";
import { BsHouse } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import Image from "next/image";
import Loading from "@/lib/loading";

export default function OrderDetailsPage({ params }) {
  const orderId = params.orderId;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        try {
          const response = await fetch(`/api/orders/${orderId}`);
          console.log("res", response);
          const data = await response.json();
          setOrder(data);
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      };
      fetchOrder();
    }
  }, [orderId]);

  if (!order) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  console.log("a", order);

  return (
    <div className="min-h-[100vh]">
      <section className="bg-white py-8 px-5 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl 2xl:px-0">
          <h2 className="text-xl font-[600] sm:text-2xl ">
            Urmareste comanda #{order.id}
          </h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
            <div class="w-full divide-y divide-gray-200 overflow-hidden rounded-sm border border-gray-200 :divide-gray-700 :border-gray-700 lg:max-w-xl xl:max-w-2xl">
              {order?.order_items.map((item, index) => (
                <div class="space-y-4 p-6" key={index}>
                  <div class="flex items-center gap-6">
                    <Link
                      href={`/products/${item.productId}`}
                      className="h-14 w-14 shrink-0"
                    >
                      <Image
                        className="h-full w-full"
                        src={item.images_url[0]}
                        alt={item.product_name}
                        width={100}
                        height={100}
                        layout="responsive"
                      />
                    </Link>

                    <Link
                      href="#"
                      class="min-w-0 flex-1 font-medium  hover:underline "
                    >
                      {item.product_name.toUpperCase()} #{item.productId} (
                      {item.flowers?.join(", ")})
                    </Link>
                  </div>
                  <div className="flex items-center justify-end gap-4">
                    <div className="flex items-center justify-end gap-4">
                      <p className=" text-base font-[100] text-gray-900">
                        <span className="text-[14px] mb-[2px]">x</span>
                        <span>{item.quantity}</span>
                      </p>
                      <p
                        translate="no"
                        className="text-xl font-[400] leading-tight text-gray-900"
                      >
                        {item.prodtct_price} lei
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="space-y-4 bg-[rgba(0,0,0,0.03)] p-6">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="font-normal text-gray-500">Produse</dt>
                    <dd translate="no" className="font-medium text-gray-900">
                      {order.cart_total} lei
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="font-normal text-gray-500">Livrare</dt>
                    <dd
                      translate="no"
                      className="text-base font-medium text-gray-900"
                    >
                      {order.shipping_fee} lei
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="text-lg font-bold text-gray-900">Total</dt>
                  <dd
                    translate="no"
                    className="text-lg font-[600] text-gray-900"
                  >
                    {order.total_price} lei
                  </dd>
                </dl>
              </div>{" "}
            </div>

            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 whitespace-nowrap">
                      Istoricul comenzii
                    </h3>
                    <ol className="relative ms-3 border-s border-gray-200">
                      <li className="ms-6 my-7 text-primary-700">
                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                          <PiBagThin />
                        </span>
                        <h4 className=" whitespace-nowrap mb-0.5 text-base font-semibold text-gray-900">
                          Comanda plasata
                        </h4>
                        <p className="text-sm font-normal text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()},{" "}
                          {new Date(order.created_at).toLocaleTimeString()}
                        </p>
                      </li>
                      <li className="mb-10 ms-6 text-primary-700">
                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                          <CiCreditCard1 />
                        </span>
                        <h4 className="whitespace-nowrap mb-0.5 text-base font-semibold text-gray-900">
                          Plata acceptata
                        </h4>
                        <p className="text-sm font-normal text-gray-500">
                          {new Date(order.updated_at).toLocaleDateString()},{" "}
                          {new Date(order.updated_at).toLocaleTimeString()}
                        </p>
                      </li>

                      {order.order_state === "delivered" && (
                        <li className="mb-10 ms-6">
                          <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                            <BsHouse strokeWidth={0.05} size={13} />
                          </span>
                          <h4 className="mb-0.5 text-base font-semibold text-gray-900">
                            Livrata
                          </h4>
                          <p className="text-sm font-normal text-gray-500">
                            {new Date(order.updated_at).toLocaleDateString()},{" "}
                            {new Date(order.updated_at).toLocaleTimeString()}
                          </p>
                        </li>
                      )}
                    </ol>
                  </div>

                  <div className="gap-4 sm:flex sm:items-center mb-10">
                    {order.order_state === "pending" && (
                      <button
                        type="button"
                        className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                      >
                        Cancel the order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
