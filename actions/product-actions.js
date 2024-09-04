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
  const flowers = JSON.parse(formData.get("flowers"));

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

  const product = await prisma.product.create({
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

  const validFlowers = flowers.filter(
    (flower) => flower.flowerName.trim() !== "" && flower.quantity.trim() !== ""
  );

  console.log(validFlowers);

  if (validFlowers.length > 0) {
    for (const flower of flowers) {
      await prisma.flower.create({
        data: {
          quantity: parseInt(flower.quantity),
          flower: flower.flowerName,
          productId: product.id,
        },
      });
    }
  }
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

  const flowers = JSON.parse(formData.get("flowers"));

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
  console.log(flowers);
  if (flowers && flowers.length > 0) {
    await prisma.flower.deleteMany({ where: { productId: parseInt(id) } });

    for (const flower of flowers) {
      await prisma.flower.create({
        data: {
          quantity: parseInt(flower.quantity),
          flower: flower.flowerName,
          productId: parseInt(id),
        },
      });
    }
  }

  return { status: "success" };
}
