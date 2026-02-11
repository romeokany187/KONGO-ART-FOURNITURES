import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-center lg:items-center items-start lg:gap-14 gap-8 py-10">
      <div className="relative flex xl:w-[55%] lg:w-[70%] w-full ">
        <Image
          src="/images/Image 1.jpg"
          alt="image"
          width={1000}
          height={1000}
          className="lg:block w-full rounded-3xl"
        ></Image>
        <div className="lg:top-[75%] xl:top-[75%] lg:left-[2%]  top-[10%] left-[5%] absolute lg:flex flex gap-1 p-2 bg-base-secondary bg-opacity-90 rounded-lg">
          <h1 className="lg:text-4xl text-xl font-bold text-gray-800">+5</h1>
          <p className="font-semibold text-gray-900 text-[0.5rem]">
            Années <br/>
            Experience
          </p>
        </div>
        <div
          className="z-0 lg:top-[10%]  xl:top-[10%] lg:right-[2%] top-[70%] right-[5%] absolute lg:flex flex-col justify-center items-center gap-1 lg:p-2 lg:px-4 px-1 py-[0.4rem] bg-base-secondary
         bg-opacity-90 rounded-lg"
        >
          <h1 className="lg:text-[0.7rem] text-[0.5rem] font-bold text-gray-800 ">250k Temoignages</h1>
          <div className="flex parent justify-center items-center" >
            <div className="rounded-full lg:block hidden lg:w-[45%] w-[25%] h-[100%] ">
              <Image
                src="/assets/avatar1.jpg"
                alt="avatar"
                width={35}
                height={35}
                className="object-cover h-full
              rounded-full"
              ></Image>
            </div>
            <div className=" rounded-full lg:w-[45%]  w-[25%] h-[100%] ">
              <Image
                src="/assets/avatar2.jpeg"
                alt="avatar"
                width={35}
                height={35}
                className="object-cover h-full
              rounded-full "
              ></Image>
            </div>
            <div className="rounded-full lg:w-[45%] lg:h-[100%] w-[25%] h-[100%] ">
              <Image
                src="/assets/avatar1.jpg"
                alt="avatar"
                width={35}
                height={35}
                className="object-cover h-full
              rounded-full"
              ></Image>
            </div>
            <div className="rounded-full cursor-pointer bg-[#00008B] lg:w-[45%] w-[25%] h-[100%]  ">
              <Image
                src="/assets/plus.svg"
                alt="avatar"
                width={35}
                height={35}
                className="object-cover h-full
              rounded-full"
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:w-[50%] w-full ">
        <h1 className="xl:text-6xl lg:text-4xl text-2xl lg:text-start font-extrabold text-black-secondary ">
          <span className="text-green-primary-600">EQUIPEZ VOUS CHEZ</span>  <br /> KONGO ART FOURNITURES
        </h1>
        <p className="lg:text-start text-justify ">
          Mobilier de qualité, conçu avec soin pour allier design, solidité et confort au quotidien.
          Nous créons et sélectionnons des meubles pensés pour valoriser votre intérieur et améliorer
          votre cadre de vie, avec une attention particulière portée aux finitions et aux matériaux durables.
        </p>
        <div className="flex lg:flex-row md:flex-row gap-4 justify-center items-center">
          <Link href="/a-propos">
            <button
              className="lg:p-3 lg:px-12 px-6 py-3 text-sm font-medium text-base-secondary border border-green-primary-600 
            bg-green-primary-600 rounded-lg transition hover:bg-base-secondary hover:text-green-primary-600 flex justify-center items-center gap-3  "
            >
              A PROPOS DE NOUS
              <Image
                src="/assets/fleche.svg"
                alt="avatar"
                width={15}
                height={15}
              ></Image>
            </button>
          </Link>
          <Link href="/produits">
            <button
              className="lg:p-3 lg:px-[3.35rem] px-6 py-3 text-sm font-medium text-green-primary-600 border border-green-primary-600 
            bg-base-primary rounded-lg transition hover:bg-green-primary-600 hover:text-base-primary flex justify-center items-center gap-3 "
            >
              NOS OFFRES
              <Image
                src="/assets/flecheoth.svg"
                alt="avatar"
              width={15}
              height={15}
            ></Image>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
