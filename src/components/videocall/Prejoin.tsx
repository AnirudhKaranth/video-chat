"use client"
import { PreJoin } from '@livekit/components-react'
import React from 'react'

const Prejoin = () => {
  return (
    <div className="h-3/4 w-3/5 flex flex-col gap-5 items-center justify-center overflow-hodden">
        Joining Room: abc
        <PreJoin 
          className="overflow-visible max-w-96 max-h-96"
        >

        </PreJoin>
  </div>
  )
}

export default Prejoin