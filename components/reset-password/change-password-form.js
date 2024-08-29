"use client";
import { useState } from "react";
import Input from "../util/input";
import Button from "../util/button";
import { changePassword } from "@/actions/change-password-actions";

const ChangePasswordForm = ({ resetPasswordToken }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Parolele nu se potrivesc!");
      return;
    }

    const message = await changePassword(resetPasswordToken, password);
    setMessage(message);
  };

  return (
    <form
      className="min-h-[50vh] flex flex-col w-[90%] md:w-[70%] lg:w-[50%] mx-auto my-20"
      onSubmit={handleSubmit}
    >
      {!message ? (
        <>
          <Input
            label="Schimba parola"
            name="password"
            type="password"
            placeholder="Parola"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            required
            label="Confirma parola"
            placeholder="Confirma parola"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" moreStyle="w-[200px] mx-auto my-5">
            Schimba parola
          </Button>
        </>
      ) : (
        <p className="text-center text-2xl font-[200]">{message}</p>
      )}
    </form>
  );
};

export default ChangePasswordForm;
