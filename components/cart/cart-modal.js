"use client";
import { motion } from "framer-motion";
import { useCart } from "@/context/cart-context";
import classes from "./cart.module.css";
import { X } from "lucide-react";
import CartCard from "./cart-card";
import CartSummary from "./cart-summary";
import { PiBagThin } from "react-icons/pi";
import { cartModalVariants } from "@/styles/motion-variants";

export default function CartModal() {
  const { cartItems, isCartOpen, toogleOpenCart, cartTotal } = useCart();
  const nrArt = cartItems.reduce(
    (total, item) =>
      total + item.quantity + (item.extras ? item.extras.length : 0),
    0
  );

  return (
    <>
      {isCartOpen && (
        <div className={classes.backdrop2} onClick={toogleOpenCart} />
      )}
      <motion.div
        initial={false}
        animate={isCartOpen ? "open" : "closed"}
        variants={cartModalVariants}
        className={classes.cartContainer}
      >
        <div className="flex flex-col h-full overflow-auto">
          <div className="flex justify-between px-4 py-4 bg-white text-black mb-5 border-b border-[#f5f5f5]">
            <PiBagThin size={20} />{" "}
            <span className="font-[400] text-[15px]">COS DE CUMPARATURI</span>
            <button onClick={toogleOpenCart}>
              <X strokeWidth={0.8} size={24} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex justify-center items-center h-full text-[16px] text-[#C0C0C0]">
              Cosul de cumparaturi este gol!
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index}>
                {/* Render CartCard for the main product */}
                <CartCard item={item} />

                {item.product.extras && item.product.extras.length > 0 && (
                  <div>
                    {item.product.extras.map((extraItem) => (
                      <CartCard
                        key={extraItem.id}
                        item={extraItem}
                        productId={item.product.id}
                        type="extra"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <CartSummary
          toogleOpenCart={toogleOpenCart}
          cartTotal={cartTotal}
          cartItems={nrArt}
        />
      </motion.div>
    </>
  );
}
