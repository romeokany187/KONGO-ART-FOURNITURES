import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutSection = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-between items-center gap-[2rem] mt-8 lg:mb-20 mb-9 ">
      <div className="flex flex-col gap-5 lg:w-[50%] ">
        <p className="text-green-primary-600 lg:text-xl sm:text-sm font-medium uppercase">Apropos de nous</p>
        <div className="xl:text-4xl text-xl text-justify font-extrabold">
          KONGO ART FOURNITURES est une entreprise qui oeuvre dans la fabrication des meubles
        </div>
        <p className="text-justify">
          Nous sommes inscrit dans une logique selon la quelle , nous pouvons bariquer une bonne qualité des meubles
          ici au pays , par ce que nous en avons les qualités nécessaire , l'expérience et les matériaux qu'il faut ,
          nous voulons être une figure national et éradiquer cette idée selon la quelle pour avoir un bon meuble il faut 
          le commande d'ailleurs. Etant coongolais on peut aussi et on fera! 
        </p>
        <div className="flex justify-between items-center gap-8">
          <div className="flex flex-col">
            <p className="text-3xl font-extrabold">200k</p>
            <p className="text-xs">
              Meubles vendus <br />
              PAR ANS
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-3xl font-extrabold">05+</p>
            <p className="text-xs">
              ANNEES <br />
              EXPERIENCE
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-3xl font-extrabold">200k</p>
            <p className="text-xs">
              Menages, Bureaux...meublés <br />
              PAR ANS
            </p>
          </div>
        </div>
        
      </div>
      <div className="relative lg:w-[50%] w-full h-[22rem] ">
        <Image
          src="/images/Image 4.jpg"
          alt="about us"
          width={2000}
          height={2000}
          className="object-none h-full rounded-xl border "
        ></Image>
        <div className="hidden lg:flex flex-col justify-center items-center gap-4 absolute top-[75%]  right-[10%] p-4 rounded-lg bg-white shadow-md ">
          <div className="h-[10vh] w-[5vw] bg-black-secondary rounded-full p-2">
            <Image
              src="/images/logo%20KAF.png"
              alt="KONGO ART FOURNITURES"
              width={56}
              height={56}
              className="rounded-full w-full h-full object-contain"
            ></Image>
          </div>
          <p className="text-xs text-center text-black-primary">
            Transformez <br className="mb-1" /> votre interieur  avec<br />
            KONGO ART FOURNITURES
          </p>
        </div>
      </div>
      <Link
          href="/infos"
          className="underline text-green-primary-600 font-semibold self-start"
        >
          Pour plus d'infos
        </Link>
    </div>
  );
};

export default AboutSection;
