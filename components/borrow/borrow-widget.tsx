"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAccount } from "wagmi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { socialABI, socialPool, p2pLending, p2pABI } from "@/lib/utils";
import { getEthersSigner } from "@/lib/signer";
import { ethers, Contract } from "ethers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { LoaderIcon, RocketIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { getChainInfo } from "../../lib/utils";

export default function BorrowWidget({
  score,
  setIsLoanDisplayed,
}: {
  score: string;
  setIsLoanDisplayed: (value: boolean) => void;
}) {
  const INTEREST_RATE = {
    percentage: 20,
    scNumber: BigInt(6341958396752918000),
  };
  const { address } = useAccount();
  const [duration, setDuration] = useState<string | undefined>();
  const [amount, setAmount] = useState<string | undefined>("0");
  const [loanTxLoading, setLoanTxLoading] = useState<boolean>(false);
  const [loanTxSuccess, setLoanTxSuccess] = useState<boolean>(false);
  const [requestTxLoading, setRequestTxLoading] = useState<boolean>(false);
  const [requestTxSuccess, setRequestTxSuccess] = useState<boolean>(false);
  // const { config, error } = usePrepareContractWrite({
  //   address: socialPool,
  //   abi: socialABI,
  //   functionName: "borrow",
  //   args: [
  //     {
  //       amount: BigInt(1),
  //       limitRepayDate: BigInt(1),
  //       borrower: "0x674dc72D0738D2f905aE9F3ef17C0384c8bd28d2",
  //       interestRate: BigInt(1),
  //     },
  //     "0x",
  //     BigInt(123),
  //   ],
  // });
  // const { write } = useContractWrite(config);

  // async function borrow() {
  //   try {
  //     setLoanTxLoading(true);
  //     const signer = await getEthersSigner();
  //     if (!signer || !address) return;
  //     const chainId = signer.provider._network.chainId;
  //     const currentChainInfos = getChainInfo(chainId);
  //     console.log({ signer, chainId, currentChainInfos });

  //     const contract = new Contract(currentChainInfos.pool, socialABI, signer);
  //     const authorizedAmount = Math.min(parseFloat(score), Number(amount));
  //     const amountInWei = BigInt(Number(authorizedAmount) * 10 ** 18);
  //     const nowInSec = Math.floor(Date.now() / 1000);
  //     const durationInSec = Number(duration) * 24 * 60 * 60;
  //     const limitRepayDate = nowInSec + durationInSec;
  //     const loanTerms = [
  //       address,
  //       amountInWei,
  //       INTEREST_RATE.scNumber,
  //       limitRepayDate,
  //     ];
  //     const apiSignature = "0x";
  //     const apiNonce = 123;
  //     const tx = await contract.borrow(loanTerms, apiSignature, apiNonce, {
  //       gasLimit: 5000000,
  //     });
  //     console.log({ tx });
  //     await new Promise((resolve) => setTimeout(resolve, 5000));
  //     // const txResponse = await signer.sendTransaction(tx);
  //     // console.log({ txResponse });
  //     setLoanTxSuccess(true);
  //     setIsLoanDisplayed(true);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoanTxLoading(false);
  //   }
  // }

  async function borrow() {
    try {
      setLoanTxLoading(true);
      const signer = await getEthersSigner();
      if (!signer || !address) return;
      const chainId = await signer.getChainId();
      const currentChainInfos = getChainInfo(chainId);
  
      const contract = new Contract(currentChainInfos.pool, socialABI, signer);
      
      // Use a fixed amount for testing
      const amountInWei = ethers.utils.parseUnits("100", 18); // Assuming 18 decimals
      
      const nowInSec = Math.floor(Date.now() / 1000);
      const durationInSec = 30 * 24 * 60 * 60; // 30 days
      const limitRepayDate = nowInSec + durationInSec;
      
      // Dummy interest rate (20% APR in Ray format)
      const dummyInterestRate = "63419583967529180000000000";
  
      const loanTerms = [
        address,
        amountInWei,
        dummyInterestRate,
        limitRepayDate,
      ];
  
      // Dummy values for testing
      const apiSignature = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef00";
      const apiNonce = 12345;
  
      const tx = await contract.borrow(loanTerms, apiSignature, apiNonce, {
        gasLimit: 500000, // Reduced gas limit for testing
      });
  
      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed");
  
      setLoanTxSuccess(true);
      setIsLoanDisplayed(true);
    } catch (error) {
      console.error("Borrow error:", error);
    } finally {
      setLoanTxLoading(false);
    }
  }

  async function requestLoan() {
    setRequestTxLoading(true);
    try {
      const signer = await getEthersSigner();
      if (!signer || !address) return;
      const chainId = signer.provider._network.chainId;
      const currentChainInfos = getChainInfo(chainId);
      console.log({ signer, chainId, currentChainInfos });
      const contract = new Contract(currentChainInfos.p2p, p2pABI, signer);
      const amountLeft = parseFloat(amount) - parseFloat(score);
      if (amountLeft <= 0) return;
      const amountInWei = BigInt(amountLeft * 10 ** 18);
      const nowInSec = Math.floor(Date.now() / 1000);
      const durationInSec = Number(duration) * 24 * 60 * 60;
      const limitRepayDate = nowInSec + durationInSec;
      const interestRate = INTEREST_RATE.scNumber;
      const tx = await contract.requestLoan(
        amountInWei,
        interestRate,
        limitRepayDate
      );
      console.log({ tx });
      // //TODO: post on lens
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setRequestTxSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setRequestTxLoading(false);
    }
  }

  return (
    <div className="w-[50%] rounded-3xl z-20 h-[105%] gap-3 bg-white/5 flex flex-col py-8 px-16 drop-shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Borrow USDC</h1>
      <div className="bg-white/5 rounded-xl px-3 py-5">
        <h1 className="text-sm text-white pl-3">Borrow Amount</h1>
        <Input
          placeholder={`0`}
          className="border-none text-3xl text-white"
          onChange={(e) => setAmount(e.target.value)}
        />
        <p className="text-xs text-right text-white pr-3">
          Max {score} instant USDC
        </p>
      </div>
      <Select value={duration} onValueChange={(value) => setDuration(value)}>
        <SelectTrigger className="w-full mt-3">
          <SelectValue placeholder="Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 Day</SelectItem>
          <SelectItem value="7">7 Days</SelectItem>
          <SelectItem value="30">30 Days</SelectItem>
        </SelectContent>
      </Select>

      {/* <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog> */}

      {/* <Button
        className="mt-3 cursor-pointer bg-white text-black disabled:opacity-50"
        disabled={amount == "0" || duration == "0" || !duration || !amount}
        onClick={() => borrow()}
      >
        Borrow
      </Button> */}

      <Dialog>
        <DialogTrigger className="w-full mb-3">
          <Button
            disabled={amount == "0" || duration == "0" || !duration || !amount}
            className="mt-3 cursor-pointer bg-white text-black disabled:opacity-50"
          >
            Borrow
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Borrow {amount} USDC :
            </DialogTitle>
            <DialogDescription className="flex justify-center flex-col">
              <Alert className="border-none flex flex-col items-center justify-center">
                <AlertTitle>Conditions of loan:</AlertTitle>
                <div className="flex w-full justify-evenly mt-4">
                  <p>{INTEREST_RATE.percentage} % APR</p>
                  <p>{duration} days to repay</p>
                </div>
              </Alert>
              <div
                // className=`flex justify-center>
                className="flex justify-center"
              >
                <Button
                  variant="outline"
                  className={`${
                    loanTxSuccess && "bg-green-300"
                  } mx-auto w-5/12 text-black p-8`}
                  onClick={() => borrow()}
                >
                  {!loanTxSuccess && loanTxLoading && (
                    <LoaderIcon className="animate-spin" />
                  )}
                  {!loanTxSuccess && !loanTxLoading && (
                    <p>
                      Borrow{" "}
                      <span className="font-bold">
                        {Math.min(parseFloat(score), Number(amount))} USDC
                      </span>{" "}
                      from social pool
                    </p>
                  )}
                  {loanTxSuccess && (
                    <p>
                      Successfully borrowed{" "}
                      <span className="font-bold">
                        {Math.min(parseFloat(score), Number(amount))} USDC
                      </span>{" "}
                    </p>
                  )}
                </Button>
                {parseFloat(amount) - parseFloat(score) > 0 && (
                  <Button
                    variant="outline"
                    className={`${
                      requestTxSuccess && "bg-green-300"
                    } mx-auto w-5/12 text-black p-8`}
                    onClick={() => requestLoan()}
                  >
                    {!requestTxSuccess && requestTxLoading && (
                      <LoaderIcon className="animate-spin" />
                    )}
                    {!requestTxSuccess && !requestTxLoading && (
                      <p>
                        Ask{" "}
                        <span className="font-bold">
                          {parseFloat(amount || "0") - parseFloat(score)} USDC
                        </span>{" "}
                        to your network
                      </p>
                    )}
                    {requestTxSuccess && (
                      <p>
                        Successfully requested{" "}
                        <span className="font-bold">
                          {parseFloat(amount || "0") - parseFloat(score)} USDC
                        </span>{" "}
                      </p>
                    )}
                  </Button>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
