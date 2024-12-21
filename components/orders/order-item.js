"use client";
import { useEffect, useState } from "react";
import Button from "../util/button";
import Link from "next/link";
import Loading from "@/lib/loading";

export default function OrderItem({ userId, mode }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(`/api/userOrders/${userId}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Expected an array of orders but received:", data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  if (loading) {
    return <Loading />; // Show loading while fetching
  }

  if (orders.length === 0) {
    return (
      <div className="mx-5 flex justify-start my-5">
        Nu ati plasat nicio comanda!
      </div>
    );
  }

  // Sort orders by date (descending) and get the latest order
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const renderOrder = (order) => (
    <div
      key={order.id}
      className="lg:px-5 py-6 mt-5 border rounded-sm px-4 flex flex-col mb-5 w-full"
    >
      <div className="flex flex-col items-start mb-5">
        <span className=" whitespace-nowrap">Comanda nr. {order.id}</span>
        <span className="text-sm text-[rgba(0,0,0,0.5)] font-[100]">
          Plasata pe {new Date(order.created_at).toLocaleDateString()} la{" "}
          {new Date(order.created_at).toLocaleTimeString()}
        </span>
      </div>
      <div className="flex w-full justify-between items-center">
        <span className="uppercase text-sm">{order.order_state}</span>
        <span translate="no" className="mr-5 text-sm">
          {order.total_price} LEI
        </span>
        <Link href={`/profile/orders/${order.id}`}>
          <Button moreStyle="font-[100] px-5 py-1">Detalii</Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col lg:p-5 max-w-[700px] pr-5">
      {mode === "first"
        ? renderOrder(sortedOrders[0]) // Show the latest order
        : sortedOrders.map(renderOrder)}
    </div>
  );
}
