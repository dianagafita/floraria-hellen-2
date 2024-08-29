import React from "react";
import CartWithExtras from "@/app/(content)/cart/cart-with-extras";

export default function OrderSummary({ shippingFee, cartItems, cartTotal }) {
  return (
    <div>
      <div className="mt-5 border-b border-[#cdcdcb] pb-5">
        {cartItems.map((item) => (
          <CartWithExtras
            productId={item.product.id}
            key={item.product.id}
            items={item}
          />
        ))}
      </div>

      <div className="flex flex-col font-[300] self-end mt-5">
        <div className="flex justify-between text-lg mb-1 text-sm">
          <span className="font-[300]">Subtotal</span>
          <span>{cartTotal} lei</span>
        </div>
        <div className="flex justify-between text-lg mb-2 pb-5 text-sm border-b border-[#cdcdcb]">
          <span className="font-[300]">Livrare</span>
          <span>{shippingFee} lei</span>
        </div>
      </div>
      <div className="flex justify-between text-lg mb-1">
        <span className="font-[500]">Total</span>
        <span>{cartTotal + shippingFee} lei</span>
      </div>
    </div>
  );
}
