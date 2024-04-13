"use client";
import React from 'react'
import Image from 'next/image';
import Navbar from '~/components/Navbar';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const Contactpage = () => {
  const router = useRouter();
  const handleLogout = async (): Promise<void> => {
    await signOut();
    console.log("first");
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative z-10">
  <Navbar handleLogout={handleLogout} />
  <Image
    src="/bgimg12.svg"
    width={100}
    height={100}
    className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1] z-0"
    alt="Background Image"
  />
  <div className="my-6 mt-20 z-10">
    <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl my-6 bg-gradient-to-br from-indigo-900 via-blue-700 to-purple-700 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-tr-3xl rounded-bl-3xl  text-[#333] font-[sans-serif] z-10">
    <form className="ml-auto  pt-4 space-y-4 z-10">
            <input type='text' placeholder='Name'
                className="w-full rounded-xl py-2.5 px-4 border text-sm outline-[#007bff] shadow-xl bg-slate-300 z-10" />
            <input type='email' placeholder='Email'
                className="w-full rounded-xl py-2.5 px-4 border text-sm outline-[#007bff] shadow-xl bg-slate-300 z-10" />
            <input type='text' placeholder='Subject'
                className="w-full rounded-xl py-2.5 px-4 border text-sm outline-[#007bff] shadow-xl bg-slate-300 z-10" />
            <textarea placeholder='Message' 
                className="w-full rounded-xl px-4 border text-sm pt-2.5 outline-[#007bff] shadow-xl bg-slate-300 z-10"></textarea>
            <button type='button'
                className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center ml-24 w-1/2 z-10">Send</button>
        </form>
        <div className="z-10">
            <h1 className="text-3xl text-white font-extrabold">Connect with Us</h1>
            <p className="text-sm text-white mt-3">Got an idea, feedback, or any questions? We're here to help! Drop us a message and we'll get back to you as soon as possible.</p>
            <div className="mt-12 z-10">
                <h2 className="text-lg text-white font-extrabold">Email</h2>
                <ul className="mt-3 z-10">
                    <li className="flex items-center z-10">
                        <div className="bg-slate-300 h-10 w-10 rounded-full flex items-center justify-center shrink-0 z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff'
                                viewBox="0 0 479.058 479.058">
                                <path
                                    d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                                    data-original="#000000" />
                            </svg>
                        </div>
                        <a href="javascript:void(0)" className="text-white text-sm ml-3 z-10">
                            <small className="block z-10">Mail</small>
                            <strong className="z-10">info@gesturetalk.com</strong>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</div>

</div>







  )
}

export default Contactpage