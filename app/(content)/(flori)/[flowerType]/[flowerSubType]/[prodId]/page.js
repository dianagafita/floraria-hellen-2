"use client";
import { useState, useEffect } from "react";
import Input from "@/components/util/input";
import { FeaturedImageGallery } from "@/components/pages/photoGallery";
import { useCart } from "@/context/cart-context";
import Button from "@/components/util/button";
import Loading from "@/lib/loading";
import { EXTRA_ITEMS } from "@/constants";
import ExtraItemModal from "./extra-item-modal";

export default function ProductPage({ params }) {
  const { addToCart } = useCart();
  const [formValid, setFormValid] = useState(false);
  const [temporaryExtras, setTemporaryExtras] = useState([]);
  const [flowers, setFlowers] = useState(null);
  const [formData, setFormData] = useState({
    deliveryCity: "Gura Humorului",
    deliveryDate: "",
    deliveryInterval: "08:00-10:00",
    deliveryType: false,
    deliveryMessage: "",
  });

  const [extraItems] = useState(EXTRA_ITEMS);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${params.prodId}`);
        const data = await res.json();
        setFlowers(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.prodId]);

  useEffect(() => {
    const isFormValid =
      formData.deliveryCity !== "" &&
      formData.deliveryDate !== "" &&
      formData.deliveryInterval !== "";
    setFormValid(isFormValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddToCart = (event) => {
    event.preventDefault();

    const form = event.currentTarget.form;

    if (form.checkValidity()) {
      if (flowers && formValid) {
        const fullProductDetails = {
          ...flowers,
          extras: [...temporaryExtras],
          formData,
        };
        addToCart(fullProductDetails);
        setTemporaryExtras([]);
      }
    } else {
      form.reportValidity();
    }
  };

  const handleAddExtra = (item) => {
    setTemporaryExtras((prev) => [...prev, item]);
    setSelectedItem(null);
  };

  if (!flowers) {
    return <Loading />;
  }

  const images = flowers.images_url;

  return (
    <div className="flex flex-col mb-20 ">
      <div className="md:flex md:px-5 w-full md:mt-5">
        <div className="md:w-1/2 md:max-w-[700px]  md:min-w-[450px] w-full mb-10">
          <FeaturedImageGallery images={images} />
        </div>
        <div className="px-3 flex flex-col md:ml-10 md:w-1/2 md:w-[80%] h-full md:h-[570px] md:overflow-auto scrollbar">
          <span className="text-2xl lg:text-3xl mb-5 text-center font-[400] ">
            {flowers.name}
          </span>
          <span translate="no" className="text-end text-xl mr-10 mb-5">
            100<sup translate="no">.00 lei</sup>
          </span>
          <form className="text-[16px] flex flex-col w-full h-full md:max-h-[365px] justify-between md:mb-20">
            <div className="w-full">
              <div className="grid-cols-2 md:grid-cols-1 grid lg:grid-cols-2 w-full items-end">
                <Input
                  required
                  name="deliveryCity"
                  label="Alege orasul livrarii:"
                  type="select"
                  options={[
                    { value: "Gura Humorului", label: "Gura Humorului" },
                    { value: "Frasin", label: "Frasin" },
                    { value: "Voronet", label: "Voronet" },
                    {
                      value: "Manastrirea Humorului",
                      label: "Manastrirea Humorului",
                    },
                    { value: "Capu Campului", label: "Capu Campului" },
                    { value: "Capu Codrului", label: "Capu Codrului" },
                    { value: "Vama", label: "Vama" },
                  ]}
                  value={formData.deliveryCity}
                  onChange={handleChange}
                />
                <Input
                  required
                  name="deliveryDate"
                  label="Data livrarii:"
                  type="date"
                  dateType="order"
                  value={formData.deliveryDate || "dd.mm.yyyy"}
                  onChange={handleChange}
                />
              </div>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 w-full items-end">
                <Input
                  required
                  name="deliveryInterval"
                  label="Interval orar livrare:"
                  type="select"
                  options={[
                    { value: "08:00-10:00", label: "08:00 - 10:00" },
                    { value: "10:00-12:00", label: "10:00 - 12:00" },
                    { value: "12:00-14:00", label: "12:00 - 14:00" },
                    { value: "14:00-16:00", label: "14:00 - 16:00" },
                    { value: "16:00-18:00", label: "16:00 - 18:00" },
                    { value: "18:00-20:00", label: "18:00 - 20:00" },
                  ]}
                  value={formData.deliveryInterval}
                  onChange={handleChange}
                />
                <Input
                  name="deliveryType"
                  label="Livrare anonima"
                  type="checkbox"
                  checked={formData.deliveryType}
                  onChange={handleChange}
                />
              </div>{" "}
              <Input
                name="deliveryMessage"
                label="Mesaj felicitare"
                type="textarea"
                value={formData.deliveryMessage}
                onChange={handleChange}
              />
            </div>
            <div className="my-5">
              <h3 className="text-center  font-[400] mb-3 text-[15px]">
                ADAUGA CEVA EXTRA
              </h3>
              <div className="ml-5 flex space-x-5 overflow-auto scrollbar">
                {extraItems.map((item) => (
                  <div key={item.id} className="p-3 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="mt-2 text-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[90px] h-[90px] object-cover mb-2"
                      />
                      <span translate="no">{item.name}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <Button
              moreStyle="w-[50%] px-5 m-auto !bg-black text-white hover:!bg-white hover:!text-black  active:bg-white active:text-black"
              type="submit"
              onClick={handleAddToCart}
            >
              Adauga in cos
            </Button>
          </form>
        </div>
      </div>{" "}
      <div className="mx-5 m-10  mt-20">
        <span className="font-bold">
          Buchetul contine:{" "}
          <span className="font-[100] text-sm">
            lisianthus, miniroze si trandafiri de inalta calitate, alese in
            functie de disponibilitate si sezon.
          </span>
          <span className="my-2 flex flex-col">
            Detalii suplimentare:
            <span className="my-1 text-sm font-[100]">
              La produsele cu flori naturale pot exista usoare variatii de
              culoare fata de imaginea prezentata.
            </span>
            <span className="text-sm font-[100]  mb-1">
              Anumite flori din aranjamente pot fi disponibile doar in anumite
              perioade din an.
            </span>
            <span className="text-sm font-[100]">
              Anumite flori din buchet/aranjament pot fi imbobocite dar se vor
              deschide.
            </span>
          </span>
        </span>
      </div>
      {selectedItem && (
        <ExtraItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAdd={() => handleAddExtra(selectedItem)}
        />
      )}
    </div>
  );
}
