"use client"
import { LocalUserChoices, PreJoin } from '@livekit/components-react'
import React, { FormEvent } from 'react'
import { userType } from './Room'
import Navbar from '../Navbar'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';

const Prejoin = ({roomId, user, handlePrejoinValues}:{roomId:string, user:userType,  handlePrejoinValues: (choice:LocalUserChoices) => void }) => {
  let userName = user.name || "userName"
  const router=useRouter()
  const handleLogout = async (): Promise<void> => {
    await signOut();
    router.push("/auth/login");
  };
  return (
    <>
    <Navbar handleLogout={handleLogout}/>
    <Image
      src="/bgimg12.svg"
      width={100}
      height={100}
      className="absolute inset-0 w-full h-full object-cover z-0 "
      alt="Background Image"
    />
    <div className="z-10" style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
  <div className="bg-gray-800 bg-opacity-35 rounded-xl p-6 shadow-lg z-10">
    <h4 className="text-xl font-semibold text-white mb-4 z-10">Joining Room: {roomId}</h4>
    <PreJoin 
      className="overflow-visible max-w-96 max-h-96 z-10"
      onError={(err) =>
        console.log("Error while setting up prejoin", err)
      }
      defaults={{
        username: userName,
        videoEnabled: true,
        audioEnabled: true,
      }}
      onSubmit={(values) => {
        console.log("Joining with: ", values);
        handlePrejoinValues(values)
      }}
    />
  </div>
</div>

          </>
  )
}


export default Prejoin;
