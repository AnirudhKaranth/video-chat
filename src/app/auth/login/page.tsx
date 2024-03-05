import React from 'react'
import { SignInForm } from '~/components/form/login'
import { getServerAuthSession } from '~/server/auth';


const LoginPage = async() => {
  const session = await getServerAuthSession();
  return (
    <div className='flex items-center justify-center bg-gray-100 h-screen w-full'>
      <SignInForm session={session}/>
    </div>
  )
}

export default LoginPage