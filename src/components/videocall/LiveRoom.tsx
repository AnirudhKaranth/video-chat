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
import * as tf from "@tensorflow/tfjs";
import Pusher from "pusher-js";

type LiveRoomType = {
  roomId: string;
  userChoices?: LocalUserChoices;
  OnDisconnected?: () => void;
  userId: string;
};

const LiveRoom = ({ roomId, userChoices, OnDisconnected , userId}: LiveRoomType) => {
  let predictions: any = [];
  let actions = ["hello", "thanks", "repeat", "please", "goodbye", "_"];
  const webcamRef = useRef<Webcam>(null);
  const [isSignLanguageEnabled, setIsSignLanguageEnabled] = useState(false);
  const [othersUsingSignLanuage, setOthersUsingSignLanuage] = useState(false);
  const [subTitle, setSubTitle] = useState("");
  // const [signLangActive, setsignLangActive] = useState(false);

  const { data } = api.room.joinRoom.useQuery({ roomId: roomId });

  let sequence: any = [];

  const enableSignLanguage = api.room.enableSignLanguage.useMutation();
  const disableSignLanguage = api.room.disableSignLanguage.useMutation();
  const sendMessage = api.room.sendMessage.useMutation();


  function extractKeypoints(results: any) {
    let lh = [];
    let rh = [];
    console.log("extractKeypoints: ", results);
    // Extract left hand keypoints
    if (results.leftHandLandmarks) {
      console.log("echi saaav marre");
      lh = results.leftHandLandmarks
        .map((res: any) => [res.x, res.y, res.z])
        .flat();
    } else {
      lh = Array(21 * 3).fill(0);
    }

    // Extract right hand keypoints
    if (results.rightHandLandmarks) {
      console.log(" righted echi saaav marre");
      rh = results.rightHandLandmarks
        .map((res: any) => [res.x, res.y, res.z])
        .flat();
    } else {
      rh = Array(21 * 3).fill(0);
    }

    // Concatenate left hand and right hand keypoints
    return lh.concat(rh);
  }

  let model = {} as any;
  const loadModel = async () => {
    model = await tf.loadLayersModel(
      process.env.NEXT_PUBLIC_MODEL_URL as string,
    );
    console.log(model);
  };

  loadModel();

  const startsignLanguage = async (enable: boolean) => {
    if (enable) {
      if (isSignLanguageEnabled || othersUsingSignLanuage) {
        alert("Someone is already using sign language");
        return;
      }
      await enableSignLanguage.mutateAsync({ roomId: roomId });
      console.log("enable")
      setIsSignLanguageEnabled(true);
    } else {
      await disableSignLanguage.mutateAsync({ roomId: roomId });
      console.log("disable")

      setIsSignLanguageEnabled(false);
    }
  };

  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  });

  const channel = pusher.subscribe(roomId);
  channel.bind(
    "enableSignLanguage",
    function (data: { userId: string; userName: string }) {
      console.log("enable: pusher: ", data.userName);

      if (data.userId !== userId) {
        setIsSignLanguageEnabled(false)
        setOthersUsingSignLanuage(true);
      }
    },
  );

  channel.bind(
    "disableSignLanguage",
    function (data: { userId: string; userName: string }) {
      console.log("disable: pusher: ", data.userName);

      if (data.userId !== userId) {
        setIsSignLanguageEnabled(false)
        setOthersUsingSignLanuage(false);
      }
    },
  );

  channel.bind(
    "sendMessage",
    function (data: { userId: string; userName: string, message: string }) {
      console.log("sendMessage: pusher: ", data.message);
      if(data.message=="_"){
        setSubTitle("")
        return;
      }else{
        setSubTitle(data.userName+" : "+data.message);
      }
    },
  );
  


  useEffect(() => {
    const holistic: any = new Holistic({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });

    holistic.onResults(async (res: any) => {
     
      let keypoints = extractKeypoints(res);
     
      sequence.push(keypoints);
      sequence = sequence.slice(-20);
      const tensor = tf.tensor(sequence);

      if (sequence.length === 20) {
        
        const expandedSequenceTensor = tensor.expandDims(0);
        console.log(expandedSequenceTensor.dataSync());
       

        let res = model.predict(expandedSequenceTensor);

        console.log("data:  woww: ", res.dataSync());
        let maxIndex = res.dataSync().indexOf(Math.max(...res.dataSync()));
        if( actions[maxIndex]!=subTitle){
          await sendMessage.mutateAsync({ roomId: roomId, message: actions[maxIndex] as string });
        }
        console.log(actions[maxIndex]);
      } else {
        console.log("model not loaded or 15 frames not captured");
        
      }
    });

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null 
    ) {
      if (!webcamRef.current?.video) return;
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          if (!webcamRef.current?.video) return;
          await holistic.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      if(isSignLanguageEnabled){
        camera.start();

      }else if(!isSignLanguageEnabled){
        camera.stop();
      }
    }
    //
  }, [webcamRef.current, isSignLanguageEnabled]);

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
      {isSignLanguageEnabled && (
        <Webcam
          ref={webcamRef}
          style={{
            // display:"none",
            zIndex: -2,
            width: 0,
            height: 0,
          }}
        />
      )}

      <div className="z-10 !absolute bottom-24 text-lg" style={{ left: '45%' }}>{subTitle}</div>

      <VideoConference
        chatMessageFormatter={formatChatMessageLinks}
        SettingsComponent={SettingsMenu}
      />
      <button
        type="button"
        className=" lk-button z-10 !absolute !left-48 bottom-3"
        onClick={() => {
          startsignLanguage(!isSignLanguageEnabled);
        }}
      >
        {isSignLanguageEnabled ? "Disable Sign Lang" : "Enable Sign Lang"}
      </button>
    </LiveKitRoom>
  );
};

export default LiveRoom;
