"use server";

import { ResetPasswordTemplate } from "@/components/change-password-email";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { Resend } from "resend";
export const resetPassword = async (email) => {
  const user = prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User doest not exist");
  }

  const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
  const today = new Date();
  const expireDate = new Date(today.setDate(today.getDate() + 1));

  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken,
      resetPasswordTokenExpiry: expireDate,
    },
  });
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data } = await resend.emails.send({
    from: "Floraria Hellen  <florariahellen@hellenproparty.ro>",
    to: [email],
    subject: "Resetare parola",
    react: ResetPasswordTemplate({ email: email, resetPasswordToken }),
  });
  console.log(data);
  return "Verificati adresa de e-mail introdusa pentru link-ul de resetare a parolei.";
};
