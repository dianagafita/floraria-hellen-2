"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import OrderSummary from "../orders/orderSummary";
import { useCart } from "@/context/cart-context";

export default function CheckoutSummary({
  toggleOrderSummary,
  isOrderSummaryOpen,
  shippingFee,
  cartItems,
  cartTotal,
}) {
  return (
    <div className="lg:hidden w-full shadow-lg">
      <div className={`bg-[rgba(0,0,0,0.03)] top-[10.5rem] border  `}>
        <button
          type="button"
          onClick={toggleOrderSummary}
          className="flex w-full p-2.5 border-b"
        >
          <div className="flex justify-between w-full mx-6 my-1">
            <span className="flex font-bold mr-5 items-center">
              <span className="font-[500]">Rezumatul comenzii</span>
            </span>
            {isOrderSummaryOpen ? (
              <ChevronUp size={23} strokeWidth={1} />
            ) : (
              <ChevronDown size={23} strokeWidth={1} />
            )}
          </div>
        </button>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isOrderSummaryOpen ? "auto" : 0 }}
          transition={{ type: "spring", stiffness: 1000, damping: 50 }}
          className="overflow-hidden"
        >
          <div className="px-2 m-6">
            <OrderSummary
              shippingFee={shippingFee}
              cartItems={cartItems}
              cartTotal={cartTotal}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
