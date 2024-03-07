import HomePage from "~/components/home/home";
import { getServerAuthSession } from "~/server/auth";
import LoginPage from "./auth/login/page";
import { redirect } from "next/navigation";
export type SessionType={
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
    isOAuth?: boolean | null;
  };
}

export default async function Home() {
  const session = await getServerAuthSession();
  console.log(session)

  if(!session){
    console.log("first")
    redirect("/auth/login")
  }
  
  

  return (
    <>
      <HomePage session={session}/>
    </>
    
  );
}

