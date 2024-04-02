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
      <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center">
        <p className="text-xl text-white mb-6">Welcome to Stream Flow</p>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={handleCreateRoom}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          >
            Create Meeting
          </button>
          <button    
            type="button"
            onClick={() => router.push("/rooms/join")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Join Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
