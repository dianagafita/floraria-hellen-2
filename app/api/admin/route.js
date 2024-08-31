import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(req) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_SECRET) {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({ role: "admin" })
      .setExpirationTime("1w")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secretKey);

    const res = NextResponse.json({ success: "OK" }, { status: 200 });

    cookies().set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } else {
    return NextResponse.json({ error: "Incorrect password" }, { status: 403 });
  }
}
