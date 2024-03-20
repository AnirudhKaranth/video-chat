import { LocalUserChoices } from "@livekit/components-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import LiveRoom from "~/components/videocall/LiveRoom";
import Prejoin from "~/components/videocall/Prejoin";
import { getCurrentUser } from "~/lib/session";

const page = async({params}:{params:{roomId:string}}) => {
  const sessionUser= await getCurrentUser()
  const router = useRouter()

  if(!sessionUser || !sessionUser.id){
    router.push("/auth/login")
    return
  }


  const [joinIn, setjoinIn] = useState(false);
  const [userJoinChoices, setUserJoinChoices] = useState<LocalUserChoices | undefined>(undefined);


  const handlePrejoinValues = (e:FormEvent)=>{
    e.preventDefault()
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {joinIn ? (
         <LiveRoom 
         roomId={params.roomId}
         userChoices={userJoinChoices}
         OnDisconnected={() => setUserJoinChoices(undefined)}
         userId={sessionUser.id}></LiveRoom>
      ) : (
       <Prejoin/>
      )}
    </div>
  );
};



export default page;
