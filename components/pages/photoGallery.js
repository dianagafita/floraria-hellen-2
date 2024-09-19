// // "use client";
// // import { useState } from "react";
// // import Image from "next/image";
// // import { ImageModal } from "./imageModal";

// // export function FeaturedImageGallery({ images, type }) {
// //   const [active, setActive] = useState(images[0]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [modalImage, setModalImage] = useState(null);

// //   const handleImageClick = (imgelink) => {
// //     setModalImage(imgelink);
// //     setIsModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setModalImage(null);
// //   };

// //   return (
// //     <>
// //       <div
// //         className={`${
// //           type === "event" ? "grid-cols-1" : "grid-cols-3"
// //         } grid  md:grid-cols-1 gap-1 md:gap-4 w-full `}
// //       >
// //         <div className="col-span-2 md:col-span-1">
// //           <Image
// //             src={active}
// //             layout="responsive"
// //             width={800}
// //             height={600}
// //             alt="Gallery image"
// //             className="object-cover"
// //           />
// //         </div>
// //         <div
// //           className={`w-full ${
// //             type === "event"
// //               ? "flex "
// //               : "grid-cols-1 grid  md:grid-cols-5  gap-1"
// //           } `}
// //         >
// //           {images.map((imgelink, index) => (
// //             <div
// //               key={index}
// //               className={`${type === "event" ? "h-24 " : "h-1/2 "}  md:h-24`}
// //             >
// //               <Image
// //                 onClick={() => handleImageClick(imgelink)}
// //                 src={imgelink}
// //                 layout={type === "event" ? "" : "responsive"} // Adjust the second option as needed
// //                 width={500}
// //                 height={200}
// //                 className="cursor-pointer  rounded-sm object-cover object-center w-full h-full"
// //                 alt="Gallery image"
// //               />
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {type !== "event" ? (
// //         ""
// //       ) : (
// //         <ImageModal
// //           isOpen={isModalOpen}
// //           imgSrc={modalImage}
// //           onClose={closeModal}
// //         />
// //       )}
// //     </>
// //   );
// // }
// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { ImageModal } from "./imageModal";

// export function FeaturedImageGallery({ images, type }) {
//   const [active, setActive] = useState(images[0]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalImage, setModalImage] = useState(null);

//   const handleImageClick = (imgelink) => {
//     setModalImage(imgelink);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setModalImage(null);
//   };

//   return (
//     <>
//       <div
//         className={`${
//           type === "event" ? "grid-cols-1" : "grid-cols-3"
//         } grid  md:grid-cols-1 gap-1 md:gap-4 w-full`}
//       >
//         <div className="col-span-2 md:col-span-1">
//           <Image
//             src={active}
//             layout="responsive"
//             width={800}
//             height={600}
//             alt="Gallery image"
//             className={`object-cover ${
//               type === "event" ? "min-h-[350px] min-w-[350px]" : ""
//             }`}
//           />
//         </div>
//         <div
//           className={`w-full md:min-w-[350px] ${
//             type === "event"
//               ? "flex overflow-x-auto "
//               : "grid grid-cols-1 md:grid-cols-5 gap-1"
//           }`}
//         >
//           {images.map((imgelink, index) => (
//             <div
//               key={index}
//               className={`${
//                 type === "event"
//                   ? "h-24 flex-shrink-0 overflow-hidden w-40 mr-1"
//                   : "h-1/2"
//               } md:h-24`}
//             >
//               <Image
//                 onClick={() => handleImageClick(imgelink)}
//                 src={imgelink}
//                 layout={type === "event" ? "intrinsic" : "responsive"}
//                 width={500}
//                 height={200}
//                 className="cursor-pointer rounded-sm object-cover object-center w-full h-full"
//                 alt="Gallery image"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {isModalOpen && (
//         <ImageModal
//           isOpen={isModalOpen}
//           imgSrc={modalImage}
//           onClose={closeModal}
//         />
//       )}
//     </>
//   );
// }
"use client";
import { useState } from "react";
import Image from "next/image";
import { ImageModal } from "./imageModal";

export function FeaturedImageGallery({ images, type }) {
  const [active, setActive] = useState(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div
        className={`${
          type === "event" ? "grid-cols-1" : "grid-cols-3"
        } grid  md:grid-cols-1 gap-1 md:gap-4 w-full`}
      >
        <div className="col-span-2 md:col-span-1">
          <Image
            src={active}
            layout="responsive"
            width={800}
            height={600}
            alt="Gallery image"
            className={`object-cover ${
              type === "event" ? "min-h-[350px] min-w-[350px]" : ""
            }`}
          />
        </div>
        <div
          className={`w-full md:min-w-[350px] ${
            type === "event"
              ? "flex overflow-x-auto "
              : "grid grid-cols-1 md:grid-cols-5 gap-1"
          }`}
        >
          {images.map((imgelink, index) => (
            <div
              key={index}
              className={`${
                type === "event"
                  ? "h-24 flex-shrink-0 overflow-hidden w-40 mr-1"
                  : "h-1/2"
              } md:h-24`}
            >
              <Image
                onClick={() => handleImageClick(index)}
                src={imgelink}
                layout={type === "event" ? "intrinsic" : "responsive"}
                width={500}
                height={200}
                className="cursor-pointer rounded-sm object-cover object-center w-full h-full"
                alt="Gallery image"
              />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          imgSrc={images[modalImageIndex]}
          onClose={closeModal}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </>
  );
}
