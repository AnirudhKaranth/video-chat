"use client"
import { LocalUserChoices, PreJoin } from '@livekit/components-react'
import React, { FormEvent } from 'react'
import { userType } from './Room'

const Prejoin = ({roomId, user, handlePrejoinValues}:{roomId:string, user:userType,  handlePrejoinValues: (choice:LocalUserChoices) => void }) => {
  let userName = user.name || "userName"
  return (
    <div className="h-3/4 w-3/5 flex flex-col gap-5 items-center justify-center overflow-hodden">
        Joining Room: {roomId}
        <PreJoin 
          className="overflow-visible max-w-96 max-h-96"
          onError={(err) =>
            console.log("Error while setting up prejoin", err)
          }
          defaults={{
            username: userName,
            videoEnabled: true,
            audioEnabled: true,
          }}
          onSubmit={(values) => {
            console.log("Joining with: ", values);
            handlePrejoinValues(values)
            
          }}
        >

        </PreJoin>
  </div>
  )
}

export default Prejoin