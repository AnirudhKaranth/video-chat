import React from 'react'
import Home from '~/app/page';
import { SignInForm } from '~/components/form/login'
import { getServerAuthSession } from '~/server/auth';


const LoginPage = async() => {
  const session = await getServerAuthSession();
  if(session !== null){
    return <Home/>
  }
  return (
    <div className='flex items-center justify-center bg-gray-900 h-screen w-full'>
      <SignInForm session={session}/>
    </div>
  )
}

export default LoginPage