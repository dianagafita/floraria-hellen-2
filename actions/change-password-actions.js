"use server";

import { hashUserPassword } from "@/lib/hash";
import prisma from "@/lib/prisma";

export const changePassword = async (resetPasswordToken, password) => {
  const user = await prisma.user.findUnique({
    where: {
      resetPasswordToken,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry;
  if (!resetPasswordTokenExpiry) {
    throw new Error("Token expired");
  }

  const today = new Date();

  if (today > resetPasswordTokenExpiry) {
    throw new Error("Token expired");
  }

  const passwordHash = hashUserPassword(password);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: passwordHash,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    },
  });

  return "Password changed successfully";
};
