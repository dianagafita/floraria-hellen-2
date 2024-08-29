// /app/api/auth/session/route.js
"use server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "@/lib/user"; // Assuming findUserByEmail is implemented
import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { token } = await req.json();
    const decoded = jwt.verify(token, JWT_SECRET);
    const emailExists = await getUserByEmail(decoded.email); // Check if email exists
    console.log("AAAA", emailExists);

    if (emailExists) {
      return NextResponse.json(
        { error: "Emailul exista deja" },
        { status: 409 }
      );
    }

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
    redirect("/");
  }
}
