import Link from "next/link";
import Button from "../util/button";

export default function CartSummary({ toogleOpenCart, cartTotal, cartItems }) {
  return (
    <div className="flex flex-col p-4  shadow-top mb-2 ">
      <div className="flex justify-between mb-1">
        <span className="font-[300] text-[11px]">SUMAR COS</span>
        <span className=" font-[300] text-[11px]">
          {cartItems} {cartItems === 1 ? "articol" : "articole"}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span>SUBTOTAL:</span>
        <span className="mb-4">{cartTotal} lei</span>
      </div>
      <Link
        href="/checkout"
        onClick={toogleOpenCart}
        className="text-sm font-[300]  p-2 text-center "
      >
        <Button moreStyle="w-full mb-2">FINALIZARE COMANDA</Button>
      </Link>
      <Link
        onClick={toogleOpenCart}
        href="/cart"
        className="self-center font-[300]  "
      >
        <Button moreStyle=" px-5 text-sm">Vezi detalii cos...</Button>
      </Link>
    </div>
  );
}
