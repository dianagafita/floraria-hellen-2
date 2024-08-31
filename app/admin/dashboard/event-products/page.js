import { getAllEventProducts } from "@/app/api/events/products";
import AllProducts from "@/components/admin/all-products";

export default async function AllEventProductsPage() {
  const products = await getAllEventProducts();

  return <AllProducts products={products} type="event" />;
}
