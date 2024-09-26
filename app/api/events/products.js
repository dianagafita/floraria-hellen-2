import prisma from "@/lib/prisma";

export async function getAllEventProducts() {
  const products = await prisma.eventproduct.findMany();
  return products;
}

export async function getComponentByType({ type, event }) {
  console.log(type);
  const products = await prisma.eventproduct.findMany({
    where: {
      product_type: type,
      event_type: event,
    },
    include: { flowers: true },
  });
  return products;
}

export async function getCandles() {
  const products = await prisma.eventproduct.findMany({
    where: {
      product_type: "lumanari-biserica",
      event_type: "nunta",
    },
    include: { flowers: true },
  });
  return products;
}

export async function getComponentById(id) {
  const products = await prisma.eventproduct.findUnique({
    where: {
      id: parseInt(id),
    },
    include: { flowers: true },
  });
  console.log(products);
  return products;
}

export async function getSearchedComponent(searchParam) {
  const products = await prisma.eventproduct.findUnique({
    where: {
      title: {
        contains: searchParam,
      },
    },
  });
  return products;
}
