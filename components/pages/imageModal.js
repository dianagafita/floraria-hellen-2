import React from "react";
import Image from "next/image";

export function ImageModal({ isOpen, imgSrc, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
    >
      <div className="relative p-5 rounded-sm w-[90vw] h-[90vw] md:w-[70vw] md:h-[70vw] lg:h-[40vw]">
        <Image
          src={imgSrc}
          alt="Full size image"
          layout="fill"
          className="rounded-sm  object-contain"
        />
      </div>
    </div>
  );
}
