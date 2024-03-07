"use client"
import Link from 'next/link'
import {SessionType} from '../../app/page'
import  Navbar from '../Navbar'
import LoginPage from '~/app/auth/login/page'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const HomePage = ({ session }: { session: SessionType | null }) => {
  const router = useRouter()

  const handleLogout = async (): Promise<void> => {
    await signOut();
    console.log("first")
    router.push('/auth/login');
  };

  return (
    <div>
        <Navbar handleLogout={handleLogout}/>
      

        Home Page
  
      </div>
  )
}

export default HomePage