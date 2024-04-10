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

   
    <div className="bg-gray-900 h-screen flex flex-col">
  <Navbar handleLogout={handleLogout} />
  <div className="mx-auto mt-24">
    <p className="text-4xl text-white">Welcome to Gesture Talk</p>
  </div>
  <div className="flex flex-grow">
    <div className="flex-grow w-1/3  rounded-lg p-8 flex flex-col justify-center items-center">
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        <div>
          <Image src="/sign.png" width={50} height={50} alt="Feature 1" />
        </div>
        <div>
          <Image src="/vc8.png" width={50} height={50} alt="Feature 2" />
        </div>
        <div>
          <Image src="/vc8.png" width={50} height={50} alt="Feature 3" />
        </div>
      </Carousel>
    </div>
    <div className="w-2/3  rounded-lg p-8 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4">
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
