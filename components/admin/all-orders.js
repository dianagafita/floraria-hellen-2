"use client";
import Title from "@/components/util/title";

import { useState } from "react";

import OrderDetailsModal from "./modals/order-details-modal";

export default function AllOrders({ orders }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen((prev) => !prev);
  };

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}.${month}.${year}`;
  };
  return (
    <>
      {isModalOpen && (
        <OrderDetailsModal openModal={openModal} order={selectedProduct} />
      )}

      <div className="flex flex-col w-full h-full p-5">
        <div className="py-10 px-5 bg-white  my-5 rounded-md ">
          <Title moreStyle="font-[400]">COMENZI</Title>
          <div className="relative max-w-screen overflow-x-auto my-5 md:my-10">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs text-[#505050] uppercase border-b">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    ID COMANDA
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ID USER
                  </th>
                  <th scope="col" className="px-4 py-3">
                    DATA PLASATA
                  </th>
                  <th scope="col" className="px-4 py-3">
                    DATA LIVRARE
                  </th>
                  <th scope="col" className="px-4 py-3">
                    NR. PROD.
                  </th>
                  <th scope="col" className="px-4 py-3">
                    PRET COMANDA
                  </th>
                  <th scope="col" className="px-4 py-3">
                    PRET LIVRARE
                  </th>
                  <th scope="col" className="px-4 py-3">
                    PRET TOTAL
                  </th>
                  <th scope="col" className="px-4 py-3">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className=" bg-white border-b  hover:bg-gray-50 "
                  >
                    <th
                      scope="row"
                      className="px-4 py-4 cursor-pointer"
                      onClick={() => openModal(order)}
                    >
                      {order.id}
                    </th>
                    <td className="px-4 py-4">{order.user_id}</td>
                    <td className="px-4 py-4">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-4 py-4">
                      {order.order_items.map((item) => (
                        <div key={order.id}>
                          {formatDate(item.productDeliveryInfo[1])}
                        </div>
                      ))}{" "}
                    </td>

                    <td className="px-4 py-4">{order.order_items.length}</td>
                    <td className="px-4 py-4"> {order.cart_total} </td>
                    <td className="px-4 py-4">{order.shipping_fee}</td>
                    <td className="px-4 py-4">{order.total_price}</td>
                    <td className="px-4 py-4 ">
                      {order.order_state === "paid" ? (
                        <span className="text-white bg-[#006600] py-2 px-6 rounded-md">
                          PLATITA
                        </span>
                      ) : order.order_state === "delivered" ? (
                        <span className="text-white bg-[#006600] py-2 px-6 rounded-md">
                          LIVRATA
                        </span>
                      ) : (
                        <span className="text-white bg-[#5A0707] py-2 px-5 rounded-md">
                          PLASATA
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
