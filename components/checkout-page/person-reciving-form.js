import React from "react";
import Input from "../util/input";
import Button from "../util/button";

export default function PersonRecivingForm({
  recipientInfo,
  handleRecipientChange,
  handleCalculateDistance,
  shippingFee,
  isCalculating,
  setErrorMessage,
}) {
  const validateFields = () => {
    const {
      deliveryCity,
      personReceivingStreetName,
      personReceivingStreetNumber,
      personReceivingPostalCode,
    } = recipientInfo;

    if (
      !deliveryCity ||
      !personReceivingStreetName ||
      !personReceivingStreetNumber ||
      !personReceivingPostalCode
    ) {
      setErrorMessage(
        "Toate campurile sunt obligatorii pentru calcularea distantei."
      );
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleButtonClick = () => {
    if (validateFields()) {
      handleCalculateDistance();
    }
  };

  return (
    <div className="flex flex-col bg-white drop-shadow-[0_0px_10px_rgba(0,0,0,0.15)] rounded-sm p-10 my-10 mx-5">
      <h2 className="text-lg font-[600]">
        <span className="border border-[rgb(155,47,14)] rounded-full px-2 py-1.5">
          2.
        </span>{" "}
        Cine primeste cadoul?
      </h2>
      <div className="flex flex-col md:flex-row">
        <Input
          required
          type="text"
          name="personReceivingFullName"
          label="Nume Complet"
          value={recipientInfo.personReceivingFullName}
          onChange={handleRecipientChange}
        />
        <Input
          required
          type="tel"
          pattern="[0-9]{10}"
          name="personReceivingPhone"
          label="Telefon"
          value={recipientInfo.personReceivingPhone}
          onChange={handleRecipientChange}
        />
      </div>
      <div className="flex flex-col w-full md:flex-row">
        <Input
          name="deliveryCity"
          label="Alege orasul livrarii:"
          value={recipientInfo.deliveryCity}
          onChange={handleRecipientChange}
          type="select"
          options={[
            { value: "Gura Humorului", label: "Gura Humorului" },
            { value: "Frasin", label: "Frasin" },
            { value: "Voronet", label: "Voronet" },
            { value: "Manastrirea Humorului", label: "Manastrirea Humorului" },
            { value: "Capu Campului", label: "Capu Campului" },
            { value: "Capu Codrului", label: "Capu Codrului" },
            { value: "Vama", label: "Vama" },
          ]}
        />
        <Input
          required
          type="text"
          label="Numele strazii:"
          name="personReceivingStreetName"
          value={recipientInfo.personReceivingStreetName}
          onChange={handleRecipientChange}
          placeholder="Numele strazii"
          className="border border-gray-300 rounded-md p-1"
        />
      </div>

      <div className="flex w-full">
        <div className="w-1/2">
          <Input
            required
            type="text"
            name="personReceivingStreetNumber"
            label="Numarul Strazii:"
            value={recipientInfo.personReceivingStreetNumber}
            onChange={handleRecipientChange}
            placeholder="Numarul strazii"
            className="border border-gray-300 rounded-md p-1"
          />
        </div>
        <div className="w-1/2">
          <Input
            required
            label="Cod Postal:"
            name="personReceivingPostalCode"
            type="text"
            value={recipientInfo.personReceivingPostalCode}
            onChange={handleRecipientChange}
            placeholder="Codul postal"
            className="border border-gray-300 rounded-md p-1"
          />
        </div>
      </div>
      <Input
        label="Scara, Bloc, Etaj, Ap., Alte specificatii:"
        name="personReceivingOther"
        type="text"
        value={recipientInfo.personReceivingOther}
        onChange={handleRecipientChange}
        placeholder="Scara, Bloc, Etaj, Ap., Alte specificatii"
        className="border border-gray-300 rounded-md p-1"
      />
      <div className="flex flex-col items-center justify-between w-full mt-[50px] mb-5 px-5">
        <span className="text-xs ml-5 mb-3 pr-5">
          <span className="border border-[rgb(155,47,14)] rounded-full px-1.5 text-[rgb(155,47,14)] mr-1 font-[600] ">
            i
          </span>{" "}
          <span>Livrarea trebuie calculata inainte de a merge la plata</span>
        </span>
        <Button
          type="button"
          moreStyle="w-full md:w-[35vw] mb-5 whitespace-nowrap py-[0.4rem] text-[15px]"
          onClick={handleButtonClick}
        >
          {isCalculating ? "Calculeaza..." : "Calculeaza Livrarea"}
        </Button>
        <p>
          Cost Livrare:{" "}
          <span className="font-[100] text-[15px]">
            {shippingFee.toFixed(2)} lei
          </span>
        </p>
      </div>
    </div>
  );
}
