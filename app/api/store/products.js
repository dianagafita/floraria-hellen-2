import prisma from "@/lib/prisma";

export async function getAllProducts() {
  const products = await prisma.product.findMany();
  return products;
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
