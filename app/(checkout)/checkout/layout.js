import "@/app/globals.css";
import MainFooter from "@/components/footer/main-footer";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Floraria Hellen",
  description: "Florarie online cu livrare la domiciliu",
  icons: {
    icon: "icon.png",
  },
};

export default async function RootLayout({ children }) {
  const { user } = await verifyAuth();

  if (!user) {
    redirect("/authentification");
  }

  return (
    <html lang="ro">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body>
        <main>{children}</main>
        <MainFooter />
      </body>
    </html>
  );
}
