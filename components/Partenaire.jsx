import Image from "next/image";
import React from "react";

const Partenaire = () => {
  return (
    <div className="lg:flex md:flex justify-around items-center grid-cols-2 px-[0rem] mb-8 lg:h-[30vh] h-[50vh] ml-8 md:ml-0 lg:ml-0 hidden ">
      <div className=""> 
        <Image
          src="/images/SOSO_5.png"
          alt="partenaires"
          width={150}
          height={150}
          className=""
        ></Image>
      </div>
      <div className="">
        <Image
          src="/images/tunda_4.png"
          alt="partenaires"
          width={150}
          height={150}
        ></Image>
      </div>
      <div className="">
        <Image
          src="/images/M_6.png"
          alt="partenaires"
          width={150}
          height={150}
        ></Image>
      </div>
      <div className="">
        <Image
          src="/images/malcat_2.png"
          alt="partenaires"
          width={150}
          height={150}
        ></Image>
      </div>
    </div>
  );
};

export default Partenaire;
