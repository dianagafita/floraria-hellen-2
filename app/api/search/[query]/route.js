import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: params.query,
          mode: "insensitive",
        },
      },
    });
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
