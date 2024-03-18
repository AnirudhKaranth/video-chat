"use client"
import { ControlBar, GridLayout, LiveKitRoom, LocalUserChoices, ParticipantTile, PreJoin, RoomAudioRenderer, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import React, { FormEvent, useState } from "react";
import LiveRoom from "~/components/videocall/LiveRoom";
import { getServerAuthSession } from "~/server/auth";

const page = async({params}:{params:{roomId:string}}) => {
  // const session = await getServerAuthSession();


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
         userId={"1"}></LiveRoom>
      ) : (
        <div className="h-3/4 w-3/5 flex flex-col gap-5 items-center justify-center overflow-hodden">
        Joining Room: abc
        <PreJoin 
          className="overflow-visible max-w-96 max-h-96"
        >

        </PreJoin>
  </div>
      )}
    </div>
  );
};



export default page;
