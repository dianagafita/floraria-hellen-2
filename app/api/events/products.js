import prisma from "@/lib/prisma";
import { hasValidImages } from "@/lib/product-images";

function filterWithValidImages(products) {
  return Array.isArray(products) ? products.filter(hasValidImages) : [];
}

export async function getAllEventProducts() {
  const products = await prisma.eventproduct.findMany({
    where: {
      product_type: "lumanari-biserica",
      event_type: "nunta",
    },
  });
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
  return filterWithValidImages(products);
}

export async function getAllCandles() {
  const products = await prisma.eventproduct.findMany({
    where: {
      product_type: "lumanari-biserica",
      event_type: "nunta",
    },
    include: { flowers: true },
  });
  return filterWithValidImages(products);
}

export async function getComponentById(id) {
  const component = await prisma.eventproduct.findUnique({
    where: {
      id: parseInt(id),
    },
    include: { flowers: true },
  });
  if (!component || !hasValidImages(component)) return null;
  return component;
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
