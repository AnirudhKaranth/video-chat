"use client";
import {
  GridLayout,
  LiveKitRoom,
  LocalUserChoices,
  VideoConference,
  formatChatMessageLinks,
} from "@livekit/components-react";
import { RoomConnectOptions, RoomOptions, Track } from "livekit-client";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import { DebugMode } from '~/lib/Debug';
import { SettingsMenu } from "~/lib/SettingsMenu";
import { api } from "~/trpc/react";
import "@livekit/components-styles";
import { Holistic } from "@mediapipe/holistic";
import { Camera } from "@mediapipe/camera_utils";
import Webcam from "react-webcam";

type LiveRoomType = {
  roomId: string;
  userChoices?: LocalUserChoices;
  OnDisconnected?: () => void;
  userId: string;
};

const LiveRoom = ({ roomId, userChoices, OnDisconnected }: LiveRoomType) => {
  const webcamRef = useRef<Webcam>(null);
  const [isSignLanguageEnabled, setIsSignLanguageEnabled] = useState(false);
  const [signLangActive, setsignLangActive] = useState(false);


  const { data } = api.room.joinRoom.useQuery({ roomId: roomId });

  // const roomOptions = useMemo((): RoomOptions => {
  //   return {
  //     videoCaptureDefaults: {
  //       deviceId: userChoices?.videoDeviceId ?? undefined,
  //     },

  //     audioCaptureDefaults: {
  //       deviceId: userChoices?.audioDeviceId ?? undefined,
  //     },
  //     adaptiveStream: { pixelDensity: "screen" },
  //     dynacast: true,
  //   };
  // }, [userChoices]);

  
  
  useEffect(() => {
    const holistic:any = new Holistic({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      }
    });

  holistic.onResults((res: any) => {
    console.log(res)
    // leftHandLandmarks
    //rightHandLandmarks
  })

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
      ) {
        if (!webcamRef.current?.video) return
        const camera = new Camera(webcamRef.current.video, {
          onFrame: async () => {
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



  // const signLanguage = (enable: boolean) => {
  //   // if(signLangActive){
  //   //   return;
  //   // }
  //   console.log(enable)
  //   if (camera) {
  //     if (enable) {
  //       setIsSignLanguageEnabled(true);
  //       console.log("aaaaa")
  //       camera.start();
  //     } else {
  //       setIsSignLanguageEnabled(false);
  //       camera.stop();
  //     }
  //   }else{
  //     console.log("camera is null")
  //   }
  // };

  const connectOptions = React.useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true,
    };
  }, []);

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={data?.accessToken}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connectOptions={connectOptions}
      // Use the default LiveKit theme for nice styles.
      onDisconnected={OnDisconnected}
      data-lk-theme="default"
      style={{ height: "100dvh" }}
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
      <VideoConference
        chatMessageFormatter={formatChatMessageLinks}
        SettingsComponent={SettingsMenu}
      />
      <button type="button"  className=" !absolute !left-72 bottom-3 lk-button z-2" onClick={() => {
        setIsSignLanguageEnabled(!isSignLanguageEnabled)
        // signLanguage(isSignLanguageEnabled)
        }}>{isSignLanguageEnabled?"Diable Sign Lang":"Enable Sign Lang"}</button>
    </LiveKitRoom>
  );
};

export default LiveRoom;
