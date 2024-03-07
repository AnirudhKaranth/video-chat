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
    <div className='flex items-center justify-center h-screen w-full bg-gray-50'>
        <SignUpForm session={session}/>
    </div>
  )
}

export default SignUpPage