import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import JoinComponent from "~/components/JoinComponent";
import { getCurrentUser } from "~/lib/session";

const page = async () => {
  const sessionUser = await getCurrentUser();

  if (!sessionUser || !sessionUser.id) {
    redirect("/auth/login");
  }

  return <JoinComponent />;
};

export default page;
