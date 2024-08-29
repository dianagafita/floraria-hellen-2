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

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,900"
        />

        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className="relative">
        <CartModal />
        <Header /> <ToastContainer />
        <main className="relative z-1 "> {children}</main>
        <MainFooter />
        <MobileHeader />
      </body>
    </html>
  );
}
