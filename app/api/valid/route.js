import { verifyAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { user, session } = await verifyAuth();
    if (!user || !session) {
      return NextResponse.json({ message: "Unauthorized" });
    }
    return NextResponse.json({ userId: user.id }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
