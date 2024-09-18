import "@/app/globals.css";
import MainFooter from "@/components/footer/main-footer";
import { verifyAuth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/user";
import { redirect } from "next/navigation";
import { getUserById } from "../api/store/user";
import Header from "@/components/header/header";

export const metadata = {
  title: "Floraria Hellen",
  description: "Florarie online cu livrare la domiciliu",
  icons: {
    icon: "icon.png",
  },
};

export default async function RootLayout({ children }) {
  const { user } = await verifyAuth();
  const userData = await getUserById(user.id);

  if (!userData.email === "tt1512434@gmail.com") {
    redirect("/");
  }

  return (
    <html lang="auto">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
