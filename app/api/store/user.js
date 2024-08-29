import { hashUserPassword, verifyPassword } from "@/lib/hash";
import prisma from "@/lib/prisma";

export async function getAllProducts() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getUserById(id) {
  const users = await prisma.user.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return users;
}

export async function updateUserData(firstName, secondName, email, phone) {
  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      first_name: firstName,
      second_name: secondName,
      email,
      phone,
    },
  });
  return updatedUser;
}

export async function updateUserPassword(newPassword, email, currentPassword) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Utilizatorul nu a fost gasit.");
  }

  const isCurrentPasswordValid = verifyPassword(user.password, currentPassword);

  if (!isCurrentPasswordValid) {
    throw new Error("Current password is incorrect");
  }

  const newPasswordHashed = hashUserPassword(newPassword);

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      password: newPasswordHashed,
    },
  });

  return updatedUser;
}
