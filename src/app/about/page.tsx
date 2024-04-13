"use client";
import React from 'react'
import Image from 'next/image';
import Navbar from '~/components/Navbar';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const Aboutpage = () => {
  const router = useRouter();
  const handleLogout = async (): Promise<void> => {
    await signOut();
    console.log("first");
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col relative">
  <Navbar handleLogout={handleLogout} />
  <Image
    src="/bgimg6.svg"
    width={100}
    height={100}
    className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1] z-0"
    alt="Background Image"
  />
  
  {/* Feature 1 */}
  <div className="flex flex-col md:flex-row md:items-center gap-8 mt-16 mb-20 z-10 px-4">
    <div className="md:w-1/2 flex justify-center items-center  z-10">
      <Image
        src="/ss15.svg"
        width={550}
        height={600}
        className="object-cover rounded bg-transparent z-10"
        alt="Feature 1 Image"
      /> 
    </div>
    <div className="flex flex-col md:w-1/2 z-10 bg-gray-800 bg-opacity-60 rounded-tr-3xl rounded-bl-3xl shadow-lg p-6 mr-8">
      <h2 className="text-3xl font-bold mb-4 text-white">Seamlessly Connect Through Video Calls</h2>
      <p className="text-gray-300">
        Experience effortless communication with our seamless video calling feature. Stay connected with your friends, family, and colleagues without interruptions or technical glitches. Our platform ensures each interaction is smooth and productive, allowing you to focus on what matters most.
      </p>
    </div>
  </div>

  {/* Feature 2 */}
  <div className="flex flex-col md:flex-row md:items-center gap-8 mt-12 mb-12  z-10 px-4">
    <div className="md:w-1/2 z-10 bg-gray-800 bg-opacity-60 rounded-tl-3xl rounded-br-3xl shadow-lg p-6 ml-8">
      <h2 className="text-3xl font-bold mb-4 text-white">Empowering Every Voice with Sign Language Integration</h2>
      <p className="text-white-300">
        Break down communication barriers and foster inclusivity with our sign language integration feature. Designed to empower individuals of all abilities, our platform enables seamless expression through sign language. Whether you're hearing-impaired or not, everyone can now communicate effectively and express themselves fully in our video chats.
      </p>
    </div>
    <div className="md:w-1/2 flex justify-center items-center z-10">
      <Image
        src="/ss2.svg"
        width={500}
        height={500}
        className="object-cover rounded z-10"
        alt="Feature 2 Image"
      />
    </div>
  </div>

  {/* Feature 3 */}
  <div className="flex flex-col md:flex-row md:items-center gap-8 mt-12 mb-12 z-10 px-4">
    <div className="md:w-1/2 flex justify-center items-center z-10">
      <Image
        src="/ss4.svg"
        width={500}
        height={400}
        className="object-cover rounded z-10"
        alt="Feature 3 Image"
      />
    </div>
    <div className="flex flex-col md:w-1/2 z-10 bg-gray-800 bg-opacity-60  shadow-lg rounded-tr-3xl rounded-bl-3xl p-6 mr-8">
      <h2 className="text-3xl font-bold mb-4 text-white">Talk with the Hand</h2>
      <p className="text-white-300">
        Embrace the beauty of non-verbal communication with our 'Talk with the Hand' feature. Unlock the power of sign language, a universal language that transcends spoken words. Communicate with precision, emotion, and clarity through intricate hand gestures and expressions. With this feature, conversations become more vibrant, authentic, and inclusive, bridging gaps and fostering deeper connections regardless of spoken language barriers.
      </p>
    </div>
  </div>

  {/* Created By */}
  <div className="creators text-center mt-8 bg-gray-900 bg-opacity-50 z-10">
    <h2 className="text-2xl font-bold mb-2 text-white">Created By:</h2>
    <p className="text-white-300 text-xl">Anirudh Karanth  &  Darshan S Karkera</p>
    <p className="text-gray-300 text-lg font-mono">GestureTalk</p>
  </div>
</div>







  )
}

export default Aboutpage