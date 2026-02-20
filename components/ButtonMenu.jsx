import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion"
import { useSession, signOut } from 'next-auth/react'


const ButtonMenu = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const { data: session } = useSession()

    const toggleMenu = () => {
        return setMenuOpen(!menuOpen)
    }

    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/' })
    }

    return (
        <>
            <button
                onClick={toggleMenu}
                className="flex gap-4 items-center justify-center p-2  text-gray-800 T rounded-md z-50 bg-gray-200 ml-3"
            >
                <p className="font-bold text-xs">MENU</p>
                <motion.div
                    animate={{ rotate: menuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image
                        src={menuOpen ? '/assets/close.svg' : '/assets/menu.svg'}
                        alt="open menu"
                        width={17}
                        height={17}
                    />
                </motion.div>
            </button>

            <AnimatePresence>

                {menuOpen &&
                    (

                        <motion.div
                            initial={{ translateY: 0, opacity : 0}}
                            animate={{ translateY: 0, opacity : 100 }}
                            exit={{ translateY: 0 , opacity : 0}}
                            transition={{ duration: 0.8}}
                            className="absolute top-[3.2rem] left-0  w-[100%] h-screen bg-green-primary-600  z-50"
                        >
                            <>
                                <div className="z-0 h-[90%] w-full px-8 py-8 flex flex-col justify-between items-center mt-auto">

                                    <div className="w-full">
                                        <div className="flex flex-col gap-[1.5rem] font-bold text-base-secondary justify-center items-center">
                                            <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
                                            <Link href="/produits" onClick={() => setMenuOpen(false)}>Produits</Link>
                                            <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
                                            <Link href="/a-propos" onClick={() => setMenuOpen(false)}>À propos</Link>
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-col gap-4">
                                        {session?.user ? (
                                            <>
                                                <div className="text-base-secondary text-center font-bold text-sm mb-2">
                                                    {session.user.name}
                                                </div>
                                                <Link 
                                                    href="/profile" 
                                                    onClick={() => setMenuOpen(false)}
                                                    className="block text-center text-base-secondary font-bold text-sm py-2 hover:opacity-80 transition"
                                                >
                                                    👤 Mon profil
                                                </Link>
                                                <Link 
                                                    href="/orders" 
                                                    onClick={() => setMenuOpen(false)}
                                                    className="block text-center text-base-secondary font-bold text-sm py-2 hover:opacity-80 transition"
                                                >
                                                    📦 Mes Commandes
                                                </Link>
                                                <Link 
                                                    href="/cart" 
                                                    onClick={() => setMenuOpen(false)}
                                                    className="block text-center text-base-secondary font-bold text-sm py-2 hover:opacity-80 transition"
                                                >
                                                    🛒 Mon Panier
                                                </Link>
                                                <Link 
                                                    href="/settings" 
                                                    onClick={() => setMenuOpen(false)}
                                                    className="block text-center text-base-secondary font-bold text-sm py-2 hover:opacity-80 transition"
                                                >
                                                    ⚙️ Paramètres
                                                </Link>
                                                <Link 
                                                    href="/dashboard" 
                                                    onClick={() => setMenuOpen(false)}
                                                    className="block text-center text-base-secondary font-bold text-sm py-2 hover:opacity-80 transition"
                                                >
                                                    📊 Dashboard
                                                </Link>
                                                <button 
                                                    onClick={handleSignOut}
                                                    className="px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 transition"
                                                >
                                                    Déconnexion
                                                </button>
                                            </>
                                        ) : (
                                            <Link href="/auth/signin" onClick={() => setMenuOpen(false)}>
                                                <button className="w-full p-2 border-2 bg-base-secondary border-green-primary-600 text-green-primary-600 rounded-lg font-bold
                                                    transition ease-in-out hover:bg-green-primary-600 hover:text-white">Connexion</button>
                                            </Link>
                                        )}
                                    </div>

                                    <button className="p-2 border-2 bg-base-secondary border-base-secondary text-green-primary-600 rounded-lg font-bold
                                        transition ease-in-out hover:bg-base-secondary hover:text-green-primary-600">Contactez-nous</button>
                                </div>

                            </>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default ButtonMenu