import { redirect } from "next/navigation";
import AuthForm from "./auth _form";
import { verifyAuth } from "@/lib/auth";

export default async function AuthFormPage({ searchParams }) {
  const formMode = searchParams.mode || "login";
  const { user } = await verifyAuth();
  if (user) {
    redirect("/profile");
  }
  return <AuthForm mode={formMode} />;
}
