import Header from "@/components/header/header";
import MobileHeader from "@/components/header/header-mobile";
import CartModal from "@/components/cart/cart-modal";
import "@/app/globals.css";
import MainFooter from "@/components/footer/main-footer";
import { CartProvider } from "@/context/cart-context";

export const metadata = {
  title: "Floraria Hellen",
  description: "Florarie online cu livrare la domiciuliu.",
  icons: {
    icon: "icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className="relative">
        <div className="flex flex-col">
          <CartProvider>
            <CartModal />
            <Header /> <main className="relative z-1 ">{children}</main>
          </CartProvider>
          <MainFooter />
        </div>
        <MobileHeader />
      </body>
    </html>
  );
}
