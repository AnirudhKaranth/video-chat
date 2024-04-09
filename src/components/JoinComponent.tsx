"use client";
import React, { FormEvent, useState } from "react";
import Navbar from "./Navbar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
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
      <Image
      src="/bgimg6.svg"
      width={100}
      height={100}
      className="absolute inset-0 w-full h-full object-cover z-0 "
      alt="Background Image"
    />
      <div className=" w-wull pt-48 flex h-full items-start  justify-center z-10">
        <form
          onSubmit={handleJoinRoom}
          className="flex flex-col items-center justify-center gap-4  bg-gray-800 bg-opacity-50 rounded-3xl border-2 border-gray-400 p-10 shadow-lg z-10">
          <input
            type="text"
            placeholder="Enter the meeting ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="border-2 border-gray-200 px-10 py-3 rounded-xl z-10"
          />
          <button
            type="submit"
            className="text-white mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-700/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2  "
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinComponent;
