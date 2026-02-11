import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="lg:flex justify-between grid grid-cols-2 gap-8 grid-flow-row  py-5 lg:px-8 px-4">
      <div className="flex flex-col  items-start space-y-4">
      <Link href="/">
        <div className="z-50 lg:text-2xl text-[1rem] font-extrabold italic cursor-pointer hover:opacity-80 transition">
          KONGO ART <span className='text-green-primary-600'>FOURNITURES</span>
        </div>
      </Link>
        <p className="text-sm">
          Un leader dans la fabrication des meubles de qualité et l'aménagement intérieur
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        <p className="text-sm font-bold">APROPOS</p>
        <div className="flex flex-col justify-between space-y-2 items-start text-sm">
          <Link href="/a-propos" className="hover:text-green-primary-600 transition">Apropos de nous</Link>
          <Link href="/actualites" className="hover:text-green-primary-600 transition">Actualités</Link>
          <Link href="/evenements" className="hover:text-green-primary-600 transition">Evenement</Link>
          <Link href="/blog" className="hover:text-green-primary-600 transition">Blog</Link>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <p className="text-sm  font-bold">COMPANY</p>
        <div className="flex flex-col space-y-2  justify-between items-start text-sm">
          <Link href="/team" className="hover:text-green-primary-600 transition">Notre équipe</Link>
          <Link href="/partenaires" className="hover:text-green-primary-600 transition">Nos partenaires</Link>
          <Link href="/faq" className="hover:text-green-primary-600 transition">FAQ</Link>
          <Link href="/blog" className="hover:text-green-primary-600 transition">Blog</Link>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <p className="text-sm  font-bold">NOS MEDIAS SOCIAUX</p>
        <div className="flex flex-col space-y-2  justify-between items-start text-sm">
          <div className="flex gap-3 cursor-pointer hover:text-green-primary-600 transition">
            <Image
              src="/assets/facebook.svg"
              alt="logo"
              width={20}
              height={20}
            ></Image>
            <p>Notre page</p>
          </div>
          <div className="flex gap-3 cursor-pointer hover:text-green-primary-600 transition">
            <Image
              src="/assets/instagram.svg"
              alt="logo"
              width={20}
              height={20}
            ></Image>
            <p>Notre page</p>
          </div>
          <div className="flex gap-3 cursor-pointer hover:text-green-primary-600 transition">
            <Image
              src="/assets/x.svg"
              alt="logo"
              width={15}
              height={15}
            ></Image>
            <p>Notre page</p>
          </div>
          <div className="flex gap-3 cursor-pointer hover:text-green-primary-600 transition">
            <Image
              src="/assets/linkedin.svg"
              alt="logo"
              width={20}
              height={20}
            ></Image>
            <p>Notre page</p>
          </div>
          <div className="flex gap-3 cursor-pointer hover:text-green-primary-600 transition">
            <Image
              src="/assets/whatsapp.svg"
              alt="logo"
              width={20}
              height={20}
            ></Image>
            <p>Notre groupe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
