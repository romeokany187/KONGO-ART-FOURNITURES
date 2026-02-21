"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import MobileMenu from './MobileMenu'
import { useSession, signOut } from 'next-auth/react'

const SiteNavbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="flex justify-between items-center py-1 xl:px-[10rem] lg:px-[5rem] md:px-[2rem] px-6 top-0 sticky bg-white z-50">
      <Link href="/" className="z-50 hover:opacity-80 transition w-[5rem] h-[5rem] rounded-full">
        <Image
          src="/images/logo%20KAF.png"
          alt="KONGO ART FOURNITURES"
          width={160}
          height={48}
          className="h-full w-full "
          priority
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="lg:flex justify-center items-center lg:gap-8 hidden text-sm font-bold">
        <Link href="/">Accueil</Link>
        <Link href="/produits">Produits</Link>
        <Link href="/services">Services</Link>
        <Link href="/a-propos">À propos</Link>
      </div>

      {/* Desktop User Menu */}
      <div className="lg:flex items-center gap-4 hidden">
        <Link href="/contact">
          <button className="p-2 border-2 border-green-primary-600 text-green-primary-600 rounded-lg
            transition ease-in-out hover:bg-green-primary-600 hover:text-white">
            Contactez-nous
          </button>
        </Link>
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

      {/* Mobile Menu Button (only visible on mobile) */}
      <div className="lg:hidden flex">
        <MobileMenu />
      </div>
    </div>
  )
}

export default SiteNavbar