"use client";
import { useFormState } from "react-dom";
import Link from "next/link";
import Button from "@/components/util/button";
import Input from "@/components/util/input";
import { auth } from "@/actions/auth-actions";
import { TitleByPath } from "@/components/util/getPathTitle";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthForm({ mode }) {
  const [formState, formAction] = useFormState(auth.bind(null, mode), {});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (formState.status === "success" && !isFormSubmitted) {
      setIsFormSubmitted(true);
      window.location.href = "/profile";
    }
  }, [formState.status, isFormSubmitted, router]);

  const paths = [
    {
      href: "/authentification",
      title: "AUTENTIFICARE",
      style: "text-black-300/75",
    },
  ];

  return (
    <>
      <TitleByPath paths={paths} />
      <div className="flex flex-col my-10 py-10 mb-40 mx-5 md:mx-20  items-center rounded-sm  bg-white  shadow-lg border border-[0.1px] border-opacity-5 border-black">
        <span className="text-2xl font-[200]">
          {mode === "login" ? "LOGARE" : "CREEAZA CONT"}
        </span>
        <form
          className="flex flex-col justify-center items-center w-full "
          action={formAction}
        >
          {mode === "login" && (
            <div className="grid grid-cols-1  w-[400px] md:w-[500px] px-5  items-end my-[35px]">
              <Input name="email" label="E-mail" />
              <Input name="password" label="Parola" type="password" />
            </div>
          )}
          {mode === "signup" && (
            <div className="flex flex-col justify-center items-center w-[80%]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full justify-center">
                <Input name="firstName" label="Prenume" />
                <Input name="secondName" label=" Nume" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full justify-center mb-10">
                <Input name="email" label="E-mail" />
                <Input name="password" label="Parola" type="password" />
                <Input name="phone" label="Telefon"  type="tel"
          pattern="[0-9]{10}" />
              </div>
            </div>
          )}
          <Button type="submit" moreStyle="w-[200px] my-3 ">
            {mode === "login" ? "Intra in cont" : "Creaza cont"}
          </Button>
          <p className="text-[13px] font-[100] underline underline-offset-2 text-[#707070] hover:text-[#404040]">
            {mode === "login" ? (
              <Link href="/authentification/?mode=signup">
                Nu ti-ai facut inca cont? Creeaza acum.{" "}
              </Link>
            ) : (
              <Link href="/authentification/?mode=login">Intra in cont</Link>
            )}
          </p>
          {formState.errors && (
            <ul className="text-red-900 mb-5 my-1 text-[13px] font-[100] ">
              {Object.keys(formState.errors).map((error) => (
                <li className="my-1 flex" key={error}>
                  <p>{formState.errors[error]}</p>
                  {formState.errors[error] === "Parola incorecta." && (
                    <Link
                      href="/authentification/reset-password"
                      className="text-[#707070]  ml-1 underline underline-offset-4 underline-text-red-900 hover:text-[#404040] "
                    >
                      Ati uitat parola?
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </>
  );
}
