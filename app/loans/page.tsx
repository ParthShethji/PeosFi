"use client";
import BorrowWidget from "@/components/borrow/borrow-widget";
import MyBorrows from "@/components/borrow/my-borrows";
import Pools from "@/components/lend/pools";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function LoansPage() {
  const { address } = useAccount();
  const [score, setScore] = useState<any>();
  const [isLoanDisplayed, setIsLoanDisplayed] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

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

  useEffect(() => {
    getScore(address!);
  }, [address]);
  return (
    <>
      {/* {ready && authenticated && ( */}
      <div className="w-full flex justify-center items-center flex-col text-white gap-10 mt-10">
        <h1 className="text-5xl font-bold animate-pulse">
          You can borrow up to {score} USDC ✨
        </h1>
        <Tabs
          defaultValue="borrow"
          className=" w-7/12 flex flex-col justify-center gap-5"
        >
          <TabsList className="mx-auto bg-bg">
            <TabsTrigger value="borrow" className="w-32 ">
              Borrow
            </TabsTrigger>
            <TabsTrigger value="loan" className="w-32">
              Lend
            </TabsTrigger>
          </TabsList>
          <TabsContent value="borrow">
            <div className="m-auto h-96 bg-bg rounded-3xl flex items-center">
              <BorrowWidget score={score} setIsLoanDisplayed={setIsLoanDisplayed} />
              <MyBorrows isLoanDisplayed={isLoanDisplayed} />
            </div>
          </TabsContent>
          <TabsContent value="loan">
            <div className="m-auto bg-bg rounded-3xl flex flex-col items-center">
              <Pools />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* )} */}
    </>
  );
}
