import React from 'react'
import { SignUpForm } from '~/components/form/register'
import { getServerAuthSession } from '~/server/auth';


const SignUpPage = async() => {
  const session = await getServerAuthSession();
  console.log(session)
  return (
    <div className='flex items-center justify-center h-screen w-full bg-gray-50'>
        <SignUpForm session={session}/>
    </div>
  )
}

export default SignUpPage