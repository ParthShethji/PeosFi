import { ethers } from "ethers";
import "dotenv/config";

const NEXT_WEB3_RPC = process.env.NEXT_WEB3_RPC;
if (!process.env.NEXT_WEB3_RPC) {
  console.warn(
    "No NEXT_WEB3_RPC environment variable found. Defaulting to Alchemy."
  );
}

export const getProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider(NEXT_WEB3_RPC);
  return provider;
};

export const getBalanceETH = async (address: string): Promise<number> => {
  const provider = getProvider();
  const balanceInWei = await provider.getBalance(address);
  // console.log({ balance: balanceInWei.toString() });
  const balanceInEth = Number(balanceInWei.toString()) / 10 ** 18;
  return balanceInEth;
};

export const getTotalEthValueOfFollowers = async (
  addresses: string[]
): Promise<number> => {
  let totalEthValue = 0;

  await Promise.all(
    addresses.map(async (address) => {
      try {
        const balanceInEth = await getBalanceETH(address);
        totalEthValue += balanceInEth;
      } catch (error) {
        console.error(`Failed to get balance for address ${address}: ${error}`);
      }
    })
  );
  console.log({ totalEthValue });

  return totalEthValue;
};

// getTotalEthValueOfFollowers([
//   "0x6fac2bcca1f5397bf2bc96aa4ae8f35728882761",
//   "0x31304ccdd28e62ef552824db08a350d752068c39",
// ]);