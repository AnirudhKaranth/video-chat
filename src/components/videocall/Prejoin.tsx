"use client"
import { PreJoin } from '@livekit/components-react'
import React from 'react'

const Prejoin = ({roomId}:{roomId:string}) => {
  return (
    <div className="h-3/4 w-3/5 flex flex-col gap-5 items-center justify-center overflow-hodden">
        Joining Room: abc
        <PreJoin 
          className="overflow-visible max-w-96 max-h-96"
          onError={(err) =>
            console.log("Error while setting up prejoin", err)
          }
          defaults={{
            username: "Ani",
            videoEnabled: true,
            audioEnabled: true,
          }}
          onSubmit={(values) => {
            console.log("Joining with: ", values);
            
          }}
        >

        </PreJoin>
  </div>
  )
}

export default Prejoin