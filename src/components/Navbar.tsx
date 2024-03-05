"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-20 flex items-center justify-around'>
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
        <button type="button" onClick={async ()=> await signOut()}>logout</button>
        </div>
    </div>
  )
}

export default Navbar