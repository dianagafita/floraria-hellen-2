"use client";
import Button from "@/components/util/button";
import Title from "@/components/util/title";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import AddProductModal from "@/components/admin/modals/add-product-modal";
import EditProductModal from "@/components/admin/modals/edit-product-modal";

export default function AllProducts({ products, type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (productId) => {
    await fetch(`/api/store/products/${productId}`, {
      method: "DELETE",
    });

    window.location.href = "/admin/dashboard/products";
  };
  return (
    <>
      {isModalOpen &&
        (selectedProduct ? (
          <EditProductModal
            type={type}
            openModal={closeModal}
            product={selectedProduct}
          />
        ) : (
          <AddProductModal type={type} openModal={closeModal} />
        ))}
      <div className="flex flex-col w-full h-full p-5">
        <div className="flex justify-end my-10  mb-0 w-full">
          <Button
            onClick={() => openModal()}
            moreStyle="px-5 py-1 !rounded-md flex items-center !bg-black !text-white hover:opacity-80"
          >
            <CiCirclePlus strokeWidth={0.8} />
            <span className="ml-2">Adauga produs</span>
          </Button>
        </div>
        <div className="py-10 px-5 bg-white  my-5 rounded-md ">
          <Title moreStyle="font-[400] my-5 md:my-10">
            {type === "event" ? "PRODUSE EVENIMENTE" : "PRODUSE"}
          </Title>
          <div className="relative max-w-screen overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs text-[#505050] uppercase border-b">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    NUME PRODUS
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CATEGORIE
                  </th>
                  {type !== "event" ? (
                    <>
                      <th scope="col" className="px-2 py-3">
                        TIP FLOARE
                      </th>
                      <th scope="col" className="px-2 py-3">
                        PRET
                      </th>
                    </>
                  ) : (
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      TIP EVEN.
                    </th>
                  )}
                  <th scope="col" className="px-2 py-3">
                    ACTIUNE
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className=" bg-white border-b  hover:bg-gray-50 "
                  >
                    <th
                      scope="row"
                      className="px-2 w-[300px] py-4 font-medium text-gray-900 flex items-center"
                    >
                      <Image
                        alt={product.name}
                        src={product.images_url[0]}
                        width={90}
                        height={90}
                        className="rounded-md mr-5"
                      />
                      {product.name}
                    </th>
                    <td className="px-2 py-4"> {product.product_type} </td>
                    {type !== "event" ? (
                      <>
                        <td className="px-2 py-4">
                          {product.product_subtype}{" "}
                        </td>
                        <td className="px-2 py-4">{product.price}</td>
                      </>
                    ) : (
                      <td className="px-2 py-4">{product.event_type}</td>
                    )}
                    <td className="px-2 py-4 ">
                      <button
                        onClick={() => openModal(product)}
                        className="font-medium text-[#5A0707] hover:underline"
                      >
                        Editare
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="py-1 font-medium text-[#5A0707] hover:underline"
                      >
                        Sterge
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
