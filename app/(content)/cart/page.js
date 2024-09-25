"use client";
import Title from "@/components/util/title";
import Link from "next/link";
import Button from "@/components/util/button";
import { useCart } from "@/context/cart-context";
import CartWithExtras from "./cart-with-extras";

export default function CartPage() {
  const { cartItems, cartTotal } = useCart();
  return (
    <div className="mx-5 my-[2rem] mb-5 min-h-[80vh] ">
      <div className="flex flex-col justify-between h-full min-h-[80vh]">
        <Title>COS DE CUMPARATURI</Title>
        {cartItems.length === 0 ? (
          <div className="flex justify-center  m-auto items-center h-full text-[20px] font-[100] text-[#C0C0C0]">
            Cosul de cumparaturi este gol!
          </div>
        ) : (
          <div className="min-h-[70vh] flex flex-col lg:flex-row justify-between w-full h-full mt-[4rem]">
            <div className="w-full lg:mr-60">
              {cartItems.map((item) => (
                <CartWithExtras
                  key={item.product.id}
                  productId={item.product.id}
                  items={item}
                />
              ))}
            </div>
            <div className="flex flex-col font-[300] w-full self-end lg:self-start  md:w-1/2 mt-10 md:mt-0">
              <div className="flex justify-between text-lg mb-1">
                <span className="font-[500]">Subtotal</span>
                <span translate="no">{cartTotal} Lei</span>
              </div>
              <span className="text-xs mb-2">
                Taxele de transport sunt calculate la pasul urmator
              </span>
              <Link href="/checkout" className="">
                <Button
                  type="button"
                  moreStyle="w-full my-5 py-2 border-[0.6px]"
                >
                  Finalizare Comanda{" "}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
