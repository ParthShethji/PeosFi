// import { ethers } from 'ethers';
// const provider = ethers.getDefaultProvider('sepolia'); // Replace 'sepolia' with your testnet name if needed
// const contractAddress = '0x9b174795Bf15Fd960f6640fA67a527aF01A4Fa8d'; // Replace with your contract address
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
  ]; // Replace with your contract ABI

// const con_addr = "0x9b174795Bf15Fd960f6640fA67a527aF01A4Fa8d;"
// const contract = new ethers.Contract(contractAddress, saveUserABI, con_addr);
export default async function handler(req, res) {
    // console.log("on request");
    // if (req.method === 'POST') {
    // Process a POST request
    const addr = req.query.addr;
    const hash = req.query.hash;
    // const { body } = req;
    // console.log(body);
    // const response = await useSaveUserContract(
    //   Web3,
    //   saveUserABI,
    //   saveUserContractAddr,
    //   addr,
    //   hash
    // );
    
    await saveUser(addr,hash);
    // console.log(response);
    return res.status(200).json({ "response":"ok" });
    // }
}
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const contractAddress = '0x9b174795Bf15Fd960f6640fA67a527aF01A4Fa8d'; // Replace with your contract address

// const SaveUserComponent = () => {
//   const [hashValue, setHashValue] = useState('');
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState(null);
  useEffect(() => {

    const saveUser = async (addr,hash) => {
      // setIsSaving(true);
      // setError(null);
  
      try {
        console.log(typeof(window))
        const provider = new ethers.providers.Web3Provider(window.ethereum); // Replace with your Infura project ID (or a different provider)
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, saveUserABI, signer); // Replace 'abi' with your contract ABI
  
        const tx = await contract.saveUser(addr, parseInt(hash));
      //   await tx.wait(); // Wait for transaction confirmation
  
        console.log('User saved successfully!',tx);
        setHashValue(''); // Clear input after successful save
      } catch (err) {
        console.error('Error saving user:', err);
      //   setError(err.message);
      }
    };
    saveUser();
  },[])

// 

// const contractAddr = "0x9b174795Bf15Fd960f6640fA67a527aF01A4Fa8d";
//  async function Home() {
//     const [walletAdd, setWalletAdd] = useState('');
//     const [hash, setHash] = useState('');

//     // async function saveUser() {
//         const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/');
//         const contract = new ethers.Contract(contractAddr, ['function saveUser(address,uint256)'], provider);
//     // }

//         await contract.saveUser(walletAdd, hash);
//             console.log('User saved successfully!');
//     }



