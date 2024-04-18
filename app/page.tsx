"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount } from 'wagmi'
import '../app/globals.css'
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const ready = isConnected;

  const getStarted = () => {

    if (ready) {
      // router.push("/loans");
      console.log("pressed");
      router.push("http://localhost:3000/loans");
    }
  };
  // useEffect(() => {
    
  // }, []);

  return (
    <main className="flex min-h-[calc(100vh-150px)] flex-col items-center justify-center text-white">
      {/* <Logo width={300} height={300} /> */}
      <h1 className=" font-bold text-8xl my-3 mt-10">
        PeosFi
      </h1>
      <h1 className="font-semibold text-4xl my-3 mt-10">
        Instant loans with no collaterals
      </h1>
      <p className="italic mb-3">Your network is your networth</p>
      <div className="flex gap-3">
        <Button onClick={getStarted} variant={"secondary"} className="mt-5">
          Get Started
        </Button>
        <Button onClick={getStarted} className="mt-5">
          Learn More
        </Button>
      </div>
    </main>
  );
}
