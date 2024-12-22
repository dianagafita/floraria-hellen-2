import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Button from "../util/button";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./payment-form";
import { loadStripe } from "@stripe/stripe-js";
import { convertToSubcurrency } from "@/lib/convertToSubcurrency";
import PersonSendingForm from "./person-sending-form";
import PersonRecivingForm from "./person-reciving-form";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error(
    "process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined!"
  );
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutForm({
  handleCalculateDistance,
  setAddress,
  address,
  userId,
  isCalculating,
  shippingFee,
  cartTotal,
  cartItems,
}) {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isDeliveryCalculated, setIsDeliveryCalculated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/valid");
        const data = await response.json();
        if (data.userId) {
          const userResponse = await fetch(`/api/user/${data.userId}`);
          const userData = await userResponse.json();
          setUser(userData);
          setSenderInfo({
            personSendingEmail: userData.email || "",
            personSendingFirstName: userData.first_name || "",
            personSendingSecondName: userData.second_name || "",
            personSendingPhone: userData.phone || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const [senderInfo, setSenderInfo] = useState({
    personSendingEmail: "",
    personSendingFirstName: "",
    personSendingSecondName: "",
    personSendingPhone: "",
  });

  const [recipientInfo, setRecipientInfo] = useState({
    personReceivingFullName: "",
    personReceivingPhone: "",
    deliveryCity: "Gura Humorului",
    personReceivingStreetName: "",
    personReceivingStreetNumber: "",
    personReceivingPostalCode: "",
    personReceivingOther: "",
  });

  useEffect(() => {
    if (shippingFee > 0) {
      setIsDeliveryCalculated(true);
    }
  }, [shippingFee]);

  useEffect(() => {
    setAddress({
      city: recipientInfo.deliveryCity,
      street: recipientInfo.personReceivingStreetName,
      number: recipientInfo.personReceivingStreetNumber,
      postalCode: recipientInfo.personReceivingPostalCode,
    });
  }, [recipientInfo, setAddress]);

  const handleSenderChange = (e) => {
    setSenderInfo({
      ...senderInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecipientChange = (e) => {
    setRecipientInfo({
      ...recipientInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const senderComplete = Object.values(senderInfo).every(
      (value) => value.trim() !== ""
    );

    const recipientComplete = Object.keys(recipientInfo).every(
      (key) =>
        key === "personReceivingOther" || recipientInfo[key].trim() !== ""
    );

    if (!isDeliveryCalculated) {
      setErrorMessage("Calculează livrarea înainte de a trece la plată!");
      return;
    }

    if (senderComplete && recipientComplete && isDeliveryCalculated) {
      setIsFormComplete(true);
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Completați toate câmpurile obligatorii înainte de a merge la plată!"
      );
    }
  };

  const amount = cartTotal + shippingFee;

  return (
    <div className="flex flex-col w-full h-full md:h-[100vh] md:overflow-auto">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="h-full w-full">
          <PersonSendingForm
            senderInfo={senderInfo}
            handleSenderChange={handleSenderChange}
          />
          <PersonRecivingForm
            recipientInfo={recipientInfo}
            handleRecipientChange={handleRecipientChange}
            handleCalculateDistance={handleCalculateDistance}
            shippingFee={shippingFee}
            isCalculating={isCalculating}
            setErrorMessage={setErrorMessage}
          />
          <div className="flex flex-col items-center justify-between pb-7 px-5">
            <Button
              type="submit"
              moreStyle="w-[75vw] md:w-[35vw] mb-2 whitespace-nowrap py-[0.4rem] text-[15px]"
            >
              Mergi la plată
            </Button>
            <span className="text-red-900 my-1 text-[13px] font-[100]">
              {errorMessage}
            </span>
          </div>
        </div>
      </form>

      {isFormComplete && (
        <div className="h-auto p-10 m-5 bg-white drop-shadow-[0_0px_10px_rgba(0,0,0,0.15)] rounded-sm">
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(amount, 100),
              currency: "ron",
            }}
          >
            <PaymentForm
              userId={userId}
              amount={amount}
              cartItems={cartItems}
              recipientInfo={recipientInfo}
              senderInfo={senderInfo}
              shippingFee={shippingFee}
              cartTotal={cartTotal}
            />
          </Elements>
        </div>
      )}

      <div className="flex justify-between pb-7">
        <Link className="font-[300] text-[12px] flex items-center" href="/cart">
          <ChevronLeft className="ml-2 mr-1" strokeWidth={1} size={15} />
          Reveniți la coș
        </Link>
      </div>
    </div>
  );
}
