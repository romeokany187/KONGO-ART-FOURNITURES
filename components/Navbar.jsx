"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import ButtonMenu from './ButtonMenu'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

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

      <div className="lg:flex items-center gap-4 hidden">
        {session?.user ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm font-semibold">{session.user.name}</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                  👤 Mon profil
                </Link>
                <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                  📦 Mes Commandes
                </Link>
                <Link href="/cart" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                  🛒 Mon Panier
                </Link>
                <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                  ⚙️ Paramètres
                </Link>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 text-sm border-t">
                  📊 Dashboard
                </Link>
                <button
                  onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm font-semibold border-t"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth/signin">
            <button className="p-2 border-2 border-green-primary-600 text-green-primary-600 rounded-lg
              transition ease-in-out hover:bg-green-primary-600 hover:text-white">
              Connexion
            </button>
          </Link>
        )}
      </div>
    </div >
  )
}

export default Navbar