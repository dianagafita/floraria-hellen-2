// /app/api/auth/session/route.js
"use server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createUser } from "@/lib/user";
import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { token } = await req.json();
    const decoded = jwt.verify(token, JWT_SECRET);
    const hashedPassword = hashUserPassword(decoded.password);

    const userId = await createUser(
      decoded.email,
      hashedPassword,
      decoded.firstName,
      decoded.secondName,
      decoded.phone
    );

    await createAuthSession(userId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Token is invalid or has expired" },
      { status: 400 }
    );
  }
}
