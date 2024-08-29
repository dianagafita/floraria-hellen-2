import { NextResponse } from "next/server";
import { createOrder, getAllOrders } from "@/app/api/store/orders";

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

export async function POST(req) {
  const {
    userId,
    products,
    shippingFee,
    cartTotal,
    senderInfo,
    recipientInfo,
    totalPrice,
    orderState,
  } = await req.json();

  try {
    const order = await createOrder(
      userId,
      products,
      shippingFee,
      cartTotal,
      senderInfo,
      recipientInfo,
      totalPrice,
      orderState
    );

    if (!order) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
