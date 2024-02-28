import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <>
      <div>
        Home Page
        <Link href={"/signup-"}> sign up</Link>
      </div>
    </>
    
  );
}

