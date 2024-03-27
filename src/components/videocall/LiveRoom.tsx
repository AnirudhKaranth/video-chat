"use client"
import { ControlBar, GridLayout, LiveKitRoom, LocalUserChoices, ParticipantTile, RoomAudioRenderer, useTracks } from '@livekit/components-react'
import { RoomOptions, Track } from 'livekit-client';
import React, { useMemo } from 'react'
import { api } from '~/trpc/react';


type LiveRoomType = {
  roomId: string;
  userChoices?: LocalUserChoices;
  OnDisconnected?: () => void;
  userId: string;
};

const LiveRoom = ({
  roomId,
  userChoices,
  OnDisconnected
}:LiveRoomType) => {
  console.log("first")

  const {data} =  api.room.joinRoom.useQuery({roomId:roomId})
  
  console.log(data)

  const roomOptions = useMemo((): RoomOptions => {
    return {
      videoCaptureDefaults: {
        deviceId: userChoices?.videoDeviceId ?? undefined,
  
      },
      
      audioCaptureDefaults: {
        deviceId: userChoices?.audioDeviceId ?? undefined,
      },
      adaptiveStream: { pixelDensity: "screen" },
      dynacast: true,
    };
  }, [userChoices]);
  return (
    <LiveKitRoom
         video={true}
         audio={true}
         token={data?.accessToken}
         serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
         options={roomOptions}
         onDisconnected={OnDisconnected}
         data-lk-theme="default"
         style={{ height:'h-full',width:"full", display:"flex", flexDirection:"column", border:"black", borderWidth:"2px", backgroundColor:"gray"}}
       >
         {/* Your custom component with basic video conferencing functionality. */}
        <div className='flex '>
         <MyVideoConference />

        </div>
         <RoomAudioRenderer />
         {/* Controls for the user to start/stop audio, video, and screen
         share tracks and to leave the room. */}
         <div className='border-2 border-black'>

         <ControlBar style={{height:"80px", display:"flex" , justifyContent:"space-around",}} />
         </div>
       </LiveKitRoom>
  )
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks}  className='bg-gray-500 w-full   ' >
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile className=''/>
    </GridLayout>
  );
}

export default LiveRoom