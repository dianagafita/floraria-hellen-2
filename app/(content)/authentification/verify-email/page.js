"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage({ searchParams }) {
  const { token } = searchParams;
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await fetch("/api/session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            router.push("/profile");
          } else {
            const errorData = await response.json();
            setError(errorData.error || "Va rugam incercati inca o data!");
          }
        } catch (error) {
          setError("Va rugam incercati inca o data!");
        }
      } else {
        setError("Va rugam incercati inca o data!");
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="min-h-[80vh]">
      {error ? (
        <p className="text-center text-2xl font-[200] my-20">{error}</p>
      ) : (
        <p className="text-center text-2xl font-[200] my-20">
          Verificare email...{" "}
        </p>
      )}
    </div>
  );
}
