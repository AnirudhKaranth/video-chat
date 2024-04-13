"use client";
import Link from "next/link";
import { SessionType } from "../../app/page";
import Navbar from "../Navbar";
import LoginPage from "~/app/auth/login/page";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
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
    <div className="bg-gray-900 h-screen flex flex-col relative">
    <Navbar handleLogout={handleLogout}/>
    <Image
      src="/bgimg9.svg"
      width={100}
      height={100}
      className="absolute inset-0 w-full h-full object-cover z-0"
      alt="Background Image"
    />
    
    <div className="flex flex-grow">
    <div className="flex-grow w-1/2  rounded-lg  flex flex-col justify-center items-center z-10">
    <div className="relative">
      <Image src="/ss1.svg" width={500} height={600} alt="Feature 1" />
    </div>
  </div>

      <div className="w-1/2 px-8 py-12 flex flex-col justify-center items-center z-10">
        <p className="text-4xl text-white mb-8 ">Welcome to <span className="font-mono  text-4xl ">GestureTalk</span></p>
        <p className="text-lg text-white mb-8">Introducing Gesture Talk: Revolutionizing communication with an innovative video chat platform. Seamlessly integrating sign language translation, Gesture Talk empowers individuals of all abilities to engage fully in conversations. By breaking down barriers, we foster inclusivity and enable everyone to connect, share, and belong.</p>
        <div className="flex flex-row gap-4">
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
  </div>
  );
  
};

export default HomePage;
