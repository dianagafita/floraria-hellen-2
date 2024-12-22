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

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInMinorUnits,
      currency: "ron",
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
