"use client";
import { updatePassword } from "@/actions/user-actions";
import Button from "@/components/util/button";
import Input from "@/components/util/input";
import Title from "@/components/util/title";
import { redirect } from "next/dist/server/api-utils";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function PasswordChangeForm(email, showToast) {
  const [formState, formAction] = useFormState(
    updatePassword.bind(null, email),
    {}
  );

  useEffect(() => {
    showToast(formState.success ? "success" : "error", formState.message);
    setTimeout(() => {
      redirect("/");
    }, 1000);
  }, [formState]);

  return (
    <div className="mb-9 md:mb-0 flex flex-col w-full py-5 px-2 text-center border rounded">
      <Title>
        SCHIMBA PAROLA
        <span className="flex text-[12px] md:text-sm text-[rgba(0,0,0,0.5)]">
          Editeaza parola asociata contului tau
        </span>
      </Title>
      <form
        className="flex flex-col items-center text-start w-full"
        action={formAction}
      >
        <input type="hidden" name="id" value={user?.id} />
        <Input name="currentPassword" label="Parola veche" type="password" />
        <div className="flex md:flex-col lg:flex-row w-full">
          <Input name="newPassword" label="Parola noua" type="password" />
          <Input
            name="confirmNewPassword"
            label="Confirma parola noua"
            type="password"
          />
        </div>
        <Button moreStyle="w-[50%] lg:w-[50%] md:w-[90%] mx-auto md:mt-[136px] mt-10">
          Schimba parola
        </Button>
      </form>
    </div>
  );
}
