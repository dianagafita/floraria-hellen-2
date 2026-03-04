import { NextResponse } from "next/server";
import { getProductById } from "../../store/products";
import { hasValidImages } from "@/lib/product-images";

export async function GET(req, { params }) {
  const { prodId } = await params;
  try {
    const product = await getProductById(parseInt(prodId));
    if (!product || !hasValidImages(product)) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
