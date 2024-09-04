"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmDeliveryPage({ searchParams }) {
  const [orderUpdated, setOrderUpdated] = useState(false);
  const { orderId } = searchParams;
  const router = useRouter();

  useEffect(() => {
    const updateOrderStatus = async () => {
      try {
        const response = await fetch(`/api/deliveredOrder/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.error) {
          console.error("Error updating order:", data.error);
        } else {
          console.log("Order updated successfully:", data);
          setOrderUpdated(true);
        }
      } catch (error) {
        console.error("Failed to update order:", error);
      }
    };

    if (orderId) {
      updateOrderStatus();
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [orderId]);
  return (
    <main className="min-h-[50vh] flex flex-col justify-center items-center max-w-6xl text-center p-10 text-white  m-10 rounded-md">
      <div className="mb-10">
        <h1 className="text-4xl font-[100] mb-2 text-black">
          Comanda livrata!
        </h1>
        <div className="bg-black p-2  md:px-6 rounded-md mt-5 md:text-4xl font-bold md:w-[400px]">
          ID COMANDA: {orderId}
        </div>
      </div>
    </main>
  );
}
