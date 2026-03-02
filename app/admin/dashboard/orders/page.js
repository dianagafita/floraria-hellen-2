import { getAllOrdersComplete } from "@/app/api/store/orders";
import AllOrders from "@/components/admin/all-orders";

export default async function AllProductsPage() {
  const orders = await getAllOrdersComplete();
  return <AllOrders orders={orders} />;
}
