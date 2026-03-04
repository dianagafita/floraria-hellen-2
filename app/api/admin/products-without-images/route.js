import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hasValidImages } from "@/lib/product-images";

export async function GET() {
  try {
    const [products, eventProducts] = await Promise.all([
      prisma.product.findMany({ include: { flowers: true } }),
      prisma.eventproduct.findMany({ include: { flowers: true } }),
    ]);

    const productsWithoutImages = products.filter((p) => !hasValidImages(p));
    const eventProductsWithoutImages = eventProducts.filter(
      (p) => !hasValidImages(p)
    );

    return NextResponse.json({
      products: productsWithoutImages,
      eventProducts: eventProductsWithoutImages,
    });
  } catch (error) {
    console.error("Error fetching products without images:", error);
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: 500 }
    );
  }
}
