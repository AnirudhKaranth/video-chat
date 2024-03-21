// "use client"
import { LocalUserChoices } from "@livekit/components-react";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import LiveRoom from "~/components/videocall/LiveRoom";
import Prejoin from "~/components/videocall/Prejoin";
import Room from "~/components/videocall/Room";
import { getCurrentUser } from "~/lib/session";

const page = async({params}:{params:{roomId:string}}) => {
  const sessionUser= await getCurrentUser()
  const router = useRouter()

  if(!sessionUser || !sessionUser.id){
    redirect("/auth/login")
    
  }


  return (
   <Room params={params}/>
  );
};



export default page;
