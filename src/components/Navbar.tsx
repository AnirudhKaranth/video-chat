"use client"
import { signOut } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = ({ handleLogout }: { handleLogout: () => void }) => {

  return (
    <div className='fixed top-0 w-full h-20 bg-gray-800 bg-opacity-50 flex items-center justify-around shadow-md text-white z-10'>
  <Link href="/" className="flex items-center justify-center w-1/4">
    <Image
      src="/snapedit_1712040610628.png"
      width={200}
      height={150}
      alt='Logo'
    />
  </Link>
  <div className="w-3/12 flex justify-center z-10">
    <Link href="/about" className="nav-item hover:text-blue-500 transition duration-300">About</Link>
  </div>
  <div className="w-3/12 flex justify-center z-10">
    <Link href="#" className="nav-item hover:text-blue-500 transition duration-300">Contact</Link>
  </div>
  <div className="w-1/4 flex items-center justify-center z-10">
    <button type="button" onClick={handleLogout} className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center z-10">Logout</button>
  </div>
</div>

  );
};

export default Navbar;