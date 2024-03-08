"use client";
import Link from "next/link";
import { SessionType } from "../../app/page";
import Navbar from "../Navbar";
import LoginPage from "~/app/auth/login/page";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { useState } from "react";

const HomePage = ({ session }: { session: SessionType | null }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const createRoom= api.room.createRoom.useMutation();

  const handleLogout = async (): Promise<void> => {
    await signOut();
    console.log("first");
    router.push("/auth/login");
  };


  const handleCreateRoom = async()=>{
    const response = await createRoom.mutateAsync()
    router.push(`/rooms/?roomId=${response.roomName}`)
  }

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <div>
        <button type="button" onClick={handleCreateRoom}>Create Meeting</button>
        <button type="button" onClick={async()=>router.push("/rooms/join")}>Join Meeting</button>
      </div>
    </div>
  );
};

export default HomePage;
