"use server";

import { uploadImages } from "@/lib/claudinary";
import prisma from "@/lib/prisma";

export async function addProduct(prevState, formData) {
  const productName = formData.get("productName");
  const productType = formData.get("productType");
  const productSubtype = formData.get("productSubtype");
  const productFlowerType = formData.get("productFlowerType");
  const productPrice = formData.get("productPrice");
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
    imageUrls = await uploadImages(images, productFlowerType);
  } catch (error) {
    throw new Error(
      "Image upload failed, product was not created. Please try again later."
    );
  }

  await prisma.product.create({
    data: {
      name: productName,
      product_type: productType,
      product_subtype: productSubtype,
      flowers_type: productFlowerType,
      images_url: imageUrls,
      price: parseFloat(productPrice),
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  return { status: "success" };
}

export async function updateProduct(prevState, formData) {
  const id = formData.get("id");
  const productName = formData.get("productName");
  const productType = formData.get("productType");
  const productSubtype = formData.get("productSubtype");
  const productFlowerType = formData.get("productFlowerType");
  const productPrice = formData.get("productPrice");
  const images = formData.getAll("productImages");

  console.log(productPrice);
  const existingProduct = await prisma.product.findUnique({
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

  if (productSubtype !== existingProduct.product_subtype) {
    updatedData.product_subtype = productSubtype;
  }

  if (productFlowerType !== existingProduct.flowers_type) {
    updatedData.flowers_type = productFlowerType;
  }

  if (parseFloat(productPrice) !== existingProduct.price) {
    updatedData.price = parseFloat(productPrice);
  }

  let imageUrls = existingProduct.images_url;

  if (images.length > 0 && images[0].size > 0) {
    try {
      const newImageUrls = await uploadImages(images, productFlowerType);
      imageUrls = [...imageUrls, ...newImageUrls];
      updatedData.images_url = imageUrls;
    } catch (error) {
      return { errors: ["Image upload failed. Please try again later."] };
    }
  }

  console.log("UPD", updatedData);

  await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      ...updatedData,
      updated_at: new Date(),
    },
  });

  return { status: "success" };
}

// products.js
