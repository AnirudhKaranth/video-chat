"use client"
import { signOut } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = ({ handleLogout }: { handleLogout: () => void }) => {

  return (
    <div className='fixed top-0 w-full h-20 bg-gray-800 flex items-center justify-around shadow-md text-white'>
      <Link  href="/" className="flex items-center justify-center w-1/4" >
        <Image
        src="/logov2.png"
        width={100}
        height={100}
        alt='Logo'
        />
      </Link>
      <div className="w-3/12 flex justify-center">
        <Link href="/about" className="nav-item">About</Link>
      </div>
      <div className="w-3/12 flex justify-center">
        <Link href="#" className="nav-item">Contact</Link>
      </div>
      <div className="w-1/4 flex items-center justify-center">
        <button type="button" onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <style jsx>{`
        .nav-item {
          text-decoration: none;
          color: pink;
          transition: color 0.3s ease;
        }
        .nav-item:hover {
          color: #2563eb; /* Blue color from homepage */
        }
        .logout-btn {
          padding: 8px 16px;
          background-color: #3b82f6; /* Blue color from homepage */
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease-in-out, box-shadow 0.3s ease;
        }
        
        .logout-btn:hover {
          background-color: #2563eb; /* Lighter shade of blue */
          transform: translateY(-1px) scale(1.1);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
      `}</style>
    </div>
  );
};

export default Navbar;