"use client"
import { ControlBar, GridLayout, LiveKitRoom, LocalUserChoices, ParticipantTile, RoomAudioRenderer, VideoConference, formatChatMessageLinks, useTracks } from '@livekit/components-react'
import { RoomOptions, Track } from 'livekit-client';
import React, { useMemo } from 'react'
// import { DebugMode } from '~/lib/Debug';
import { SettingsMenu } from '~/lib/SettingsMenu';
import { api } from '~/trpc/react';
import '@livekit/components-styles';

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
       >
         {/* Your custom component with basic video conferencing functionality. */}
         <VideoConference  chatMessageFormatter={formatChatMessageLinks}
            SettingsComponent={
              SettingsMenu
            }
            />

{/* <DebugMode /> */}
         
        
       </LiveKitRoom>
  )
}



export default LiveRoom