"use client";
import { useState } from "react";
import Input from "../util/input";
import Button from "../util/button";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/actions/reset-password-actions";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function send() {
    const message = await resetPassword(email);
    setMessage(message);
  }

  return (
    <>
      <form
        action={send}
        className="min-h-[50vh] flex flex-col w-full my-20 justify-center items-center"
      >
        {!message ? (
          <>
            <Input
              required
              type="email"
              name="email"
              label="Introduceti adresa de e-mail pentru care vreti sa resetati parola:"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" moreStyle="w-[200px] mx-auto my-5">
              Reseteaza parola
            </Button>
          </>
        ) : (
          <>
            <p className="text-center text-2xl font-[200]">{message}</p>
            <button
              onClick={() => router.push("/authentification/reset-password")}
              href="/authentification/reset-password"
              className="text-[#707070] hover:text-black text-center font-[100] underline underline-offset-4 my-4 decoration-gray-500 hover:decoration-black"
            >
              Retrimiteti link-ul de resetare!
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default ResetPasswordForm;
