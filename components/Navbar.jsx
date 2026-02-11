"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import ButtonMenu from './ButtonMenu'

const Navbar = () => {
  return (
    <div className="flex justify-between  py-2 xl:px-[10rem] lg:px-[5rem] md:px-[2rem] px-6 top-0 sticky bg-white z-50">
      <Link href="/">
        <div className="z-50 lg:text-2xl text-[1rem] font-extrabold italic cursor-pointer hover:opacity-80 transition">
          KONGO ART <span className='text-green-primary-600'>FOURNITURES</span>
        </div>
      </Link>
      <div className="lg:flex justify-center items-center lg:gap-8 hidden text-sm  font-bold" >
        <Link href="/">Accueil</Link>
        <Link href="/produits">Produits</Link>
        <Link href="/services">Services</Link>
        <Link href="/a-propos">À propos</Link>
      </div>
      <div className="lg:hidden flex">
        <LanguageSwitcher />
        <ButtonMenu />
      </div>


      <button className="lg:block hidden p-2 border-2 border-green-primary-600 text-green-primary-600 rounded-lg
        transition ease-in-out hover:bg-green-primary-600 hover:text-white">Contactez-nous</button>
    </div >
  )
}

export default Navbar