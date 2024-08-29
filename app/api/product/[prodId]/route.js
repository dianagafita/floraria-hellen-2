import { NextResponse } from "next/server";
import { getProductById } from "../../store/products";

export async function GET(req, { params }) {
  try {
    const user = await getProductById(parseInt(params.prodId));
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
