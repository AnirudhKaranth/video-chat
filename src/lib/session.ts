import { getServerAuthSession } from "~/server/auth";


export async function getCurrentUser(){
  const session = await getServerAuthSession();

  return session?.user

}