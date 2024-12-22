// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export function convertToSubcurrency(amount, factor) {
//   return Math.round(amount * factor);
// }

// export async function POST(req) {
//   try {
//     const { amount, email } = await req.json();

//     if (!amount || isNaN(amount)) {
//       throw new Error("Valoarea nu e corecta.");
//     }

//     const amountInMinorUnits = convertToSubcurrency(parseFloat(amount), 100);

//     if (amountInMinorUnits < 200) {
//       throw new Error("Valoarea minima este de 2.00 RON.");
//     }

//     // Step 1: Create the customer if it doesn't exist
//     const customer = await stripe.customers.create({
//       email: email,
//     });

//     // Step 2: Create the payment intent for the customer
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amountInMinorUnits,
//       currency: "ron",
//       customer: customer.id,
//       receipt_email: email,
//       automatic_payment_methods: { enabled: true },
//     });

//     // Step 3: Create an invoice item
//     await stripe.invoiceItems.create({
//       customer: customer.id,
//       amount: amountInMinorUnits,
//       currency: "ron",
//       description: "Payment for your order",
//     });

//     // Step 4: Create the invoice
//     const invoice = await stripe.invoices.create({
//       customer: customer.id,
//       auto_advance: true, // Automatically finalize the invoice
//     });

//     // Step 5: Finalize the invoice
//     const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

//     // Step 6: Send the invoice email
//     await stripe.invoices.sendInvoice(invoice.id);

//     return NextResponse.json(
//       { clientSecret: paymentIntent.client_secret },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error creating payment intent:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
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
      email: email,
    });

    // Step 2: Create an invoice item
    await stripe.invoiceItems.create({
      customer: customer.id,
      amount: amountInMinorUnits,
      currency: "ron",
      description: "Payment for your order",
    });

    // Step 3: Create the invoice with `send_invoice` collection method
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice", // Set to send invoice manually
      days_until_due: 7, // Optional: Specify payment due date
    });

    // Step 4: Send the invoice email
    await stripe.invoices.sendInvoice(invoice.id);

    return NextResponse.json(
      { message: "Invoice sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
