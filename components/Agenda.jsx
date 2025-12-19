import Image from "next/image";
import React from "react";

const Agenda = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-between lg:gap-[3rem] gap-5 lg:mt-10 mt-7 mb-8 lg:p-8 p-0">
      <div className="lg:w-[40%] w-full h-full ">
        <Image src="/images/Image 3.jpg" width={1000} height={1000} className="w-full rounded-[2rem]"></Image>
      </div>
      <div className="flex flex-col justify-start items-start space-y-9 pt-11 pb-9 lg:ml-9 ml-0 lg:w-[60%] w-full ">
        <p className="text-sm text-green-primary font-semibold">
          KAC VOUS PROPOSE DES MEUBELS DE QUALITE
        </p>
        <p className="xl:text-3xl text-2xl font-extrabold">
          UN LEADER INCONTOURNABLE DANS SON DOMAINE
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="px-2 py-[0.1rem] border border-green-primary text-green-primary rounded-lg">
            +
          </div>
          <p>Trouver des meubles</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="px-2 py-[0.1rem] border border-green-primary text-green-primary rounded-lg">
            +
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <p>
              Recourir à un de nos services 
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="px-2 py-[0.1rem] border border-green-primary text-green-primary rounded-lg">
            +
          </div>
          <p>Laisser un avis</p>
        </div>

        <button
          className="lg:p-3 px-12 py-3 text-sm font-medium text-base-secondary border border-green-primary 
          bg-green-primary rounded-lg transition hover:bg-base-secondary hover:text-green-primary"
        >
          Visiter  le blog
        </button>
      </div>
    </div>
  );
};

export default Agenda;
