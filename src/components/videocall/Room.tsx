"use client"
import { LocalUserChoices } from "@livekit/components-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import LiveRoom from "~/components/videocall/LiveRoom";
import Prejoin from "~/components/videocall/Prejoin";
import { api } from "~/trpc/react";
import '@livekit/components-styles';
import Navbar from "../Navbar";

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


  const leaveRoom= api.room.leaveRoom.useMutation();
  const handlePrejoinValues = (choice:LocalUserChoices)=>{
    setUserJoinChoices(choice);
    setjoinIn(true)
  }

  const handleEndConnection = async()=>{
    await leaveRoom.mutateAsync({roomId:params.roomId})
    setUserJoinChoices(undefined)
    setjoinIn(false)
  }
  console.log(joinIn)

  return (
    <main data-lk-theme="default">
      {joinIn ? (
         <LiveRoom 
         roomId={params.roomId}
         userChoices={userJoinChoices}
         OnDisconnected={handleEndConnection}
         userId={user?.id}
         ></LiveRoom>
      ) : (
       <Prejoin roomId={params.roomId} user={user} handlePrejoinValues={handlePrejoinValues}/>
      )}


     
    </main>
  );
};



export default Room;
