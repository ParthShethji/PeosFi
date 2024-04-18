"use client";

import WorldcoinButton from "@/components/ui/WorldCoinButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { lensConfig } from "@/lib/lens-config";
import {
  LensProvider,
} from "@lens-protocol/react-web";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { getUserOnChainData } from "@/lib/next-id";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { LensPost } from "@/components/LensPost";
export default function Profile({ params }: { params: { address: string } }) {
  const [profile, setProfile] = useState<any>();
  const [score, setScore] = useState<any>();
  const [myBorrows, setMyBorrows] = useState<any[]>([]);
  const [myRequestedBorrows, setMyRequestedBorrows] = useState<any[]>([]);
  const [myPreviousBorrows, setMyPreviousBorrows] = useState<any[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const { address } = useAccount();

  const getUser = async (address: string) => {
    const response = await getUserOnChainData(address);
    setProfile(response);
  };

  const getScore = async (address: string) => {
    try {
      const s = await axios.get("/api/creditScore?address=" + address);
      if (s.data.message === "0")
        toast({
          title: "Score too low",
          description:
            "Score too low, this user needs to improve his social reputation or on chain footprint.",
        });
      setScore(s.data.message);
    } catch (e) {
      toast({
        title: "Score too low",
        description:
          "Score too low, this user needs to improve his social reputation or on chain footprint.",
      });
      setScore("0");
    }
  };

  // const approve = async () => {
  //   try {
  //     const s = await axios.post("/api/approve", {
  //       beneficiary: params.address,
  //       endorser: address,
  //     });
  //   } catch (e) {
  //     toast({
  //       title: "Error approve",
  //       description: "Little issue with the approve, sorry.",
  //     });
  //   }
  // };

  const isMyProfile = address === params.address;

  const allBorrows = [
    {
      address: "0xdd028D77462a0dc7e58413cD4E13d4Ce2BD702A0",
      borrows: [
        {
          address: "0x674dc72D0738D2f905aE9F3ef17C0384c8bd28d2",
          amount: 35,
          duration: 1,
          interest: 20,
          daysLeft: 1,
          owed: 35 * 1.2,
          loanId: 0,
        },
      ],
      requestedBorrows: [
        {
          address: "0x674dc72D0738D2f905aE9F3ef17C0384c8bd28d2",
          amount: 5,
          duration: 1,
          interest: 20,
          daysLeft: 1,
          owed: 3.75,
        },
      ],
      previousBorrows: [
        {
          address: "0x674dc72D0738D2f905aE9F3ef17C0384c8bd28d2",
          amount: 12,
          duration: 7,
          interest: 22,
          daysLeft: 2,
          owed: 3.75,
          paid: true,
        },
        {
          address: "0x674dc72D0738D2f905aE9F3ef17C0384c8bd28d2",
          amount: 8,
          duration: 7,
          interest: 19,
          daysLeft: 2,
          owed: 3.75,
          paid: true,
        },
      ],
    },
    {
      address: "0x0f060c6cf1E11C5f5dED60932f9CadCAcA24E49C",
      borrows: [
        {
          address: "0x0f060c6cf1E11C5f5dED60932f9CadCAcA24E49C",
          amount: 10,
          duration: 7,
          interest: 18,
          daysLeft: 4,
          owed: 35 * 1.2,
          loanId: 0,
        },
      ],
      requestedBorrows: [
        {
          address: "0x0f060c6cf1E11C5f5dED60932f9CadCAcA24E49C",
          amount: 6,
          duration: 7,
          interest: 20,
          daysLeft: 7,
          owed: 3.75,
        },
      ],
      previousBorrows: [
        {
          address: "0x0f060c6cf1E11C5f5dED60932f9CadCAcA24E49C",
          amount: 10,
          duration: 1,
          interest: 21,
          daysLeft: 1,
          owed: 3.75,
          paid: true,
        },
      ],
    },
  ];

  useEffect(() => {
    const myAddress = params.address;
    const myBorrows = allBorrows.find(
      (b) => b.address.toLowerCase() === myAddress.toLowerCase()
    );
    setMyBorrows(myBorrows?.borrows);
    setMyRequestedBorrows(myBorrows?.requestedBorrows);
    setMyPreviousBorrows(myBorrows?.previousBorrows);
  }, [params.address]);

  

  const trusters = [
    {
      name: "madderstone.eth",
      address: "0x0f060c6cf1E11C5f5dED60932f9CadCAcA24E49C",
    },
    {
      name: "hello_there_bro.eth",
      address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    },
  ];

  // const getBorrows = async () => {
  //   const l = await axios.post("/api/loans", {
  //     address: "0x674dc72D0738D2f905aE9F3ef17C0384c8bd28d2",
  //   });
  //   setLoans(l.data.message);
  //   console.log(l.data.message);
  // };

  // useEffect(() => {
  //   getBorrows();
  // }, []);

  useEffect(() => {
    getUser(params.address);
    getScore(params.address);
  }, [params]);

  const approve = async (beneficiary: string) => {
    await axios.post("/api/approve", { endorser: address, beneficiary });
  };

  const deleteApprove = async (beneficiary: string) => {
    try {
      console.log({
        beneficiary,
        endorser: address,
      });
      const s = await axios.post("/api/delete-approve", {
        beneficiary,
        endorser: address,
      });
    } catch (e) {
      toast({
        title: "Error approve",
        description: "Little issue with the approve, sorry.",
      });
    }
  };

  return (
    <LensProvider config={lensConfig}>
      <div className="flex w-10/12 mx-auto gap-5 mt-5">
        <div className="p-10 bg-bg w-7/12 rounded-3xl">
          {!profile && (
            <Loader2 className="block mx-auto animate-spin text-white" />
          )}
          {profile && (
            <div className="flex justify-between gap-10 items-center flex-wrap ">
              <div className=" glass px-10 py-5 flex justify-between rounded-[50px] items-center text-white">
                <div>
                  <h1 className="m-0 p-0 flex items-center mb-1">
                    {profile?.ENS}
                    {profile?.ENS && (
                      <svg
                        onClick={() =>
                          window.open("https://web3.bio/" + profile.ENS)
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="ml-3 w-4 h-4 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    )}
                  </h1>
                  <p className="m-0 p-0 flex items-center text-sm">
                    <p className="mr-8">{profile?.identity}</p>
                    {params.address.toLowerCase() ===
                      "0x0f060c6cf1E11C5f5dED60932f9CadCAcA24E49C".toLowerCase() && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Image
                              src={"/wld.png"}
                              className=" mr-1 object-contain"
                              width={64}
                              height={64}
                              alt={profile.source}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified with Worldcoin</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </p>
                </div>
                <div className="text-center">
                  {score && <h1 className="font-bold text-2xl">{score}USDC</h1>}
                  {!score && (
                    <Loader2 className="block mx-auto animate-spin text-white" />
                  )}
                  <Badge variant="secondary">CREDIT LINE</Badge>
                </div>
              </div>
            </div>
          )}
          {profile && isMyProfile && (
            <WorldcoinButton address={address}></WorldcoinButton>
          )}
          {!isMyProfile && profile && (
            <div className="flex text-white gap-5 p-5 justify-center items-center">
              <AlertDialog>
                <AlertDialogTrigger>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant={"secondary"}
                          className="w-32 bg-green-500 hover:bg-green-500 hover:opacity-80 text-white"
                          // onClick={() => approve(params.address)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                            />
                          </svg>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-green-500 text-white">
                        <p>Trust</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <Alert variant="destructive">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>

                        <AlertTitle>Read Carefully</AlertTitle>
                        <AlertDescription>
                          Trusting this user exposes you to a risk of losing
                          score points. This will have a direct impact on your
                          APR and ability to borrow. Only trust users you know
                          and trust.
                        </AlertDescription>
                      </Alert>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-black"
                      onClick={() => approve(params.address)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant={"secondary"}
                          className="w-32 bg-red-500 hover:bg-red-500 hover:opacity-80 text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                            />
                          </svg>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-red-500 text-white">
                        <p>Distrust</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <Alert variant="destructive">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>

                        <AlertTitle>Read Carefully</AlertTitle>
                        <AlertDescription>
                          Distrusting this user exposes you to a risk of losing
                          score points. This will have a direct impact on your
                          APR and ability to borrow. Only ditrust users that you
                          know have bad intentions.
                        </AlertDescription>
                      </Alert>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-black"
                      onClick={() => deleteApprove(params.address)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          {profile && (
            <Tabs
              defaultValue="trusted"
              className=" w-full flex flex-col justify-center gap-5 mt-3rounded-xl px-10 py-5"
            >
              <TabsList className="bg-transparent gap-10">
                <TabsTrigger
                  className="w-full opacity-90 border rounded-full"
                  value="trusted"
                >
                  Trusted By
                </TabsTrigger>
                <TabsTrigger
                  className="w-full opacity-90 border rounded-full"
                  value="social"
                >
                  Social Identities
                </TabsTrigger>
              </TabsList>
              <TabsContent value="trusted">
                {profile && trusters.length > 0 && (
                  <div className="flex flex-col gap-5">
                    {trusters.filter(
                      (truster: any) => truster.address.toLowerCase() !== params.address.toLowerCase()
                    ).map((truster, index) => {
                      return (
                        <div
                          onClick={() =>
                            router.push(`/profile/${truster.address}`)
                          }
                          key={index}
                          className="bg-bg cursor-pointer rounded-full p-3 px-5 text-white h-10 flex items-center "
                        >
                          <h1>{truster.name}</h1>
                        </div>
                      );
                    })}
                  </div>
                )}

                {profile && trusters.length === 0 && (
                  <p className="text-xs text-center text-white">
                    Nobody trusted this user
                  </p>
                )}
              </TabsContent>
              <TabsContent value="social">
                {profile && profile?.neighbors.length > 0 && (
                  <div>
                    {profile?.neighbors.map((neighbor: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="mb-3 glass text-white w-full px-10 py-3 flex rounded-[50px]"
                        >
                          <div className="flex justify-between w-full text-sm items-center">
                            <h1 className="m-0 p-0">
                              {neighbor.displayName || "Display"}
                            </h1>
                            <p className="m-0 p-0 ">{neighbor.identity}</p>
                            <p className="m-0 p-0 flex-col flex text-center">
                              <span className="font-bold text-xs">
                                Platform
                              </span>{" "}
                              {neighbor.source}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {profile && profile?.neighbors.length === 0 && (
                  <p className="text-xs text-center text-white">
                    No social identities
                  </p>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>

        <div className="w-5/12 text-white">
          <div className="">
            <p className="text-center mb-3 text-md ">Requested loans</p>
            {myRequestedBorrows?.map((borrow, index) => (
              <Dialog key={index}>
                <DialogTrigger className="w-full mb-3">
                  <div className="cursor-pointer glass p-3 px-5 flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-bold">
                        0/{borrow.amount} USDC
                      </h1>
                      <p className="text-xs text-left text-white/80">
                        {borrow.duration} Days
                      </p>
                    </div>
                    <div className="text-right">
                      <h1 className="text-3xl font-bold">{borrow.interest}%</h1>
                      <p>{borrow.daysLeft} days left</p>
                    </div>
                  </div>
                </DialogTrigger>
                {borrow.address.toLowerCase() === address.toLowerCase() ? (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Post on Lens that you need funds!
                      </DialogTitle>
                      <DialogDescription className="flex justify-center pt-5 gap-5">
                        {/* <Button variant="outline" className="w-3/12 text-black">
                        Post
                      </Button> */}
                        <LensPost amount={borrow.amount} />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                ) : (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Help this borrower reach his loan goal
                      </DialogTitle>
                      <DialogDescription className="flex justify-center pt-5 gap-5">
                        <Input
                          placeholder="Amount"
                          className="w-5/12 bg-black/5"
                        />
                        <Button variant="outline" className="w-3/12 text-black">
                          Help
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                )}
              </Dialog>
            ))}
            
          </div>

          <div className="">
            <p className="text-center mb-3 text-md mt-5 ">Ongoing loans</p>
            {myBorrows?.map((borrow, index) => (
              <Dialog key={index}>
                <DialogTrigger className="w-full mb-3">
                  <div className="cursor-pointer glass p-3 px-5 flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-bold">
                        {borrow.amount} USDC
                      </h1>
                      <p className="text-xs text-left text-white/80">
                        {borrow.duration} Days
                      </p>
                    </div>
                    <div className="text-right">
                      <h1 className="text-3xl font-bold">{borrow.interest}%</h1>
                      <p>{borrow.daysLeft} days left</p>
                    </div>
                  </div>
                </DialogTrigger>
                {/* <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Help this borrower reach his loan goal
                  </DialogTitle>
                  <DialogDescription className="flex justify-center pt-5 gap-5">
                    <Input placeholder="Amount" className="w-5/12 bg-black/5" />
                    <Button variant="outline" className="w-3/12 text-black">
                      Help
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent> */}
              </Dialog>
            ))}
          </div>

          {myBorrows?.length === 0 && (
            <p className="m-auto text-xs text-center mt-10">
              No current borrowing
            </p>
          )}

          {myPreviousBorrows?.length > 0 && (
            <div className="mt-5">
              <p className="text-center mb-3 text-md ">Previous loans</p>
              {myPreviousBorrows.map((borrow, index) => (
                <div
                  key={index}
                  className="opacity-30 glass p-3 px-5 flex items-center justify-between mb-3"
                >
                  <div>
                    <h1 className="text-xl font-bold">{borrow.amount} USDC</h1>
                    <p className="text-xs text-left text-white/80">
                      {borrow.duration} Days
                    </p>
                  </div>
                  <div className="text-right">
                    <h1 className="text-3xl font-bold">{borrow.interest}%</h1>
                    {borrow.paid && (
                      <Badge
                        variant="secondary"
                        className="bg-green-500 text-white"
                      >
                        PAID
                      </Badge>
                    )}
                    {!borrow.paid && (
                      <Badge variant="destructive">UNPAID</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </LensProvider>
  );
}
