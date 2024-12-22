import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: params.query,
              mode: "insensitive",
            },
          },
          {
            productId: {
              contains: params.query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    const eventproducts = await prisma.eventproduct.findMany({
      where: {
        OR: [
          {
            name: {
              contains: params.query,
              mode: "insensitive",
            },
          },
          {
            productId: {
              contains: params.query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    const combinedResults = [...products, ...eventproducts];
    return new Response(JSON.stringify(combinedResults), {
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
