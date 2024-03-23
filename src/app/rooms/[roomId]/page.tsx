import { redirect } from "next/navigation";
import React from "react";
import Room from "~/components/videocall/Room";
import { getCurrentUser } from "~/lib/session";

const page = async({params}:{params:{roomId:string}}) => {
  const sessionUser= await getCurrentUser()
 
  if(!sessionUser || !sessionUser.id){
    redirect("/auth/login")
    
  }

  return (
   <Room params={params} user={sessionUser} />
  );
};



export default page;
