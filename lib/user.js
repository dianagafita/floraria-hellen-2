import prisma from "./prisma";

export async function createUser(
  email,
  password,
  firstName,
  secondName,
  phone
) {
  console.log(email);
  const newUser = await prisma.user.create({
    data: {
      email,
      password,
      first_name: firstName,
      second_name: secondName,
      phone,
      emailVerified: true,
    },
  });
  return newUser.id;
}

export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
