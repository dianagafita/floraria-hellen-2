import CartPageItems from "@/components/cart/cart-page-items";

export default function CartWithExtras({ items, productId }) {
  return (
    <>
      <CartPageItems items={items} type="main" />
      {items.product.extras &&
        items.product.extras.map((extraItem, index) => (
          <CartPageItems
            key={index}
            productId={productId}
            items={extraItem}
            type="extra"
          />
        ))}
    </>
  );
}
