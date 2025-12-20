"use server";
import { cookies } from "next/headers";

export const getPrefLangCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("googtrans")?.value ?? "ro";
};
