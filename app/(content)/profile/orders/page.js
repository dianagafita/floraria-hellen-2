import OrderItem from "@/components/orders/order-item";
import ProfileMenuDrawer from "@/components/profile/profile-menu-drawer";
import Title from "@/components/util/title";
import { verifyAuth } from "@/lib/auth";
import Loading from "@/lib/loading";

export default async function OrdersPage() {
  const { user } = await verifyAuth();

  return (
    <>
      {user && <ProfileMenuDrawer user={user} />}
      <div className="flex items-center  w-full flex-col p-5 min-h-[100vh]">
        <Title moreStyle="my-5">COMENZILE MELE</Title>
        {!user ? <Loading /> : <OrderItem userId={user.id} mode="all" />}
      </div>
    </>
  );
}
