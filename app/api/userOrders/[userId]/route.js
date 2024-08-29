import { NextResponse } from "next/server";
import { getAllOrders } from "@/app/api/store/orders";

export async function GET(req, { params }) {
  const { userId } = params;
  if (!userId) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  try {
    const orders = await getAllOrders(parseInt(userId, 10));
    if (!orders) {
      return NextResponse.json({ error: "Orders not found" }, { status: 404 });
    }
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
