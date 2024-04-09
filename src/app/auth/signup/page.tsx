import React from 'react'
import Home from '~/app/page';
import { SignUpForm } from '~/components/form/register'
import { getServerAuthSession } from '~/server/auth';
import Image from 'next/image';

const SignUpPage = async() => {
  const session = await getServerAuthSession();
  console.log(session)
  if(session !== null){
    <Home/>
  }
  return (
    <div className='flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-950 to-gray-900 h-screen w-full'>
        <Image
          src="/bgimg4.svg"
          width={100}
          height={100}
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="Background Image"
        />
        <SignUpForm session={session}/>
    </div>
  )
}

export default SignUpPage