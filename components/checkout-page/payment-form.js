"use client";

import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import Button from "../util/button";

export default function PaymentForm({
  amount,
  cartItems,
  senderInfo,
  userId,
  recipientInfo,
  shippingFee,
  cartTotal,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const createOrder = async () => {
    const products = cartItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      productDeliveryInfo: [
        item.product.formData.deliveryCity,
        item.product.formData.deliveryDate,
        item.product.formData.deliveryInterval,
        item.product.formData.deliveryMessage,
        String(item.product.formData.deliveryType),
      ],
      extras: item.product.extras || [],
    }));

    const orderData = {
      userId: userId,
      products: products,
      shippingFee: parseInt(shippingFee),
      cartTotal: parseFloat(cartTotal),
      senderInfo,
      recipientInfo,
      totalPrice: parseFloat(amount),
      orderState: "placed",
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    if (data.error) {
      console.error("Error creating order:", data.error);
      return null;
    } else {
      localStorage.removeItem("cart");
      return data.id;
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // Validate the payment form first
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    // Create the order
    const newOrderId = await createOrder();
    if (!newOrderId) {
      setErrorMessage("Eroare la crearea comenzii. Încercați din nou.");
      setLoading(false);
      return;
    }

    // Confirm the payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `https://www.hellenproparty.ro/payment-success?orderId=${newOrderId}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <PaymentElement />
      {errorMessage && (
        <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
      )}
      <Button
        moreStyle="w-[75vw] md:w-[35vw] mt-10 mb-2 whitespace-nowrap py-[0.4rem] text-[15px]"
        type="submit"
        disabled={!stripe || loading}
      >
        {!loading ? `Plateste ${amount} lei` : "Procesare..."}
      </Button>
    </form>
  );
}
