import "@/app/globals.css";
import MainFooter from "@/components/footer/main-footer";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Checkout - Floraria Hellen",
  description: "Florarie online cu livrare la domiciliu",
  icons: {
    icon: "icon.png",
  },
};

export default async function CheckoutLayout({ children }) {
  const { user } = await verifyAuth();

  if (!user) {
    redirect("/authentification");
  }

  return (
    <>
      <main>{children}</main>
      <MainFooter />
    </>
  );
}
