"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {SessionType} from '../../app/page'
import  Navbar from '../Navbar'

const HomePage = ({ session }: { session: SessionType | null }) => {
    const router= useRouter()
  
  console.log(session)
  if(session===null){
    router.push("/auth/login")
  }
  return (
    <div>
        <Navbar/>
      

        Home Page
        <Link href={"/auth/signup"}> sign up</Link>
  
      </div>
  )
}

export default HomePage