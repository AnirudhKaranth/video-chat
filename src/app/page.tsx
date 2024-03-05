import HomePage from "~/components/home/home";
import { getServerAuthSession } from "~/server/auth";

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

  return (
    <>
      <HomePage session={session}/>
    </>
    
  );
}

