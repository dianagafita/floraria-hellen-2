import { getAllProducts } from "@/app/api/store/products";
import AllProducts from "@/components/admin/all-products";

export default async function AllProductsPage() {
  const products = await getAllProducts();

  return <AllProducts products={products} />;
}
