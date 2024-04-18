import { ethers } from "ethers";

const SERVER_PRIVATE_KEY = process.env.SERVER_PRIVATE_KEY;

export const signMessage = async ({ loanAmount, rate, duration }) => {
  if (!SERVER_PRIVATE_KEY) {
    throw new Error("SERVER_PRIVATE_KEY is not set");
  }

  const hash = ethers.utils.solidityKeccak256(
    ["uint256", "uint256", "uint256"],
    [loanAmount, rate, duration]
  );
  const wallet = new ethers.Wallet(SERVER_PRIVATE_KEY);
  const signature = await wallet.signMessage(ethers.utils.arrayify(hash));

  return signature;
};
