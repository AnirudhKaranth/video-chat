"use client"
import { ControlBar, GridLayout, LiveKitRoom, LocalUserChoices, ParticipantTile, RoomAudioRenderer, VideoConference, formatChatMessageLinks, useLocalParticipant, useTracks } from '@livekit/components-react'
import { RoomOptions, Track } from 'livekit-client';
import React, { useEffect, useMemo, useRef } from 'react'
// import { DebugMode } from '~/lib/Debug';
import { SettingsMenu } from '~/lib/SettingsMenu';
import { api } from '~/trpc/react';
import '@livekit/components-styles';
import {Holistic} from '@mediapipe/holistic';
import {Camera} from "@mediapipe/camera_utils";
import Webcam from "react-webcam";


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
  const webcamRef = useRef<Webcam>(null);
  // const { localParticipant } = useLocalParticipant()

  const {data} =  api.room.joinRoom.useQuery({roomId:roomId})
  

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

  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      }
    });
    holistic.setOptions({
      selfieMode: true,
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    holistic.onResults((res:any)=> {
      console.log(res)
    });
    
    
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
      ) {
        console.log("alo")
        if (!webcamRef.current?.video) return
        const camera = new Camera(webcamRef.current.video, {
          onFrame: async () => {
            console.log("first frame")
            if (!webcamRef.current?.video) return
            await holistic.send({image: webcamRef.current.video});
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
      let interval=setInterval(()=>{
        
        console.log(webcamRef.current)
      },10000)
      return()=>clearInterval(interval);
    }, [webcamRef.current])

    

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={data?.accessToken}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      onDisconnected={OnDisconnected}
      data-lk-theme="default"
      style={{ height: '100dvh' }}
    >
      <Webcam
        ref={webcamRef}
        style={{
          // display:"none",
          zIndex: -2,
          width: 0,
          height: 0,

        }}
      />
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      <ControlBar />
    </LiveKitRoom>
  );
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
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}


export default LiveRoom