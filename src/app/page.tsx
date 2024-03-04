
import Link from "next/link";
import {  getServerAuthSession} from "~/server/auth";

export default async function Home() {

  const session = await getServerAuthSession();
  console.log(session)

  return (
    <>
      <div>
        Home Page
        <Link href={"/auth/signup"}> sign up</Link>
  
      </div>
    </>
    
  );
}

