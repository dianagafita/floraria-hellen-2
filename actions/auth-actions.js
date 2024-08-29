"use server";

import { createAuthSession, destroySession } from "@/lib/auth";
import { verifyPassword } from "@/lib/hash";
import { getUserByEmail } from "@/lib/user";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import { VerifyEmailTemplate } from "@/components/emailTemplates/verEmail";

const JWT_SECRET = process.env.JWT_SECRET;

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const secondName = formData.get("secondName");
  const phone = formData.get("phone");

  let errors = {};
  let succes = {};

  if (!email.includes("@")) {
    errors.email = "Introduceti o adresa email valida";
  }
  if (password.trim().length < 8) {
    errors.password = "Parola trebuie sa contina min. 8 caractere";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const emailVerificationToken = jwt.sign(
    { email, password, firstName, secondName, phone },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Floraria Hellen  <florariahellen@hellenproparty.ro>",
    to: [email],
    subject: "Confirma adresa de e-mail",
    react: VerifyEmailTemplate({ email, emailVerificationToken }),
  });

  redirect("/");
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return {
      errors: {
        email: "Adresa e-mail este incorecta",
      },
    };
  }
  const isValidPassword = verifyPassword(existingUser.password, password);
  if (!isValidPassword) {
    return {
      errors: {
        password: "Parola incorecta.",
      },
    };
  }
  await createAuthSession(existingUser.id);
  return { status: "success" };
}

export async function auth(mode, prevState, formData) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}

export async function logout() {
  console.log("Logout function called");
  await destroySession();
  return { status: "success" };
}
