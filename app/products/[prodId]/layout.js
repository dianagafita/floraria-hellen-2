import Header from "@/components/header/header";
import MobileHeader from "@/components/header/header-mobile";
import CartModal from "@/components/cart/cart-modal";
import "@/app/globals.css";
import MainFooter from "@/components/footer/main-footer";

export const metadata = {
  title: "Floraria Hellen",
  description: "Florarie online cu livrare la domiciuliu.",
  icons: {
    icon: "icon.png",
  },
};

export default function ProductLayout({ children }) {
  return (
    <>
      <div className="flex flex-col">
        <CartModal />
        <Header />
        <main className="relative z-1">{children}</main>
        <MainFooter />
      </div>
      <MobileHeader />
    </>
  );
}
