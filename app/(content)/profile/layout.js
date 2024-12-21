"use client";
import Image from "next/image";
import imgs from "./profile.jpeg";

export default function ProfileLayout({ children }) {
  return (
    <>
      <div className="relative"></div>
      {children}
    </>
  );
}
