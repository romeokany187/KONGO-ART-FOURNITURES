import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ img, head, sub, href, alt }) => {
  return (
    
      <div className="p-5 flex flex-col gap-4 text-center rounded-xl shadow bg-white h-full">
        <Link href={href} className="relative w-full h-40">
          <Image
            src={img}
            width={500}
            height={500}
            alt={alt}
            className="rounded-lg w-full h-full object-cover "
          ></Image>
        </Link>
        <p className="text-xl text-gray-800 font-semibold">{head}</p>
        <p className="text-xs">{sub}</p>
      </div>
  );
};

export default Card;
