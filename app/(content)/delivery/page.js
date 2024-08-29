import Title from "@/components/util/title";
import React from "react";

export default function page() {
  return (
    <div className="m-10 text-[#505050]">
      <Title moreStyle="text-black">LIVRARE SI RETUR</Title>
      <p className=" mb-5" />
      <span className="font-bold text-black"> Livrarea </span> produselor
      comandate se efectuaza de Luni pana Duminica,in intervale selectabile
      inainte de a efectua o comanda pe site.
      <p className="my-3" />
      Intervalele de livrare sunt:
      <p className="mt-1" /> 08:00-10:00
      <p /> 10:00-12:00
      <p /> 12:00-14:00
      <p />
      14:00-16:00
      <p /> 16:00-20:00.
      <p className="mb-5" />
      Va informam ca nu putem garanta si nu ne asumam o ora exacta de livrare.
      <p className="my-3" />
      <span className="font-bold text-black"> Livrarea </span> se poate face
      oricand in orele din intervalul orar selectat de dvs inaintea efectuarii
      comenzii. Daca clientul nu mai poate receptiona comanda la momentul
      livrarii, coletul se ridica de la sediul nostru sau livrarea se reia
      contra cost a doua zi. Costul reluarii livrarii este 48 de lei. Florile ce
      se intorc ajung la vanzare in magazinul nostru iar produsul se reface a
      doua zi cu flori proaspete. In functie de comenzile zilnice livram cu
      curieri proprii sau curieri parteneri. Daca comanda este livrata cu
      curieri parteneri, nu detinem informatii legate de locatia exacta a
      livratorului sau ora la care se efectueaza livrarea. Veti primi un email
      de confirmare in momentul cand destinatarul receptioneaza comanda.
      <p className="my-3" />
      Va instiintam ca intervalele de livrare sunt orientative si exista
      situatii exceptionale ce nu depind de serviciul nostru de livrare, in care
      pot exista intarzieri. Pentru ca livram intotdeauna flori proaspete
      comandate zilnic de la furnizorii nostri, suntem uneori restrictionati de
      ora zilei in care se face receptia. Asadar, intervalul de livrare de 2
      pana la 6 ore poate depinde de stocul produselor din ziua respectiva si
      momentul in care primim produsele de la producatori. Va sfatuim sa
      intrebati telefonic sau pe chat-ul de pe site disponibilitatea
      intervalului orar de livrare inainte de a plasa comanda pentru a evita
      eventualele neplaceri.
      <p className="mt-3" />
      <span className="font-bold text-black"> Livrarea </span> este calcuata in
      functie de distanta parcursa de curierat.
      <p className="mt-10 text-xl">
        {" "}
        <Title moreStyle="text-black">RETURUL PRODUSELOR</Title>
      </p>
      <p className="mt-3" />
      Conform legislatiei in vigoare, produsele perisabile{" "}
      <span className="font-bold text-black"> nu pot fi returnate. </span>
    </div>
  );
}
