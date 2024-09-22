"use client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Button from "@/components/util/button";
import Input from "@/components/util/input";
import { addProduct } from "@/actions/product-actions";
import { addEventProduct } from "@/actions/event-product-actions";
import imageCompression from "browser-image-compression";

export default function AddProductModal({ openModal, type }) {
  const [formState, formAction] = useFormState(
    type !== "event" ? addProduct : addEventProduct,
    {}
  );
  const [files, setFiles] = useState([]);
  const [flowers, setFlowers] = useState([{ flowerName: "", quantity: "" }]);
  const [selectedType, setSelectedType] = useState("");
  const [subTypeOptions, setSubTypeOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    const uploadPromises = selectedFiles.map(async (file) => {
      // Compress the image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1, // Adjust max size
        maxWidthOrHeight: 1024, // Adjust dimensions
        useWebWorker: true,
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ productId: "your-product-id" }),
        headers: { "Content-Type": "application/json" },
      });

      const { url } = await response.json();

      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: compressedFile,
        headers: {
          "Content-Type": compressedFile.type,
        },
      });

      return uploadResponse.ok ? url : null;
    });

    const imageUrls = await Promise.all(uploadPromises);
    setFiles(imageUrls.filter(Boolean));
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

  // useEffect(() => {
  //   if (formState.status === "success") {
  //     window.location.href =
  //       type !== "event"
  //         ? "/admin/dashboard/products"
  //         : "/admin/dashboard/event-products";
  //   }
  // }, [formState]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    files.forEach((url) => formData.append("imageUrls", url));

    try {
      const response = await fetch("/api/prod", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle success
        window.location.href = "/admin/dashboard/products"; // Adjust as needed
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const flowerType = [
    { value: "buchete", label: "Buchet" },
    { value: "aranjamente", label: "Aranjament" },
    { value: "plante", label: "Plante" },
    {
      value: "flori-criogenate",
      label: "Floare Criogenata",
    },
    { value: "ocazii-speciale", label: "Ocazie Speciala" },
  ];

  const handleTypeChange = (value) => {
    setSelectedType(value);
    if (value === "buchete") {
      setSubTypeOptions([
        { value: "buchete-flori-uscate", label: "Flori uscate" },
        { value: "buchete-trandafiri", label: "Trandafiri" },
        { value: "buchete-flori-primavara", label: "Primavara" },
        { value: "buchete-flori-vara", label: "Vara" },
        { value: "buchete-flori-toamna", label: "Toamna" },
      ]);
    } else if (value === "aranjamente") {
      setSubTypeOptions([
        { value: "aranjamente-flori-uscate", label: "Flori uscate" },
        { value: "aranjamente-trandafiri", label: "Trandafiri" },
        { value: "aranjamente-flori-primavara", label: "Primavara" },
        { value: "aranjamente-flori-vara", label: "Vara" },
        { value: "aranjamente-flori-toamna", label: "Toamna" },
      ]);
    } else if (value === "ocazii-speciale") {
      setSubTypeOptions([
        { value: "craciun", label: "Craciun" },
        { value: "martie", label: "Martie" },
        { value: "sf-valentin", label: "Sf. Valentin" },
        { value: "paste", label: "Paste" },
        { value: "aranjamente-flori-toamna", label: "Toamna" },
      ]);
    } else if (value === "plante") {
      setSubTypeOptions([{ value: "plante", label: "Plante" }]);
    } else if (value === "ocazii-speciale") {
      setSubTypeOptions([
        { value: "ocazii-speciale", label: "Ocazii Speciale" },
      ]);
    } else {
      setSubTypeOptions([]);
    }
  };

  const eventType = [
    { value: "nunta", label: "Nunta" },
    { value: "botez", label: "Botez" },
  ];

  const handleEventTypeChange = (value) => {
    setSelectedType(value);
    if (value === "nunta") {
      setSubTypeOptions([
        { value: "nunta-completa", label: "Nunta completa" },
        { value: "aranjamente-masa", label: "Aranjamente masa" },
        { value: "buchete-mireasa", label: "Buchet mireasa" },
        { value: "intrare-sala-covor-rosu", label: "Intrare, covor rosu" },
        {
          value: "corsaj-cocarede-bratari-coronite",
          label: "Corsaj,cocarde,bratari,coronite",
        },
        { value: "biserica", label: "Biserica" },
        { value: "lumanari-biserica", label: "Lumanari" },
        { value: "cununie-civila", label: "Cununie" },
        { value: "masa-oficiala", label: "Masa oficiala" },
        { value: "decoratiuni-sali", label: "Sali" },
        { value: "photo-corner", label: "Photo Corner" },
        { value: "fantana-ciocolata", label: "Fantana ciocolata" },
        { value: "masina-fum", label: "Fum" },
        { value: "decoratiuni-masini", label: "Deco. masini" },
      ]);
    } else if (value === "botez") {
      setSubTypeOptions([
        { value: "aranjamente-florale", label: "Aranjamente" },
        { value: "aranjamente-cristelnita", label: "Cristelnita" },
        { value: "lumanari-botez", label: "Lumanari" },
        { value: "photo-corner", label: "Photo Corner" },
        { value: "fantana-ciocolata", label: "Fantana Ciocolata" },
      ]);
    } else {
      setSubTypeOptions([]);
    }
  };

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] w-full">
      <div
        className={`m-10 bg-white rounded-sm  w-full p-5  overflow-auto${
          type === "event" ? "h-full" : "h-[700px]"
        } `}
      >
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <div className="flex flex-col md:flex-row">
            <Input
              required
              id="productName"
              name="productName"
              label="NUME PRODUS"
            />
            {type === "event" ? (
              <Input
                required
                type="select"
                id="productEventType"
                name="productEventType"
                label="TIP EVENIMENT"
                options={eventType}
                onChange={(e) => handleEventTypeChange(e.target.value)}
              />
            ) : (
              <div className="flex flex-col md:flex-row">
                <Input
                  required
                  id="productSubtype"
                  name="productSubtype"
                  label="SUBTIP PRODUS"
                  type="select"
                  options={subTypeOptions}
                />
                <Input
                  required
                  id="productFlowerType"
                  name="productFlowerType"
                  label="TIP FLORI"
                />
              </div>
            )}
            <Input
              type="select"
              required
              id="productType"
              name="productType"
              label="TIP PRODUS"
              options={type === "event" ? subTypeOptions : flowerType}
              onChange={(e) =>
                type === "event" ? null : handleTypeChange(e.target.value)
              }
            />
          </div>

          <div className="flex flex-col md:flex-row">
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
            {type !== "event" ? (
              <Input
                required
                type="number"
                id="productPrice"
                name="productPrice"
                label="Pret"
              />
            ) : (
              <Input
                required
                id="productId"
                name="productId"
                label="ID produs"
              />
            )}
          </div>

          {type !== "event" && (
            <>
              <h1 className="p-2 mt-10 mb-5 text-[18px]">CE FLORI CONTINE</h1>

              {flowers.map((flower, index) => (
                <div
                  key={index}
                  className="flex  items-center  space-x-6 md:space-x-2 "
                >
                  <div className="flex flex-col md:flex-row w-full">
                    <Input
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
                      id={`flowerName-${index}`}
                      name={`flowerName-${index}`}
                      label="Nume floare"
                      value={flower.flowerName}
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
                  className=" w-full md:w-1/2 bg-black text-white  hover:bg-white hover:text-black mt-2  px-3 py-1"
                >
                  + Adauga flori
                </Button>
              </div>
            </>
          )}
          <div className="flex mx-3 mt-10 justify-between">
            <Button type="submit" moreStyle="px-5 ">
              {isLoading ? "Se adauga..." : "Adauga"}
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
