import React from 'react'
import Home from '~/app/page';
import { SignInForm } from '~/components/form/login'
import { getServerAuthSession } from '~/server/auth';
import Image from 'next/image';


const LoginPage = async() => {
  const session = await getServerAuthSession();
  if(session !== null){
    return <Home/>
  }
  return (
    <div className='flex items-center justify-center  h-screen w-full'>
      <Image
      src="/bgimg4.svg"
      width={100}
      height={100}
      className="absolute inset-0 w-full h-full object-cover z-0"
      alt="Background Image"
    />
    <SignInForm session={session}/>
  </div>
  )
}

export default LoginPage