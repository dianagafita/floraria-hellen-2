import "@/app/globals.css";
import MainFooter from "@/components/footer/main-footer";

export const metadata = {
  title: "Checkout - Floraria Hellen",
  description: "Florarie online cu livrare la domiciliu",
  icons: {
    icon: "icon.png",
  },
};

export default function CheckoutLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <MainFooter />
    </>
  );
}
