import Input from "../util/input";

export default function PersonSendingForm({ senderInfo, handleSenderChange }) {
  return (
    <div className="flex flex-col bg-white drop-shadow-[0_0px_10px_rgba(0,0,0,0.15)] rounded-sm p-10 my-10 mx-5">
      <h2 className="text-lg font-[600]">
        <span className="border border-[rgb(155,47,14)] rounded-full px-2 py-1.5">
          1.
        </span>{" "}
        Cine trimite cadoul?
      </h2>

      <div className="flex flex-col md:flex-row">
        <Input
          required
          type="text"
          name="personSendingFirstName"
          label="Nume"
          value={senderInfo.personSendingFirstName}
          onChange={handleSenderChange}
        />
        <Input
          required
          type="text"
          name="personSendingSecondName"
          label="Prenume"
          value={senderInfo.personSendingSecondName}
          onChange={handleSenderChange}
        />
      </div>
      <div className="flex flex-col md:flex-row">
        <Input
          required
          type="text"
          name="personSendingEmail"
          label="E-mail"
          value={senderInfo.personSendingEmail}
          onChange={handleSenderChange}
        />
        <Input
          required
          type="tel"
          pattern="[0-9]{10}"
          name="personSendingPhone"
          label="Telefon"
          value={senderInfo.personSendingPhone}
          onChange={handleSenderChange}
        />
      </div>
      <span className="text-xs ml-5 my-6 pr-5">
        <span className="border border-[rgb(155,47,14)] rounded-full px-1.5 text-[rgb(155,47,14)] mr-2 font-[600]">
          i
        </span>
        <span className="font-[100] text-[12px]">
          Factura se emite exculiv online și pe email. Nicio factură nu ajunge
          la beneficiarul cadoului.
        </span>
      </span>
    </div>
  );
}
