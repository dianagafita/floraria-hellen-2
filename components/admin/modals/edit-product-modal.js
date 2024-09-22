// "use client";
// import { useEffect, useState } from "react";
// import { useFormState } from "react-dom";
// import Button from "@/components/util/button";
// import Input from "@/components/util/input";
// import { updateProduct } from "@/actions/product-actions";
// import { updateEventProduct } from "@/actions/event-product-actions";

// export default function EditProductModal({ openModal, product, type }) {
//   const [formState, formAction] = useFormState(
//     type !== "event" ? updateProduct : updateEventProduct,
//     {}
//   );
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     if (formState.status === "success") {
//       window.location.href =
//         type !== "event"
//           ? "/admin/dashboard/products"
//           : "/admin/dashboard/event-products";
//       openModal();
//     }
//   }, [formState.status]);

//   const handleFileChange = (event) => {
//     setFiles(event.target.files);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="m-10 bg-white rounded-sm md:w-1/2 w-full p-10">
//         <form action={formAction} className="flex flex-col">
//           <Input defaultValue={product.id} more="hidden" id="id" name="id" />
//           <div className="flex">
//             <Input
//               defaultValue={product.name}
//               required
//               id="productName"
//               name="productName"
//               label="NUME PRODUS"
//             />
//             <Input
//               defaultValue={product.product_type}
//               required
//               id="productType"
//               name="productType"
//               label="TIP PRODUS"
//             />
//           </div>
//           {type !== "event" ? (
//             <div className="flex">
//               <Input
//                 defaultValue={product.product_subtype}
//                 required
//                 id="productSubtype"
//                 name="productSubtype"
//                 label="SUBTIP PRODUS"
//               />
//               <Input
//                 defaultValue={product.flowers_type}
//                 required
//                 id="productFlowerType"
//                 name="productFlowerType"
//                 label="TIP FLORI"
//               />
//             </div>
//           ) : (
//             <Input
//               defaultValue={product.event_type}
//               required
//               id="productEventType"
//               name="productEventType"
//               label="TIP EVENIMENT"
//             />
//           )}
//           <div className="flex items-center">
//             {type !== "event" && (
//               <Input
//                 defaultValue={product.price}
//                 required
//                 type="number"
//                 id="productPrice"
//                 name="productPrice"
//                 label="Pret"
//               />
//             )}
//             <Input
//               name="productImages"
//               label="IMAGINI"
//               type="file"
//               multiple
//               more="!border-none p-0"
//               accept="image/png, image/gif, image/jpeg"
//               onChange={handleFileChange}
//             />
//           </div>
//           <div className="my-4 flex">
//             {product.images_url.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`Product Image ${index}`}
//                 className="w-32 h-32 object-cover rounded-md mr-2"
//               />
//             ))}
//           </div>
//           <div className="flex mx-3 mt-10 justify-between">
//             <Button type="submit" moreStyle="px-5 ">
//               Salveaza
//             </Button>
//             <Button type="button" moreStyle="px-5" onClick={openModal}>
//               Inchide
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import Button from "@/components/util/button";
import Input from "@/components/util/input";
import { updateProduct } from "@/actions/product-actions";
import { useFormState } from "react-dom";
import { updateEventProduct } from "@/actions/event-product-actions";

export default function EditProductModal({ openModal, product, type }) {
  const [formState, formAction] = useFormState(
    type !== "event" ? updateProduct : updateEventProduct,
    {}
  );
  const [files, setFiles] = useState([]);
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    if (product) {
      setFlowers(product.flowers || []);
    }
  }, [product]);

  useEffect(() => {
    if (formState.status === "success") {
      window.location.href =
        type !== "event"
          ? "/admin/dashboard/products"
          : "/admin/dashboard/event-products";
      openModal();
    }
  }, [formState.status]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleFlowerChange = (index, field, value) => {
    const newFlowers = [...flowers];
    newFlowers[index][field] = value;
    setFlowers(newFlowers);
  };

  const handleAddFlower = () => {
    setFlowers([...flowers, { flowerName: "", quantity: "" }]);
  };

  const handleRemoveFlower = (index) => {
    const newFlowers = [...flowers];
    newFlowers.splice(index, 1);
    setFlowers(newFlowers);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`m-10 bg-white rounded-sm md:w-2/3 w-full p-10 overflow-auto ${
          type === "event" ? "h-[700px]" : "h-[700px]"
        } `}
      >
        <form
          action={async (formData) => {
            formData.append("flowers", JSON.stringify(flowers));
            Array.from(files).forEach((file) => {
              formData.append("productImages", file);
            });
            formAction(formData);
          }}
          className="flex flex-col"
        >
          <Input defaultValue={product.id} more="hidden" id="id" name="id" />
          <div className="flex">
            <Input
              defaultValue={product.name}
              required
              id="productName"
              name="productName"
              label="NUME PRODUS"
            />
            <Input
              defaultValue={product.product_type}
              required
              id="productType"
              name="productType"
              label="TIP PRODUS"
            />
          </div>
          {type !== "event" ? (
            <>
              <div className="flex">
                <Input
                  defaultValue={product.product_subtype}
                  required
                  id="productSubtype"
                  name="productSubtype"
                  label="SUBTIP PRODUS"
                />
                <Input
                  defaultValue={product.flowers_type}
                  required
                  id="productFlowerType"
                  name="productFlowerType"
                  label="TIP FLORI"
                />
              </div>
              <Input
                defaultValue={product.price}
                required
                type="number"
                id="productPrice"
                name="productPrice"
                label="Pret"
              />
            </>
          ) : (
            <Input
              defaultValue={product.event_type}
              required
              id="productEventType"
              name="productEventType"
              label="TIP EVENIMENT"
            />
          )}
          <Input
            name="productImages"
            label="IMAGINI"
            type="file"
            multiple
            more="!border-none p-0"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileChange}
          />
          <div className="my-4 flex overflow-auto">
            {product.images_url.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product Image ${index}`}
                className="w-32 h-32 object-cover rounded-md mr-2"
              />
            ))}
          </div>
          {type !== "event" && (
            <>
              <h1 className="p-2 mt-10 mb-5 text-[18px]">CE FLORI CONTINE</h1>
              {flowers.map((flower, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-6 md:space-x-2"
                >
                  <div className="flex flex-col md:flex-row w-full">
                    <Input
                      required
                      type="number"
                      id={`flowerQuantity-${index}`}
                      name={`flowerQuantity-${index}`}
                      label="Cantitate"
                      value={flower.quantity}
                      onChange={(e) =>
                        handleFlowerChange(index, "quantity", e.target.value)
                      }
                    />
                    <Input
                      required
                      id={`flowerName-${index}`}
                      name={`flowerName-${index}`}
                      label="Nume floare"
                      value={flower.flower}
                      onChange={(e) =>
                        handleFlowerChange(index, "flowerName", e.target.value)
                      }
                    />
                  </div>
                  {flowers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFlower(index)}
                      className="bg-black text-white rounded h-[25px] px-2 mt-10"
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              <div className="text-center my-5 px-2">
                <Button
                  type="button"
                  onClick={handleAddFlower}
                  className="w-full md:w-1/2 bg-black text-white hover:bg-white hover:text-black mt-2 px-3 py-1"
                >
                  + Adauga flori
                </Button>
              </div>
            </>
          )}
          <div className="flex mx-3 mt-10 justify-between">
            <Button type="submit" moreStyle="px-5">
              Salveaza
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
