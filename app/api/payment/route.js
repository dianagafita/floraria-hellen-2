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

    // Step 1: Create the customer (or fetch if already exists)
    const customer = await stripe.customers.create({
      email: email,
    });

    // Step 2: Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInMinorUnits,
      currency: "ron",
      customer: customer.id,
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
    });

    // Step 3: Listen for payment success
    // This part is just for server-side setup; ensure the client-side handles this too.
    if (paymentIntent.status === "succeeded") {
      // Step 4: Create an invoice item for the payment
      await stripe.invoiceItems.create({
        customer: customer.id,
        amount: amountInMinorUnits,
        currency: "ron",
        description: "Payment for your order",
      });

      // Step 5: Create and send the invoice
      const invoice = await stripe.invoices.create({
        customer: customer.id,
        auto_advance: true, // Automatically finalize the invoice
      });

      console.log("Invoice sent:", invoice.id);
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
