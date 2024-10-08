import { uploadImages } from "@/lib/claudinary";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData(); // Use req.formData() to get the FormData

  const productName = formData.get("productName");
  const productType = formData.get("productType");
  const productSubtype = formData.get("productSubtype");
  const productFlowerType = formData.get("productFlowerType");
  const productPrice = formData.get("productPrice");
  const images = formData.getAll("productImages");
  const flowers = JSON.parse(formData.get("flowers"));
  const productId = formData.get("productId");

  let errors = [];

  if (!productName || productName.trim().length === 0) {
    errors.push("Title is required.");
  }

  if (!productType || productType.trim().length === 0) {
    errors.push("Content is required.");
  }

  if (images.length === 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrls = [];

  try {
    imageUrls = await uploadImages(images, productFlowerType);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Image upload failed, product was not created. Please try again later.",
      },
      { status: 500 }
    );
  }

  const product = await prisma.product.create({
    data: {
      name: productName,
      productId,
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
  return NextResponse.json({ status: 200 });
}

export async function PUT(req) {
  const formData = await req.formData(); // Use req.formData() to get the FormData

  const id = formData.get("id");
  const productId = formData.get("productId");
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

  if (productName !== existingProduct.name) {
    updatedData.name = productName;
  }

  if (productId !== existingProduct.productId) {
    updatedData.productId = productId;
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
      return NextResponse.json(
        {
          error:
            "Image upload failed, product was not created. Please try again later.",
        },
        { status: 500 }
      );
    }
  }

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

  return NextResponse.json({ status: 200 });
}
