"use client"
import { ControlBar, GridLayout, LiveKitRoom, LocalUserChoices, ParticipantTile, RoomAudioRenderer, VideoConference, formatChatMessageLinks, useLocalParticipant, useTracks } from '@livekit/components-react'
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
  // const { localParticipant } = useLocalParticipant()

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

  // const startSignLanguage = async () => {
  //   const videoTrack = localParticipant.videoTrackPublications;
  //   console.log(videoTrack)

  // }
  // startSignLanguage()
  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={data?.accessToken}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: '100dvh' }}
    >
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