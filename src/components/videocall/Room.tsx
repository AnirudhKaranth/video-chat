"use client"
import { LocalUserChoices } from "@livekit/components-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import LiveRoom from "~/components/videocall/LiveRoom";
import Prejoin from "~/components/videocall/Prejoin";

export interface userType{
  id: string;
  isOAuth: boolean;
  email: string;
  name?: string | null | undefined;
  image?: string | null | undefined;
}

const Room = ({params, user}:{params:{roomId:string}, user:userType }) => {

  const [joinIn, setjoinIn] = useState(false);
  const [userJoinChoices, setUserJoinChoices] = useState<LocalUserChoices | undefined>(undefined);


  const handlePrejoinValues = (choice:LocalUserChoices)=>{
    setUserJoinChoices(choice);
    setjoinIn(true)
  }
  console.log(joinIn)

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-700">
      {joinIn ? (
         <LiveRoom 
         roomId={params.roomId}
         userChoices={userJoinChoices}
         OnDisconnected={() => {
          setUserJoinChoices(undefined)
          setjoinIn(false)
        }}
         userId={user?.id}
         ></LiveRoom>
      ) : (
       <Prejoin roomId={params.roomId} user={user} handlePrejoinValues={handlePrejoinValues}/>
      )}


     
    </div>
  );
};



export default Room;
