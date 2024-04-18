import { useEffect } from "react";
import Web3 from "web3";

const saveUserContractAddr = "0x9b174795Bf15Fd960f6640fA67a527aF01A4Fa8d";
const saveUserABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "walletAdd",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "hash",
        type: "uint256",
      },
    ],
    name: "SavedUser",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "walletAdd",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "hash",
        type: "uint256",
      },
    ],
    name: "saveUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const useSaveUserContract = (
  Web3,
  saveUserABI,
  saveUserContractAddr,
  walletAddress,
  hash
) => {
  const saveUserContract = new Web3.eth.Contract(
    saveUserABI,
    saveUserContractAddr
  );

  const saveUserToContract = async () => {
    try {
      const accounts = await Web3.eth.getAccounts();
      await saveUserContract.methods
        .saveUser(walletAddress, hash)
        .send({ from: accounts[0] });
      console.log("User data saved successfully.");
    } catch (error) {
      console.error("Error saving user data: ", error);
    }
    return { saveUserToContract };
  };
};

export default async function handler(req, res) {
  // console.log("on request");
  // if (req.method === 'POST') {
  // Process a POST request
  const addr = req.query.addr;
  const hash = req.query.hash;
  // const { body } = req;
  // console.log(body);
  const response = await useSaveUserContract(
    Web3,
    saveUserABI,
    saveUserContractAddr,
    addr,
    hash
  );
  console.log(response);
  return res.status(200).json({ response });
  // }
}
// export useSaveUserContract;
