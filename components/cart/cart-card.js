"use client";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { Minus, Plus } from "lucide-react";

export default function CartCard({ item, type, productId }) {
  const { removeFromCart, updateCartItemQuantity } = useCart();

  const handleQuantityChange = (qty) => {
    const quantity = Number(qty);

    if (quantity >= 1) {
      if (type === "extra") {
        updateCartItemQuantity(productId, quantity, true, item.id);
      } else {
        updateCartItemQuantity(item.product.id, quantity, false, null, {
          deliveryCity: item.product.formData?.deliveryCity || "",
          deliveryDate: item.product.formData?.deliveryDate || "",
          deliveryInterval: item.product.formData?.deliveryInterval || "",
        });
      }
    }
  };

  const handleRemoveClick = () => {
    if (type === "extra") {
      removeFromCart(productId, {}, true, item.id);
    } else {
      removeFromCart(item.product.id, {
        deliveryCity: item.product.formData?.deliveryCity || "",
        deliveryDate: item.product.formData?.deliveryDate || "",
        deliveryInterval: item.product.formData?.deliveryInterval || "",
      });
    }
  };

  return (
    <div className="flex border-b items-start p-3 mx-1 h-[140px]">
      <div className="h-[5rem] w-[100px] content-center">
        {type === "extra" ? (
          <Image
            src={item.image}
            width={100}
            height={100}
            alt={item.name}
            layout="responsive"
            className="object-contain"
          />
        ) : (
          <Image
            src={item.product.images_url[0]}
            width={100}
            height={100}
            alt={item.product.name}
            layout="responsive"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex w-full flex-col ml-4">
        <span className="text-sm font-[300] mb-1">
          {type === "extra" ? item.name : item.product.name}
        </span>
        <button className="xxsFont mb-4 text-start" onClick={handleRemoveClick}>
          STERGE
        </button>
        <div className="flex items-end mt-8"></div>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center space-x-2 border border-gray-300 rounded-sm font-[100] px-1 text-sm">
            <button
              onClick={() => {
                handleQuantityChange(item.quantity - 1);
              }}
              className="p-1 "
              aria-label="Decrease quantity"
            >
              <Minus size={20} strokeWidth={1} />
            </button>
            <span className="text-m">{item.quantity}</span>
            <button
              onClick={() => {
                handleQuantityChange(item.quantity + 1);
              }}
              className="p-1 "
              aria-label="Increase quantity"
            >
              <Plus size={20} strokeWidth={1} />
            </button>
          </div>
          <span className="text-m font-[300] ml-5">
            {(type === "extra"
              ? item.price * item.quantity
              : item.product.price * item.quantity
            ).toFixed(2)}{" "}
            <sup>.00</sup>
            <sup> LEI</sup>
          </span>
        </div>
      </div>
    </div>
  );
}
