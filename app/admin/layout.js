import "@/app/globals.css";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserById } from "../api/store/user";

export const metadata = {
  title: "Admin - Floraria Hellen",
  description: "Florarie online cu livrare la domiciliu",
  icons: {
    icon: "icon.png",
  },
};

export default async function AdminLayout({ children }) {
  const { user } = await verifyAuth();
  const userData = await getUserById(user.id);

  if (!userData.email === "tt1512434@gmail.com") {
    redirect("/");
  }

  return <main>{children}</main>;
}
