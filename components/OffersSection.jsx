"use client";
import React from "react";
import Link from "next/link";
import OfferCard from "./OfferCard";

const OffersSection = () => {
  return (
    <div className="lg:p-6 mt-14 flex flex-col gap-10">
      <div className="flex flex-col gap-4 justify-center lg:items-center md:items-center items-start lg:text-center md:text-center text-left">
        <p className="text-sm text-green-primary-600 font-medium">
          CE QUE NOUS FAISONS
        </p>
        <h1 className="lg:text-4xl text-2xl font-extrabold text-gray-800">
          Nous offrons commproduits & services
        </h1>
        <p className="text-justify">
          Nous offront comme produits, des meubles de bonne qualité pour vos maisons , bureaux , bars, salle d'audiances
          et réunions, chambres d'hotels et pour birn d'autres endroits... <br />
          Nous prestons aussi des services coomme la livraison des meubles achetés chez nous, la maintenance et reparation
          des vos meubles , et nous proposont des séances de consulataions gratuites pour toutes vos préocupation de toutes
          genres.
        </p>
      </div>
      <div className="flex flex-col gap-8 mb-8">
        <div className="flex justify-between flex-col gap-3">
          <p className="text-2xl font-bold text-green-primary-600">Tables</p>
          <div className="grid lg:grid-cols-4  grid-cols-2 lg:gap-8 gap-2">
            <OfferCard head="50$" sub="Table basse" img="/images/Image 14.jpg" href="/meubeles/tables" />
            <OfferCard head="70$" sub="Table basse" img="/images/Image 34.jpg" href="/meubeles/tables" />
            <OfferCard head="65$" sub="Table basse" img="/images/Image 35.jpg" href="/meubeles/tables" />
            <OfferCard head="95$" sub="Table basse" img="/images/Image 36.jpg" href="/meubeles/tables" />
          </div>
          <Link href="/produits">
            <button
              className="lg:p-3 px-[3.35rem] py-3 text-sm font-medium text-green-primary-600 border border-green-primary-600 
                      bg-base-primary rounded-lg transition hover:bg-green-primary-600 hover:text-base-primary flex 
                      justify-center items-center gap-3 lg:self-end self-center "
            >
              VOIR PLUS DES MEUBLES
            </button>
          </Link>
        </div>
        <div className="flex justify-between flex-col gap-3">
          <p className="text-2xl font-bold text-green-primary-600">Chaises</p>
          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-2">
            <OfferCard head="50$" sub="chaise basse" img="/images/Image 16.jpg" href="/meubeles/tables" />
            <OfferCard head="30$" sub="chaise basse" img="/images/Image 17.jpg" href="/meubeles/tables" />
            <OfferCard head="45$" sub="chaise basse" img="/images/Image 18.jpg" href="/meubeles/tables" />
            <OfferCard head="20$" sub="chaise basse" img="/images/Image 40.jpg" href="/meubeles/tables" />
          </div>
          <Link href="/produits">
            <button
              className="lg:p-3 px-[3.35rem] py-3 text-sm font-medium text-green-primary-600 border border-green-primary-600 
                      bg-base-primary rounded-lg transition hover:bg-green-primary-600 hover:text-base-primary flex 
                      justify-center items-center gap-3 lg:self-end self-center "
            >
              VOIR PLUS DES MEUBLES
            </button>
          </Link>
        </div>
        <div className="flex justify-between flex-col gap-3">
          <p className="text-2xl font-bold text-green-primary-600">SALONS</p>
          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-2">
            <OfferCard head="500$"  sub="Salle à manger" img="/images/Image 11.jpg" href="/meubeles/tables" />
            <OfferCard head="1005$" sub="Salle à manger" img="/images/Image 12.jpg" href="/meubeles/tables" />
            <OfferCard head="955$"  sub="Salle à manger" img="/images/Image 27.jpg" href="/meubeles/tables" />
            <OfferCard head="700$"  sub="Salle à manger" img="/images/Image 29.jpg" href="/meubeles/tables" />
          </div>
          <Link href="/produits">
            <button
              className="lg:p-3 px-[3.35rem] py-3 text-sm font-medium text-green-primary-600 border border-green-primary-600 
                      bg-base-primary rounded-lg transition hover:bg-green-primary-600 hover:text-base-primary flex 
                      justify-center items-center gap-3 lg:self-end self-center "
            >
              VOIR PLUS DES MEUBLES
            </button>
          </Link>
        </div>
        <div className="flex justify-between flex-col gap-3">
          <p className="text-2xl font-bold text-green-primary-600">Fauteils & Lits</p>
          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-2">
            <OfferCard head="700$"  sub="Lits à coucher" img="/images/Image 20.jpg" href="/meubeles/tables" />
            <OfferCard head="1875$" sub="Fauteil pour salon" img="/images/Image 32.jpg" href="/meubeles/tables" />
            <OfferCard head="865$"  sub="Lits à coucher" img="/images/Image 19.jpg" href="/meubeles/tables" />
            <OfferCard head="1030$"  sub="Fauteil pour salon" img="/images/Image 33.jpg" href="/meubeles/tables" />
          </div>
          <Link href="/produits">
            <button
              className="lg:p-3 px-[3.35rem] py-3 text-sm font-medium text-green-primary-600 border border-green-primary-600 
                      bg-base-primary rounded-lg transition hover:bg-green-primary-600 hover:text-base-primary flex 
                      justify-center items-center gap-3 lg:self-end self-center "
            >
              VOIR PLUS DES MEUBLES
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default OffersSection;