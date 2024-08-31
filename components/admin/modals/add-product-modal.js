"use client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Button from "@/components/util/button";
import Input from "@/components/util/input";
import { addProduct } from "@/actions/product-actions";
import { addEventProduct } from "@/actions/event-product-actions";

export default function AddProductModal({ openModal, type }) {
  const [formState, formAction] = useFormState(
    type !== "event" ? addProduct : addEventProduct,
    {}
  );
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  useEffect(() => {
    if (formState.status === "success") {
      window.location.href =
        type !== "event"
          ? "/admin/dashboard/products"
          : "/admin/dashboard/event-products";
    }
  }, [formState]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="m-10 bg-white rounded-sm md:w-1/2 w-full p-10">
        <form action={formAction} className="flex flex-col">
          <div className="flex">
            <Input
              required
              id="productName"
              name="productName"
              label="NUME PRODUS"
            />
            <Input
              required
              id="productType"
              name="productType"
              label="TIP PRODUS"
            />
          </div>
          {type === "event" ? (
            <Input
              required
              id="productEventType"
              name="productEventType"
              label="TIP EVENIMENT"
            />
          ) : (
            <div className="flex">
              <Input
                required
                id="productSubtype"
                name="productSubtype"
                label="SUBTIP PRODUS"
              />
              <Input
                required
                id="productFlowerType"
                name="productFlowerType"
                label="TIP FLORI"
              />
            </div>
          )}

          <div className="flex">
            <Input
              required
              name="productImages"
              label="IMAGINI"
              type="file"
              multiple
              more="!border-none p-0"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileChange}
            />

            {type !== "event" && (
              <Input
                required
                type="number"
                id="productPrice"
                name="productPrice"
                label="Pret"
              />
            )}
          </div>
          <div className="flex mx-3 mt-10 justify-between">
            <Button type="submit" moreStyle="px-5 ">
              Adauga produs
            </Button>
            <Button type="button" moreStyle="px-5" onClick={openModal}>
              Inchide
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
