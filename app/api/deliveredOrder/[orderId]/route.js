import OrderDeliveredEmail from "@/components/emailTemplates/order-delivered";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { delay } from "../../orders/[orderId]/route";
import StoreDeliveredEmail from "@/components/emailTemplates/store-delivered-email";

export async function PUT(req, { params }) {
  const { orderId } = params;
  console.log("AAA");
  console.log(orderId);
  try {
    const order = await prisma.order.update({
      where: {
        id: parseInt(orderId),
      },
      data: { order_state: "delivered" },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const orderReceipt = await prisma.order.findUnique({
      where: {
        id: parseInt(orderId),
      },
      include: {
        order_items: {
          include: {
            product: {
              include: {
                flowers: true,
              },
            },
            extras: true, // Include extras for each order item
          },
        },
      },
    });
    const resendClient = new Resend(process.env.RESEND_API_KEY);
    console.log("Livrata...");
    const userEmailResponse = await resendClient.emails.send({
      from: "Floraria Hellen  <florariahellen@hellenproparty.ro>",
      to: [orderReceipt.sender_info.personSendingEmail],
      subject: `Comanda ${orderId} livrata`,
      react: OrderDeliveredEmail({ order: orderReceipt, firstName: "Jhon" }),
    });
    console.log("Livrata email response:", userEmailResponse);
    await delay(2000); // Delay for 1 second

    const storeEmailResponse = await resendClient.emails.send({
      from: "Floraria Hellen  <florariahellen@hellenproparty.ro>",
      to: ["proparty10@gmail.com"],
      subject: `COMANDA ${orderId} `,
      react: StoreDeliveredEmail({ order: orderReceipt, firstName: "ana" }),
    });
    console.log("Store email response:", storeEmailResponse);

    console.log("Store notification email sent!");

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error updating order or sending email:", error);
    return NextResponse.json(
      { error: "Failed to update order or send email" },
      { status: 500 }
    );
  }
}
