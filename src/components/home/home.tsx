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
    <Image
      src="/4239318_90419.svg"
      width={100}
      height={100}
      className="absolute inset-0 w-full h-full object-cover z-0"
      alt="Background Image"
    />
    <Navbar handleLogout={handleLogout} />
    <div className="flex flex-grow">
      <div className="flex-grow w-1/3 rounded-lg pl-24 flex flex-col justify-center items-center z-10">
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          <div>
            <div className="relative">
              <Image src="/12463944_4969391.svg" width={100} height={100} alt="Feature 1" />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white py-2 px-4">
                <h2 className="text-lg font-semibold">Connect seamlessly, express freely. Elevate your conversations with our intuitive video chat platform.</h2>
              </div>
            </div>
          </div>
          <div>
            <div className="relative">
              <Image src="/6438022_3280736.svg" width={100} height={100} alt="Feature 2" />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white py-2 px-4">
                <h2 className="text-lg font-semibold">Feature 2</h2>
                <p className="text-sm">Description for Feature 2</p>
              </div>
            </div>
          </div>
          <div>
            <div className="relative">
              <Image src="/5544353_52953.svg" width={100} height={100} alt="Feature 3" />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white py-2 px-4">
                <h2 className="text-lg font-semibold">Feature 3</h2>
                <p className="text-sm">Description for Feature 3</p>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
      <div className="w-2/3 px-8 py-12 flex flex-col justify-center items-center z-10">
        <p className="text-4xl text-white mb-6">Welcome to Gesture Talk</p>
        <p className="text-lg text-white mb-8">Introducing Gesture Talk: Revolutionizing communication with an innovative video chat platform. Seamlessly integrating sign language translation, Gesture Talk empowers individuals of all abilities to engage fully in conversations. By breaking down barriers, we foster inclusivity and enable everyone to connect, share, and belong.</p>
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
