"use client";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import CartExtra from "./cart-extra";

export default function CartPageItems({ items, type, productId }) {
  const { removeFromCart, updateCartItemQuantity } = useCart();

  const handleQuantityChange = (qty) => {
    const quantity = Number(qty);

    if (quantity >= 1) {
      if (type === "extra") {
        updateCartItemQuantity(productId, quantity, true, items.id);
      } else {
        updateCartItemQuantity(items.product.id, quantity, false, null, {
          deliveryCity: items.product.formData?.deliveryCity || "",
          deliveryDate: items.product.formData?.deliveryDate || "",
          deliveryInterval: items.product.formData?.deliveryInterval || "",
        });
      }
    }
  };

  const handleRemoveClick = () => {
    if (type === "extra") {
      removeFromCart(productId, {}, true, items.id);
    } else {
      removeFromCart(items.product.id, {
        deliveryCity: items.product.formData?.deliveryCity || "",
        deliveryDate: items.product.formData?.deliveryDate || "",
        deliveryInterval: items.product.formData?.deliveryInterval || "",
      });
    }
  };

  return (
    <div className="flex w-full mb-10 lg:mb-20">
      <div className="min-w-[105px] max-w-[120px] mr-8">
        {type === "extra" ? (
          <Image
            src={items.image}
            width={100}
            height={100}
            alt={items.name}
            layout="responsive"
            className="object-contain"
          />
        ) : (
          <Link href={`/products/${items.product.id}`}>
            <Image
              src={items.product.images_url[0]}
              width={100}
              height={100}
              alt={items.product.name}
              layout="responsive"
              className="object-contain"
            />
          </Link>
        )}
      </div>

      <div className="flex flex-col w-full">
        <div className="flex flex-col justify-between w-full h-full">
          <div>
            <div className="font-[300] mb-1">
              {type === "extra" ? items.name : items.product.name}
            </div>
            {type !== "extra" && (
              <div>
                <CartExtra extraInfo={items} />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-2 w-full">
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center space-x-2 border border-gray-300 rounded-sm font-[100] px-1 text-sm">
                <button
                  onClick={() => {
                    handleQuantityChange(items.quantity - 1);
                  }}
                  className="p-1"
                  aria-label="Decrease quantity"
                >
                  <Minus size={20} strokeWidth={1} />
                </button>
                <span className="text-m">{items.quantity}</span>
                <button
                  onClick={() => {
                    handleQuantityChange(items.quantity + 1);
                  }}
                  className="p-1"
                  aria-label="Increase quantity"
                >
                  <Plus size={20} strokeWidth={1} />
                </button>
              </div>
            </div>

            <span className="text-m font-[100] whitespace-nowrap md:w-full">
              {(type === "extra"
                ? items.price * items.quantity
                : items.product.price * items.quantity
              ).toFixed(2)}{" "}
              Lei
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
