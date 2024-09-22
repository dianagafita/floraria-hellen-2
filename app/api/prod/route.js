import { uploadImages } from "@/lib/claudinary";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle streaming
  },
};

export async function POST(req) {
  const formData = await req.formData(); // Use req.formData() to get the FormData
  const productName = formData.get("productName");
  const productType = formData.get("productType");
  const productId = formData.get("productId");
  const productEventType = formData.get("productEventType");
  const images = formData.getAll("productImages");

  let errors = [];

  if (!productName || productName.trim().length === 0) {
    errors.push("Title is required.");
  }

  if (!productType || productType.trim().length === 0) {
    errors.push("Content is required.");
  }

  if (images.length === 0) {
    errors.push("At least one image is required.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  let imageUrls = [];

  try {
    imageUrls = await uploadImages(images, productEventType, "event");
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Image upload failed, product was not created. Please try again later.",
      },
      { status: 500 }
    );
  }

  await prisma.eventproduct.create({
    data: {
      name: productName,
      product_type: productType,
      event_type: productEventType,
      images_url: imageUrls,
      productId: productId,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  return NextResponse.json({ status: 200 });
}
