import { getAllUsers } from "@/app/api/store/user";
import AllUsers from "@/components/admin/all-users";

export default async function AllProductsPage() {
  const users = await getAllUsers();

  return <AllUsers users={users} />;
}
