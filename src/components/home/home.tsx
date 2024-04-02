"use client";
import Link from "next/link";
import { SessionType } from "../../app/page";
import Navbar from "../Navbar";
import LoginPage from "~/app/auth/login/page";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { useState } from "react";

const HomePage = ({ session }: { session: SessionType | null }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const createRoom = api.room.createRoom.useMutation();

  const handleLogout = async (): Promise<void> => {
    await signOut();
    console.log("first");
    router.push("/auth/login");
  };

  const handleCreateRoom = async () => {
    const response = await createRoom.mutateAsync();
    router.push(`/rooms/${response.roomName}`);
  };

  return (
    <div className="bg-gray-900 h-screen flex flex-col justify-center items-center">
      <Navbar handleLogout={handleLogout} />
      <p className="text-4xl text-white mb-6">Welcome to Stream Flow</p>
      <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center">
        
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleCreateRoom}
            className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center"
          >
            Create Meeting
          </button>
          <button
            type="button"
            onClick={() => router.push("/rooms/join")}
            className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center"
          >
            Join Meeting
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default HomePage;
