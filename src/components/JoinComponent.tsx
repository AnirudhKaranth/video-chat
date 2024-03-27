"use client";
import React, { FormEvent, useState } from "react";
import Navbar from "./Navbar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const JoinComponent = () => {
  const [roomId, setRoomId] = useState<string>("");
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    await signOut();
    router.push("/auth/login");
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/rooms/${roomId}`)
  };

  return (
    <div className="h-screen w-full bg-gray-900  ">
      <Navbar handleLogout={handleLogout} />
      <div className=" w-wull pt-48 flex h-full items-start  justify-center">
        <form
          onSubmit={handleJoinRoom}
          className="flex h-56 w-96 flex-col items-center justify-center gap-2 bg-gray-800 rounded-md border-2 border-gray-500 p-3 shadow-md"
        >
          <input
            type="text"
            placeholder="Enter the meeting ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="border-2 border-gray-200 p-2 rounded-md"
          />
          <button
            type="submit"
            className="rounded-sm bg-blue-300 px-6 py-2 text-black hover:bg-blue-500"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinComponent;
