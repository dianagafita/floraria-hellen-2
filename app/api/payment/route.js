import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export function convertToSubcurrency(amount, factor) {
  return Math.round(amount * factor);
}

export async function POST(req) {
  try {
    const { amount, email } = await req.json();

    if (!amount || isNaN(amount)) {
      throw new Error("Valoarea nu e corecta.");
    }

    const amountInMinorUnits = convertToSubcurrency(parseFloat(amount), 100);

    if (amountInMinorUnits < 200) {
      throw new Error("Valoarea minima este de 2.00 RON.");
    }

    // Step 1: Create the customer if it doesn't exist
    const customer = await stripe.customers.create({
      email: email, // Email passed from the frontend
    });

    // Step 2: Create the payment intent for the customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInMinorUnits,
      currency: "ron",
      customer: customer.id, // Use the newly created customer ID
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
    });

    // Step 3: Create an invoice item
    const invoiceItem = await stripe.invoiceItems.create({
      customer: customer.id, // Use the customer ID here
      amount: amountInMinorUnits,
      currency: "ron",
      description: "Payment for your order",
    });

    // Step 4: Create the invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: true, // Automatically finalize the invoice
    });

    // Step 5: Finalize the invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    // Step 6: Check invoice status to ensure it's sent
    if (finalizedInvoice.status === "paid") {
      console.log("Invoice has been paid and email sent");
    } else {
      console.log("Invoice was not paid or email was not sent");
    }

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
