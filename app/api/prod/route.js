import { uploadImages } from "@/lib/claudinary";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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

export async function PUT(req) {
  const formData = await req.formData(); // Get the form data from the request

  const id = formData.get("id");
  const productName = formData.get("productName");
  const productType = formData.get("productType");
  const productEventType = formData.get("productEventType");
  const images = formData.getAll("productImages");
  console.log(images);

  const existingProduct = await prisma.eventproduct.findUnique({
    where: { id: parseInt(id) },
  });

  if (!existingProduct) {
    return { errors: ["Product not found."] };
  }

  const errors = [];

  if (!productName || productName.trim().length === 0) {
    errors.push("Product name is required.");
  }

  if (!productType || productType.trim().length === 0) {
    errors.push("Product type is required.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  let updatedData = {};

  // Check for changes in each field
  if (productName !== existingProduct.name) {
    updatedData.name = productName;
  }

  if (productType !== existingProduct.product_type) {
    updatedData.product_type = productType;
  }

  if (productEventType !== existingProduct.event_type) {
    updatedData.event_type = productEventType;
  }

  let imageUrls = existingProduct.images_url;

  // Handle image uploads if new images are provided
  if (images.length > 0 && images[0].size > 0) {
    try {
      const newImageUrls = await uploadImages(images, productEventType);
      console.log(newImageUrls);
      // Ensure no duplicate images by using Set
      imageUrls = [...new Set([...imageUrls, ...newImageUrls])]; // Remove duplicates
      updatedData.images_url = imageUrls;
    } catch (error) {
      return NextResponse.json(
        {
          error:
            "Image upload failed, product was not created. Please try again later.",
        },
        { status: 500 }
      );
    }
  }

  await prisma.eventproduct.update({
    where: { id: parseInt(id) },
    data: {
      ...updatedData,
      updated_at: new Date(),
    },
  });

  return NextResponse.json({ status: 200 });
}
