import React from "react";
import { MdClose, MdArrowForward, MdArrowBack } from "react-icons/md";

export const ImageModal = ({ isOpen, imgSrc, onClose, onNext, onPrev }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75">
      <button
        className="absolute z-[60]  left-2 top-1/2 transform -translate-y-1/2 text-white"
        onClick={onPrev}
      >
        <MdArrowBack size={30} />
      </button>
      <div className="relative">
        <button className="absolute top-2 right-2 text-white" onClick={onClose}>
          <MdClose size={30} />
        </button>

        <img
          src={imgSrc}
          alt="Modal content"
          className="max-h-[80vh] max-w-[90vw]"
        />
      </div>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
        onClick={onNext}
      >
        <MdArrowForward size={30} />
      </button>
    </div>
  );
};
