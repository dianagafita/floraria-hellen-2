"use client";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function CartExtraPageItem({ extraItems, productId }) {
  const { updateCartItemQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (qty) => {
    const quantity = Number(qty);
    if (quantity >= 1) {
      updateCartItemQuantity(productId, quantity, true, extraItems.id);
    }
  };

  const handleRemoveClick = () => {
    removeFromCart(productId, true, extraItems.id);
  };

  return (
    <div className="flex w-full mb-10 lg:mb-20 ">
      <div className="min-w-[105px] max-w-[120px] mr-8">
        <Image
          src={extraItems.image}
          width={100}
          height={100}
          alt={extraItems.name}
          layout="responsive"
          className="object-contain"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col justify-between w-full h-full">
          <div>
            {" "}
            <div className="font-[300] mb-1">{extraItems.name}</div>
            <div className="font-[300] mb-1">{extraItems.name}</div>
          </div>
          <div className="flex items-center justify-between mb-2 w-full">
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center space-x-2 border border-gray-300 rounded-sm font-[100] px-1 text-sm">
                <button
                  onClick={() => {
                    handleQuantityChange(extraItems.quantity - 1);
                  }}
                  className="p-1"
                  aria-label="Decrease quantity"
                >
                  <Minus size={20} strokeWidth={1} />
                </button>
                <span className="text-m">{extraItems.quantity}</span>
                <button
                  onClick={() => {
                    handleQuantityChange(extraItems.quantity + 1);
                  }}
                  className="p-1"
                  aria-label="Increase quantity"
                >
                  <Plus size={20} strokeWidth={1} />
                </button>
              </div>
            </div>
            <span className="text-m font-[100] whitespace-nowrap md:w-full">
              {(extraItems.price * extraItems.quantity).toFixed(2)} Lei
            </span>
          </div>
          <button
            className="font-[100] text-[10px] text-start"
            onClick={handleRemoveClick}
          >
            STERGE
          </button>
        </div>
      </div>
    </div>
  );
}
