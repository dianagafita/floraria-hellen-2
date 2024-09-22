"use server";

import { uploadImages } from "@/lib/claudinary";
import prisma from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};

export async function addEventProduct(prevState, formData) {
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
    return { errors };
  }

  let imageUrls = [];

  try {
    imageUrls = await uploadImages(images, productEventType, "event");
  } catch (error) {
    throw new Error(
      "Image upload failed, product was not created. Please try again later."
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

  return { status: "success" };
}

export async function updateEventProduct(prevState, formData) {
  const id = formData.get("id");
  const productName = formData.get("productName");
  const productType = formData.get("productType");
  const productId = formData.get("productId");
  const productEventType = formData.get("productEventType");
  const images = formData.getAll("productImages");

  const existingProduct = await prisma.eventproduct.findUnique({
    where: { id: parseInt(id) },
  });
  console.log(existingProduct);
  if (!existingProduct) {
    return { errors: ["Product not found."] };
  }

  let errors = [];

  if (productName.trim().length === 0) {
    errors.push("Title is required.");
  }

  if (productType.trim().length === 0) {
    errors.push("Type is required.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let updatedData = {};

  if (productName !== existingProduct.name) {
    updatedData.name = productName;
  }

  if (productType !== existingProduct.product_type) {
    updatedData.product_type = productType;
  }

  if (productEventType !== existingProduct.event_type) {
    updatedData.event_type = productEventType;
  }

  if (productId !== existingProduct.productId) {
    updatedData.productId = productId;
  }

  let imageUrls = existingProduct.images_url;

  if (images.length > 0 && images[0]?.size > 0) {
    try {
      const newImageUrls = await uploadImages(images, productEventType);
      imageUrls = [...imageUrls, ...newImageUrls];
      updatedData.images_url = imageUrls;
    } catch (error) {
      return { errors: ["Image upload failed. Please try again later."] };
    }
  }

  console.log("UPD", updatedData);

  await prisma.eventproduct.update({
    where: { id: parseInt(id) },
    data: {
      ...updatedData,
      updated_at: new Date(),
    },
  });

  return { status: "success" };
}

// products.js
