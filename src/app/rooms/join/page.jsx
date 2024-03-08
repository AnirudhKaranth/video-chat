"use client"
import React, { useState } from 'react'

const page = () => {
    const [roomId, setRoomId] = useState<string>("")

    const handleJoinRoom = (e)=>{
        e.preventDefault();
        
    }

  return (
    <div>
        <div>
            <form onSubmit={handleJoinRoom}>
                <label>Meeting Id</label>
                <input type="text" value={roomId}/>
            </form>
        </div>
    </div>
  )
}

export default page