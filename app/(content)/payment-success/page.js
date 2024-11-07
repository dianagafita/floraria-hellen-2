"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import img from "./a.jpeg";

export default function PaymentSuccessPage({ searchParams }) {
  const [orderUpdated, setOrderUpdated] = useState(false);
  const { orderId } = searchParams;
  const router = useRouter();

  useEffect(() => {
    if (orderId && !orderUpdated) {
      updateOrderStatus(orderId).then(() => {
        setOrderUpdated(true);
        setTimeout(() => {
          router.push("/");
        }, 100000);
      });
    }
  }, [orderId, orderUpdated]);

  const updateOrderStatus = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_state: "paid" }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Error updating order:", data.error);
      } else {
        console.log("Order updated successfully:", data);
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  return (
    <main
      style={{ background: `url(${img.src})`, backgroundSize: "cover" }}
      className="relative min-h-[100vh]"
    >
      <div className="absolute inset-0 flex items-center justify-center text-black text-center bg-black bg-opacity-50">
        <span className="bg-white py-10 w-[90vw] lg:w-[50vw] flex flex-col mx-auto text-2xl h-auto md:max-h-[50vh] md:h-[350px]">
          <h1 className="px-20 fontElegant text-4xl font-[100] mb-5 text-black">
            COMANDA PLATITA!
          </h1>
          <span className="px-20 text-[15px]">
            Veti primi un email cu informatiile comenzii! Cand comanda a fost
            livrata veti primi email de instiintare!
          </span>
          <div className=" w-[200px] mx-auto bg-black p-2 rounded-sm mt-5 text-xl text-white">
            ID COMANDA: {orderId}
          </div>
          <div className=" p-10  flex items-end justify-end text-black text-center ">
            <span className=" relative h-full ">
              <span className="absolute text-[rgb(120,6,6)] whitespace-nowrap text-end fontWedding font-[200] top-[-0.3rem] right-0 text-[3rem]">
                Multumim, <p>echipa Hellen!</p>
              </span>
            </span>
          </div>
        </span>
      </div>
    </main>
  );
}
