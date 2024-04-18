"use client";
import { LensLoginButton } from "@/components/LensLoginButton";
import {
  LensProvider,
  FeedItem,
  ProfilePictureSet,
  ProfileOwnedByMe,
} from "@lens-protocol/react-web";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

import { lensConfig } from "@/lib/lens-config";
import { useState, useEffect } from "react";
import { LensPost } from "@/components/LensPost";
import { useRouter } from "next/navigation";
import { timeAgo } from "@/lib/utils";
import { useAccount } from "wagmi";
import { getUserOnChainData } from "@/lib/next-id";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
export default function Social() {
  //   const [activeLensProfile, setActiveLensProfile] =
  //     useState<ProfileOwnedByMe>();

  const [lensFeed, setLensFeed] = useState([] as FeedItem[]);
  const [lensFollowersAddresses, setLensFollowersAddresses] = useState([""]);
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    getUser(address);
    getScore(address);
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  const testLens = [
    {
      root: {
        createdAt: "2023-09-23T21:50:16.000Z",
        profile: {
          name: "Test User",
          picture: {
            original: {
              url: "https://i.pravatar.cc/300",
            },
          },
        },
        metadata: {
          content:
            "Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!",
        },
      },
    },
    {
      root: {
        createdAt: "2023-09-23T21:50:16.000Z",
        profile: {
          name: "Test User",
          picture: {
            original: {
              url: "https://i.pravatar.cc/300",
            },
          },
        },
        metadata: {
          content:
            "Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!",
        },
      },
    },
    {
      root: {
        createdAt: "2023-09-23T21:50:16.000Z",
        profile: {
          name: "Test User",
          picture: {
            original: {
              url: "https://i.pravatar.cc/300",
            },
          },
        },
        metadata: {
          content:
            "Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!",
        },
      },
    },
  ];
  const [profile, setProfile] = useState<any>();
  const [score, setScore] = useState<any>();
  // const { address } = useAccount();
  const params = {"address":address};
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
  return (
    <div>
      <LensProvider config={lensConfig}>
        <main className="flex min-h-screen flex-col items-center">
      
          {/* {activeLensProfile && <LensPost profile={activeLensProfile} />} */}
          <div className="bg-bg rounded-2xl p-10 max-h-[600px] overflow-y-auto">
            {lensFeed.map((feedItem, i) => (
              <div
                key={i}
                className="flex  border-b-white/20 border-b py-5 text-purple-100 cursor-pointer hover:bg-white/5 transition-all px-3"
                onClick={() => {
                  router.push("/profile/" + feedItem.root.profile.ownedBy);
                }}
              >
                <img
                  className="h-12 w-12 rounded-full mr-3"
                  src={
                    (feedItem.root.profile.picture as ProfilePictureSet)
                      ?.original?.url
                  }
                />
                <div className="flex flex-col">
                  <p className="font-bold">
                    {feedItem.root.profile.name}{" "}
                    <span className="ml-1 text-xs text-gray-500 font-normal">
                      {timeAgo(feedItem.root.createdAt)}
                    </span>
                  </p>
                  <p>{feedItem.root.metadata.content === 'yo les zozos' ? 'Just borrowed 140 USDC' : feedItem.root.metadata.content}</p>
                </div>
              </div>
            ))}
            <p className="text-center text-white/90 text-sm">
              {/* {activeLensProfile ? "No posts yet" : "Please connect to Lens"} */}
              {/* {!activeLensProfile && ( */}
              <LensLoginButton
                setLensFeed={setLensFeed}
                setLensFollowersAddresses={setLensFollowersAddresses}
                //   activeLensProfile={activeLensProfile}
                //   setActiveLensProfile={setActiveLensProfile}
              />
              {/* )} */}
              <div className="flex flex-col w-full gap-8 justify-center items-center">
              
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
                    <p className="m-0 p-0 flex flex-col gap-4 items-center text-sm">
                      <p className="mr-8">{profile?.identity}</p>
                      <p>Need Some Crypto asap ! </p>
                      {/* {params.address.toLowerCase() ===
                        "0x0f060c6cf1E11C5f5dED60932f9CadCAcA24E49C".toLowerCase() && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <img
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
                      )} */}
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
                    <p className="m-0 p-0 flex flex-col gap-4 items-center text-sm">
                      <p className="mr-8">{profile?.identity}</p>
                      <p> Hey wanted some Crypto! </p>
                      {/* {params.address.toLowerCase() ===
                        "0x0f060c6cf1E11C5f5dED60932f9CadCAcA24E49C".toLowerCase() && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <img
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
                      )} */}
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
                <div className="glass p-5 w-1/3 text-lg rounded-xl h-20 flex items-center justify-center transition duration-300 ease-in-out hover:bg-opacity-80 hover:bg-gray-900" role="button">
                  Create Post with Gemini
                </div>
            </div>
            </p>
          </div>
        </main>
      </LensProvider>
    </div>
  );
}
