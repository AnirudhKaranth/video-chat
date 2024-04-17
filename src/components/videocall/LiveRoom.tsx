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

const LiveRoom = ({ roomId, userChoices, OnDisconnected }: LiveRoomType) => {
  let predictions: any = [];
  let actions = ["hello", "thanks", "repeat", "please", "goodbye", "_"];
  const webcamRef = useRef<Webcam>(null);
  const [isSignLanguageEnabled, setIsSignLanguageEnabled] = useState(false);
  const [othersUsingSignLanuage, setOthersUsingSignLanuage] = useState(false);

  const [signLangActive, setsignLangActive] = useState(false);

  const { data } = api.room.joinRoom.useQuery({ roomId: roomId });

  let sequence: any = [];

  const enableSignLanguage= api.room.enableSignLanguage.useMutation();
  const disableSignLanguage= api.room.disableSignLanguage.useMutation();


  function extractKeypoints(results: any) {
    let lh = [];
    let rh = [];

    // Extract left hand keypoints
    if (results.left_hand_landmarks) {
      lh = results.leftHandLandmarks
        .map((res: any) => [res.x, res.y, res.z])
        .flat();
    } else {
      lh = Array(21 * 3).fill(0);
    }

    // Extract right hand keypoints
    if (results.right_hand_landmarks) {
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
      "https://cloud-object-storage-cos-standard-ufe.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json",
    );
    console.log(model);
  };

  loadModel();

  const startsignLanguage = async(enable: boolean) => {
    if (enable) {
      if (isSignLanguageEnabled || othersUsingSignLanuage) {
        return;
      }
      await enableSignLanguage.mutateAsync({ roomId: roomId });
      setIsSignLanguageEnabled(true);  
      
    } else {
      await disableSignLanguage.mutateAsync({ roomId: roomId });
      setIsSignLanguageEnabled(false);
    }
  };

  // useEffect(() => {
    
      const pusher = new Pusher("05d0c76ccd2892789ea1", {
        cluster: "ap2",
      });

      const channel = pusher.subscribe(roomId);
      channel.bind("enableSignLanguage", function (data: {
        userId:string,
        userName:string,
      }) {
        console.log(data.userName);
      });

      channel.bind("disableSignLanguage", function (data: {
        userId:string,
        userName:string,
      }) {
        console.log(data.userName);
      });
    
  // }, []);

  const connectOptions = React.useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true,
    };
  }, []);

  // useEffect(() => {
    // if(!isSignLanguageEnabled){
      // return
    // }
    // const holistic: any = new Holistic({
    //   locateFile: (file: string) => {
    //     return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
    //   },
    // });

    // holistic.onResults((res: any) => {
    //   let keypoints = extractKeypoints(res);
    //   sequence.push(keypoints);
    //   sequence = sequence.slice(-20);
    //   const tensor = tf.tensor(sequence);

    //   if (sequence.length === 20) {
    //     // Convert sequence to a 3D array
    //     // console.log(tensorSequence.shape)
    //     const expandedSequenceTensor = tensor.expandDims(0);
    //     // console.log(expandedSequenceTensor.shape)
    //     let res = model.predict(expandedSequenceTensor);
    //     console.log(expandedSequenceTensor.shape);
    //     console.log("Predictions:  woww: ", res);
    //     // console.log("data:  woww: ", res.dataSync())
    //     let maxIndex = res.dataSync().indexOf(Math.max(...res.dataSync()));

    //     console.log(actions[maxIndex]);
    //   } else {
    //     // console.log(sequence.length);
    //     console.log("model not loaded or 15 frames not captured");
    //     // console.log(model);
    //   }
    // });

    // if (
    //   typeof webcamRef.current !== "undefined" &&
    //   webcamRef.current !== null
    // ) {
    //   if (!webcamRef.current?.video) return;
    //   const camera = new Camera(webcamRef.current.video, {
    //     onFrame: async () => {
    //       if (!webcamRef.current?.video) return;
    //       await holistic.send({ image: webcamRef.current.video });
    //     },
    //     width: 640,
    //     height: 480,
    //   });
    //   camera.start();
    // }
  // }, [webcamRef.current])
  

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

      {/* Your custom component with basic video conferencing functionality. */}
      <VideoConference
        chatMessageFormatter={formatChatMessageLinks}
        SettingsComponent={SettingsMenu}
      />
      <button
        type="button"
        className=" lk-button z-2 !absolute !left-72 bottom-3"
        onClick={() => {
          startsignLanguage(!isSignLanguageEnabled)
        }}
      >
        {isSignLanguageEnabled ? "Disable Sign Lang" : "Enable Sign Lang"}
      </button>
    </LiveKitRoom>
  );
};

export default LiveRoom;
