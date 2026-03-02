import Header from "@/components/header/header";
import MobileHeader from "@/components/header/header-mobile";
import CartModal from "@/components/cart/cart-modal";
import "@/app/globals.css";
import MainFooter from "@/components/footer/main-footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Floraria Hellen",
  description: "Florarie online cu livrare la domiciliu",
  icons: {
    icon: "icon.png",
  },
};

export default function ContentLayout({ children }) {
  return (
    <>
      <CartModal />
      <Header />
      <ToastContainer />
      <main className="relative z-1 pt-[4.5rem] md:pt-[6.5rem]">{children}</main>
      <MainFooter />
      <MobileHeader />
    </>
  );
}
