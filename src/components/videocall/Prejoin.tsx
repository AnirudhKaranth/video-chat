"use client"
import { LocalUserChoices, PreJoin } from '@livekit/components-react'
import React, { FormEvent } from 'react'
import { userType } from './Room'
import Navbar from '../Navbar'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

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
    <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
        Joining Room: {roomId}
        <PreJoin 
          className="overflow-visible max-w-96 max-h-96"
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
          >

        </PreJoin>
  </div>
          </>
  )
}


export default Prejoin;
