export async function POST(req) {
  try {
    const { amount, email, products } = await req.json();

    if (!amount || isNaN(amount)) {
      throw new Error("Invalid amount provided.");
    }

    if (!email) {
      throw new Error("Email is required.");
    }

    if (!products || !Array.isArray(products)) {
      throw new Error("Invalid or missing products array.");
    }

    const amountInMinorUnits = convertToSubcurrency(parseFloat(amount), 100);
    if (amountInMinorUnits < 200) {
      throw new Error("The minimum amount is 2.00 RON.");
    }

    // Rest of the code...
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
