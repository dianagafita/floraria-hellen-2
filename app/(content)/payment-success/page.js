"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
        }, 2000);
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
    <main className="max-w-6xl text-center p-10 text-white text-center border m-10 rounded-md">
      <div className="mb-10">
        <h1 className="text-4xl font-[100] mb-2 text-black">
          Comanda platita!
        </h1>
        <h2>
          Veti primi un email cu informatiile comenzii! Cand comanda a fost
          livrata veti primi email de instiintare!
        </h2>
        <div className="bg-black p-2 rounded-md mt-5 text-4xl font-bold">
          ID COMANDA: {orderId}
        </div>
      </div>
    </main>
  );
}
