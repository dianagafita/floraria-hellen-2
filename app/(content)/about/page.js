"use client";
import Image from "next/image";
import React from "react";
import ScrollComponent from "./gal";
import ScrollComponentReverse from "./reverse-gallery-comp";
import img from "./10.jpeg";
import img1 from "./profil.jpeg";
import img2 from "./11.jpeg";
import img3 from "./3.jpg";

export default function page() {
  return (
    <section className="text-center my-10 mb-20 flex flex-col w-full px-5 g-[#481818] text-white">
      <div className="flex flex-col  bg-white px-5">
        {/* <Image
          src={img1}
          alt=""
          className="w-full h-full max-w-[350px] max-h-[400px] md:w-1/2 mx-auto md:mx-0"
        /> */}

        <div className=" text-black md:pl-10 font-[100] text-[16px] lg:text-[15px] text-center">
          <h2 className="fontElegant mb-10 text-3xl text-center md:mt-0 mt-10">
            Despre Fondatorul Nostru
          </h2>
          <p>
            <span className="ml-10 ">În</span> spatele fiecărui aranjament
            floral stă o persoană cu o pasiune infinită pentru flori și detalii.
            Lenuta Geangos, fondatoarea și creatoarea din spatele magazinului
            Floraria Hellen, este o artistă florală cu o experiență de peste 15
            ani în domeniu. Pentru ea, fiecare floare spune o poveste, iar
            fiecare eveniment este o oportunitate de a aduce bucurie și
            frumusețe în viețile celor din jur. Cu o dragoste profundă pentru
            natură și o atenție deosebită la detalii, Lenuta Geangos își dedică
            fiecare zi creării unor opere florale unice, care depășesc
            așteptările.
          </p>
          <div className="hidden lg:flex lg:flex-col mt-10 text-black font-[100] text-start w-full">
            <p>
              <span className="ml-10">Misiunea</span> noastră este simplă: să
              aducem zâmbete pe fețele celor care primesc florile noastre și să
              transformăm fiecare eveniment într-o experiență de neuitat. Ne
              dorim ca florile noastre să fie mai mult decât simple decorațiuni
              – ele să devină piese centrale care spun o poveste despre
              dragoste, bucurie și frumusețe.
            </p>
            <p className="mt-5 ">
              <span className="ml-10">Vă</span> invităm să descoperiți lumea
              magică a florilor și să ne permiteți să fim parte din momentele
              speciale din viața voastră!
            </p>
          </div>
        </div>
      </div>

      {/* Second Part of Text - Appears under the image on medium and smaller screens */}
      <div className="flex flex-col lg:hidden mt-10 text-black px-5 md:px-10 font-[100] text-start md:w-full">
        <p>
          <span className="ml-10">Misiunea</span> noastră este simplă: să aducem
          zâmbete pe fețele celor care primesc florile noastre și să transformăm
          fiecare eveniment într-o experiență de neuitat. Ne dorim ca florile
          noastre să fie mai mult decât simple decorațiuni – ele să devină piese
          centrale care spun o poveste despre dragoste, bucurie și frumusețe.
        </p>
        <p className="mt-5 ">
          <span className="ml-10">Vă</span> invităm să descoperiți lumea magică
          a florilor și să ne permiteți să fim parte din momentele speciale din
          viața voastră!
        </p>
      </div>

      {/* Achievements Section */}
      <span className="text-3xl font-[300] my-10 text-black fontElegant">
        REALIZARI
      </span>
      <ScrollComponent images={[img, img3]} />
      <ScrollComponentReverse />
    </section>
  );
}
