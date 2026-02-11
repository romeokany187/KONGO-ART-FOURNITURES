import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion"


const ButtonMenu = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        return setMenuOpen(!menuOpen)
    }
    return (
        <>
            <button
                onClick={toggleMenu}
                className="flex gap-4 items-center justify-center p-2  text-gray-800 T rounded-md z-50 bg-gray-200 ml-3"
            >
                <p className="font-bold text-xs">MENU</p>
                <CSSTransition
                    in={menuOpen}
                    timeout={500}
                    classNames="icon"
                >
                    <div>
                        <Image
                            src={menuOpen ? '/assets/close.svg' : '/assets/menu.svg'}
                            alt="open menu"
                            width={17}
                            height={17}
                        />
                    </div>
                </CSSTransition>
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
                                <div className="z-0 h-[90%] w-full px-8 py-8 flex flex-col justify-center items-center  gap-[10rem] mt-auto">

                                    <div className="">
                                        <div className="flex flex-col gap-[1.5rem] font-bold text-base-secondary justify-center items-center">
                                            <Link href="/">Accueil</Link>
                                            <Link href="/produits">Produits</Link>
                                            <Link href="/services">Services</Link>
                                            <Link href="/a-propos">À propos</Link>
                                        </div>
                                    </div>

                                    <button className="p-2 border-2 bg-base-secondary border-green-primary-600 text-green-primary-600 rounded-lg
                                        transition ease-in-out hover:bg-green-primary-600 hover:text-white">Contactez-nous</button>
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