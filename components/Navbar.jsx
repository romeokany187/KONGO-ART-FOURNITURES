"use client"
import Link from 'next/link'
import ButtonMenu from './ButtonMenu'

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-2 xl:px-[10rem] lg:px-[5rem] md:px-[2rem] px-6 top-0 sticky bg-white z-50">
      <Link href="/">
        <div className="z-50 lg:text-2xl text-[1rem] font-extrabold italic cursor-pointer hover:opacity-80 transition">
          KONGO ART <span className='text-green-primary-600'>FOURNITURES</span>
        </div>
      </Link>
      <ButtonMenu />
    </div>
  )
}

export default Navbar