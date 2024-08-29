"use client";

import { useState } from "react";
import Button from "@/components/util/button";
import Input from "@/components/util/input";
import Title from "@/components/util/title";

export default function Page({ currentDate }) {
  const initialFormData = {
    requestOfferFullName: "",
    requestOfferPhone: "",
    requestOfferEmail: "",
    requestOfferDate: "",
    requestOfferEvent: "nunta",
    requestOfferMaxBuget: "",
    requestOfferNrInvitati: "",
    requestOfferNrMese: "",
    requestOfferDetails: "",
    requestOfferProductID: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submit, setSubmit] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const response = await fetch("/api/request-offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData(initialFormData);
        setSubmit(false);
      } else {
        setSubmit(false);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmit(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center my-10 px-4 lg:px-8">
      <Title moreStyle="mb-3">OFERTA</Title>
      <span className="text-[15px] font-[100] mb-10 text-[#505050] text-center">
        Completati formularul pentru a solicita o oferta pentru evenimentul
        dumneavoastra
      </span>
      <form
        className="w-[400px] md:w-full md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col space-y-1"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row gap-1">
          <Input
            required
            name="requestOfferFullName"
            label="NUME COMPLET"
            value={formData.requestOfferFullName}
            onChange={handleInputChange}
          />
          <Input
            required
            type="tel"
            pattern="[0-9]{10}"
            name="requestOfferPhone"
            label="TELEFON"
            value={formData.requestOfferPhone}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-1">
          <Input
            required
            name="requestOfferEmail"
            label="E-MAIL"
            value={formData.requestOfferEmail}
            onChange={handleInputChange}
          />
          <Input
            required
            type="date"
            name="requestOfferDate"
            label="DATA EVENIMENTULUI"
            value={formData.requestOfferDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-1">
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <Input
              required
              name="requestOfferEvent"
              type="select"
              options={[
                { value: "nunta", label: "NUNTA" },
                { value: "botez", label: "BOTEZ" },
              ]}
              label="TIP EVENIMENT"
              value={formData.requestOfferEvent}
              onChange={handleInputChange}
            />
            <Input
              required
              type="number"
              name="requestOfferMaxBuget"
              label="BUGET MAXIM (LEI)"
              more="w-full"
              value={formData.requestOfferMaxBuget}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-1">
            <Input
              required
              type="number"
              name="requestOfferNrInvitati"
              label="NUMAR INVITATI"
              value={formData.requestOfferNrInvitati}
              onChange={handleInputChange}
            />
            <Input
              required
              type="number"
              name="requestOfferNrMese"
              label="NUMAR MESE"
              value={formData.requestOfferNrMese}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Input
          required
          type="textarea"
          name="requestOfferDetails"
          label="MAI MULTE DETALII"
          value={formData.requestOfferDetails}
          onChange={handleInputChange}
        />
        <Input
          required
          name="requestOfferProductID"
          label="CE PRODUSE VA INTERESEAZA?(ID-ul)"
          value={formData.requestOfferProductID}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          moreStyle="!mt-20 px-5 !bg-black text-white w-[300px] m-auto"
        >
          {submit ? "TRIMITEM CEREREA..." : "CERE OFERTA"}
        </Button>
      </form>
      <p className="mt-4 text-gray-600">{currentDate}</p>
    </div>
  );
}
