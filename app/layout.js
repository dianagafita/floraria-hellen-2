import { CartProvider } from "@/context/cart-context";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { Cormorant_Garamond, Roboto, Alegreya_Sans } from "next/font/google";
import localFont from "next/font/local";

// Google Fonts with preload
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
  preload: true,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-roboto",
  preload: true,
});

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-alegreya",
  preload: true,
});

// Local fonts with preload
const caravan = localFont({
  src: "../assets/Caravan.otf",
  display: "swap",
  variable: "--font-caravan",
  preload: true,
});

const cormorantLocal = localFont({
  src: "../assets/CormorantGaramond-Light.ttf",
  display: "swap",
  variable: "--font-cormorant-local",
  preload: true,
});

export const metadata = {
  title: "Floraria Hellen",
  description: "Florarie online - buchete, aranjamente florale si decoratiuni pentru evenimente",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ro"
      className={`${cormorantGaramond.variable} ${roboto.variable} ${alegreyaSans.variable} ${caravan.variable} ${cormorantLocal.variable}`}
    >
      <head>
        {/* Preload critical images */}
        <link
          rel="preload"
          as="image"
          href="/_next/static/media/craciunmain.22d0caf2.jpeg"
        />
      </head>
      <body className={roboto.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <GoogleTagManager gtmId="GTM-KGVW7QXH" />
            <Analytics />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
