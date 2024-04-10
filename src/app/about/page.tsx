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
    <div className="bg-gray-900 min-h-screen flex flex-col relative">
  <Navbar handleLogout={handleLogout} />
  <Image
    src="/bgimg9.svg"
    width={100}
    height={100}
    className="absolute inset-0 w-full h-full object-cover z-0"
    alt="Background Image"
  />
  
  <div className="flex flex-grow overflow-y-auto">
    <div className="flex-grow w-1/2 rounded-lg flex flex-col justify-center items-center z-10">
      <h2 className="text-white text-2xl font-bold mb-6">Feature 1</h2>
      <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed felis in ligula commodo condimentum. Ut id interdum libero. Nulla facilisi. Duis vel odio nec eros facilisis tempus.</p>
      <p className="text-white">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur ac orci sit amet dui venenatis convallis a eu odio. Proin vel malesuada sem. Morbi et libero sed justo consectetur fringilla ut eget velit.</p>
      {/* Repeat the above content to make it longer */}
    </div>

    <div className="flex-grow w-1/2 rounded-lg flex flex-col justify-center items-center z-10">
      <h2 className="text-white text-2xl font-bold mb-6">About the Creators</h2>
      <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed felis in ligula commodo condimentum. Ut id interdum libero. Nulla facilisi. Duis vel odio nec eros facilisis tempus.</p>
      <p className="text-white">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur ac orci sit amet dui venenatis convallis a eu odio. Proin vel malesuada sem. Morbi et libero sed justo consectetur fringilla ut eget velit.</p>
      {/* Repeat the above content to make it longer */}
    </div>
  </div>
</div>

  )
}

export default Aboutpage