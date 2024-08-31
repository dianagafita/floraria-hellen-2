"use client";
import Button from "@/components/util/button";
import Input from "@/components/util/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleAdminSubmit = async (event) => {
    event.preventDefault();
    const passwordInput = event.target.elements.adminPassword.value;

    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: passwordInput }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/admin/dashboard");
      } else {
        setError(result.error || "Ceva nu a functionat!");
      }
    } catch (error) {
      console.error("Eroare in timpul logarii:", error);
      setError("Va rugam reincercati.");
    }
  };

  return (
    <div className="h-full mt-[30vw] md:mt-[10vw]">
      <div className="p-10 w-[90vw] h-[300px] mx-auto shadow-lg border">
        <form className="text-center" onSubmit={handleAdminSubmit}>
          <Input
            type="password"
            id="adminPassword"
            placeholder="Introduceti parola"
            name="adminPassword"
          />
          <Button type="submit" moreStyle="mt-10 py-2 px-10">
            Accesati
          </Button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
