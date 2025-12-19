import Image from "next/image";
import React from "react";

const Athletes = () => {
  return (
    <div
      className="flex lg:flex-row flex-col bg-teal-700 bg-opacity-65 justify-center lg:gap-9 gap-2 items-center lg:pr-5 pr-0 lg:pb-0 pb-[0.9rem] text-white
     lg:h-auto h-auto mt-[5rem] "
    >
      <Image
        src="/images/Image 41.jpg"
        width={700}
        height={700}
        className="lg:block lg:w-[50%] w-full h-full"
      ></Image>

      <div className=" block  px-6 lg:space-y-11 space-y-5 lg:w-[50%] w-full ">
        <p className="text-3xl font-extrabold mt-3">UNE EQUIPE EXPERIMENTEE</p>
        <p className="text-justify">
         KIVU ART & CONFORT met à votre disposition une équipe d'ingénieurs et 
         des techniciens qualifiés pour la conception et la fabrication des vos meubles sur mesure.
         Une équipe expérimentée qui vous accompagne dans la réalisation de vos projets d'aménagement intérieur.
        </p>

        <button
          className="lg:p-3 px-14 py-3 text-sm font-medium text-base-secondary border border-green-primary 
          bg-green-primary rounded-lg transition hover:bg-base-secondary hover:text-green-primary"
        >
          Découvrir
        </button>
      </div>
    </div>
  );
};

export default Athletes;
