"use client";
import { BarChart, LucideNetwork, Network, NetworkIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Pools() {
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [amount3, setAmount3] = useState("");

  const pools = [
    {
      apr: 10,
      tvl: 1000,
      name: "Safe Pool",
      userAmount: 3,
    },
    {
      apr: 12,
      tvl: 3000,
      name: "Worldcoin Pool",
      userAmount: 10,
    },
    {
      apr: 20,
      tvl: 2000,
      name: "Risky Pool",
      userAmount: 1,
    },
  ];

  return (
    <div className="w-full px-16 py-10 flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-center mb-3">Pools</h1>
      {pools.map((pool, index) => {
        return (
          <Accordion
            key={index}
            type="single"
            className="inline-block bg-white/5 rounded-3xl border border-white/30 px-10"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="w-48 flex text-left justify-start">
                <BarChart
                  className={`mr-2 ${
                    pool.apr <= 10
                      ? "text-green-500"
                      : pool.apr < 20
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                />
                <h1 className="w-48">{pool.name}</h1>
                <div className="w-32 flex flex-col justify-center items-center">
                  <h1>{pool.apr}%</h1>
                  <p className="text-xs">APR</p>
                </div>

                <div className="w-32 flex flex-col justify-center items-center">
                  <h1>{pool.tvl} USDC</h1>
                  <p className="text-xs">TVL</p>
                </div>

                <div className="w-48 flex flex-col justify-center items-center">
                  <h1>{pool.userAmount} USDC</h1>
                  <p className="text-xs">Your Share</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex">
                  <Input
                    value={
                      index === 0 ? amount1 : index === 1 ? amount2 : amount3
                    }
                    onChange={(e) => {
                      if (index === 0) {
                        setAmount1(e.target.value);
                      } else if (index === 1) {
                        setAmount2(e.target.value);
                      } else {
                        setAmount3(e.target.value);
                      }
                    }}
                    placeholder="Amount"
                    className="w-32 border-none bg-bg mr-3"
                  />
                  <Button>Deposit</Button>
                </div>
                <Button>Withdraw</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
}
