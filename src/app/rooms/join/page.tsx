"use client"
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Navbar from '~/components/Navbar'


const page = () => {
    const [roomId, setRoomId] = useState<string>("")
    
    const router = useRouter();
  
   const handleLogout = async (): Promise<void> => {
      await signOut();
      console.log("first");
      router.push("/auth/login");
    };
  
    const handleJoinRoom = (e:React.FormEvent)=>{
        e.preventDefault();
        
    }

  return (
    <div className='h-screen w-full '>
        <Navbar handleLogout={handleLogout}/>
        <div className=' h-full w-wull  flex items-start justify-center  mt-24'>
            <form onSubmit={handleJoinRoom} className='flex flex-col gap-2 items-center justify-center p-3 h-56 w-96 border-2 border-gray-200 shadow-md rounded-md'>
                <input type="text" placeholder='Enter the meeting ID' value={roomId} onChange={(e)=>setRoomId(e.target.value)} className='border-2 border-gray-200 p-2'/>
                <button type="submit" className='bg-blue-300 text-black py-2 px-6 rounded-sm hover:bg-blue-500'>Join</button>
            </form>
        </div>
    </div>
  )
}

export default page