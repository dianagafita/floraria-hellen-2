import prisma from "@/lib/prisma";

export async function getAllProducts() {
  const products = await prisma.product.findMany();
  return products;
}

export async function updateProduct(
  id,
  name,
  product_type,
  product_subtype,
  flowers_type,
  price,
  images_url,
  created_at,
  updated_at
) {
  const products = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      product_type,
      price,
      product_subtype,
      flowers_type,
      images_url,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  return products;
}
export async function deleteProduct(id) {
  await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });
}

export async function getProductsByType({ type }) {
  console.log(type);
  const products = await prisma.product.findMany({
    where: {
      product_type: type,
    },
    include: { flowers: true },
  });
  return products;
}

export async function getProductsBySubType({ type, subtype }) {
  const products = await prisma.product.findMany({
    where: {
      product_type: type,
      product_subtype: subtype,
    },
    include: { flowers: true },
  });
  return products;
}

export async function getProductById(id) {
  const products = await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: { flowers: true },
  });
  return products;
}

export async function getSearchedProducts(searchParam) {
  const products = await prisma.product.findUnique({
    where: {
      title: {
        contains: searchParam,
      },
    },
  });
  return products;
}
