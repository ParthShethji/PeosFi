"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import React, { useState } from 'react';
import { ChevronDown, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Address from "./ui/address";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { useToast } from "./ui/use-toast";
import { useToast } from "./ui/use-toast";
import GlassCard from "./ui/reclaimCard";
import Logo from "./logo";
import { Toaster } from "@/components/ui/toaster";
import { useAccount } from "wagmi";
import { useEffect, useRef } from "react";
export default function Header() {
  const router = useRouter();
  const { address } = useAccount();
  // const { isConnected } = useAccount();
  // const [ready, setReady] = useState(false);

  const ready = address;
  // const afterconnect = () => {
  //   setInterval(() => {
  //     console.log('checking', ready);
  const isInitialRender = useRef(true); // useRef to track initial render
  // let count = 0
  //   }, 1000);
  // }
  // if (isInitialRender.current) {
  //   console.log('test3')
  //   // if(count > 1)
  //   isInitialRender.current = true;
  
  // }
  const [showCard, setShowCard] = useState(false);
  const [connectWallet, setConnectWallet] = useState(false);
  const { toast } = useToast(); // Use the toast hook
  const openCard = () => setShowCard(true);
  const closeCard = () => {
    setShowCard(false);
    setConnectWallet(true);
  };

  const handleSuccess = () => {
    closeCard();
    toast({
      title: "Verification Successful",
      description: "Your verification was successful.",
      // status: "success",
      className: "toast-success"
    });
  };

  const clickhandle = () => {
    openCard();
    isInitialRender.current = false;
  }
  useEffect(() => {
    // console.log('test1')
    
    const fetchData = async () => {
      try {
        console.log(address);
        const response = await fetch("/api/graphdb?addr="+address);
        console.log(response);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        if(data.savedUsers.length == 0){
          if (!isInitialRender.current && ready) {
            router.push("http://localhost:3000");
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    if(address != undefined){
      fetchData();
    }
    // if (isInitialRender.current) {
    //   console.log('test3')
    //   // if(count > 1)
    //   isInitialRender.current = false;
    //   return;
    // }
  }, [ready]); 
  return (
    <div className="flex ml-52 mt-10 text-white w-full first-letter:justify-between items-center">
      <Link
        href="/"
        className="flex items-center space-x-2 font-bold w-44 text-xl"
      >
        {/* <Logo width={120} height={120} /> */}
        <h4 className=" font-bold text-4xl my-8">
        PeosFi
      </h4>
      </Link>
      <div className="flex gap-3">
        <Button className="text-xl" variant={"ghost"} onClick={() => router.push("/social")}>
          Social
        </Button>
        <Button className="text-xl" variant={"ghost"} onClick={() => router.push("/loans")}>
          Loan
        </Button>
        <Button
          variant={"ghost"}
          className="text-xl"
          onClick={() => router.push("/profile/" + address)}
        >
          Profile
        </Button>
      </div>

      {/* <Button variant="link">
        <div className="test" onClick={() => clickhandle()}>
          <ConnectButton />
        </div>
      </Button> */}
        <div>
      {showCard && <GlassCard onClose={closeCard} onSuccess={handleSuccess} />}
      <Button variant="link">
        <div className="test" onClick={() => clickhandle()}>
          <ConnectButton />
        </div>
      </Button>
    </div>
    <Toaster />
    </div>

    // i will win
  );
}
