"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const Navbar = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <div className='w-full h-20 flex items-center justify-around shadow-md'>
        <div>
            logo
        </div>
        <div>
            About
        </div>
        <div>
            contact
        </div>
        <div>
        <button type="button" onClick={handleLogout}>logout</button>
        </div>
    </div>
  )
}

export default Navbar