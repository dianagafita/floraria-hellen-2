// lib/cart.js
import prisma from "./prisma";

export async function getCart(userId) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });
  return cart ? cart.items : [];
}

export async function saveCart(userId, items) {
  const existingCart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (existingCart) {
    await prisma.cart.update({
      where: { userId },
      data: { items },
    });
  } else {
    await prisma.cart.create({
      data: { userId, items },
    });
  }
}
