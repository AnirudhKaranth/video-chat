import React from 'react'
import Home from '~/app/page';
import { SignUpForm } from '~/components/form/register'
import { getServerAuthSession } from '~/server/auth';


const SignUpPage = async() => {
  const session = await getServerAuthSession();
  console.log(session)
  if(session !== null){
    <Home/>
  }
  return (
    <div className='flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-950 to-gray-900 h-screen w-full'>
        <SignUpForm session={session}/>
    </div>
  )
}

export default SignUpPage