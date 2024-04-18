import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { ethers } from 'ethers';


type HomeProps = {
  setUseTestAadhaar: (state: boolean) => void;
  useTestAadhaar: boolean;
};

export default function Home({ setUseTestAadhaar, useTestAadhaar }: HomeProps) {
  // Use the Country Identity hook to get the status of the user.
  const [anonAadhaar, setanonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const specificDivRef = useRef(null);
  const router = useRouter();
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
  const contractAddress = '0x9b174795Bf15Fd960f6640fA67a527aF01A4Fa8d'; // Replace with your contract address

  const switchAadhaar = () => {
    setUseTestAadhaar(!useTestAadhaar);
  };
  
  useEffect(() => {
    // console.log('test');
    const redirect = () => {
      router.push("http://localhost:3001");
    }
    if (anonAadhaar.status === "logged-in" && router.query) {
        const apicall = async(addr: string | string[] | undefined,hash: string) => {
          console.log("apicall")
          await fetch("/api/contract?addr="+addr+"&hash="+hash);
          
          // return response.json();
        } 

        const saveUser = async (addr: any) => {
          // setIsSaving(true);
          // setError(null);
      
          try {
            console.log(typeof(window))
            const provider = new ethers.providers.Web3Provider(window.ethereum); // Replace with your Infura project ID (or a different provider)
            await provider.send("eth_requestAccounts",[]);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, saveUserABI, signer); // Replace 'abi' with your contract ABI
      
            const tx = await contract.saveUser(addr,1);
          //   await tx.wait(); // Wait for transaction confirmation
      
            console.log('User saved successfully!',tx);
            // setHashValue(''); // Clear input after successful save
          } catch (err) {
            console.error('Error saving user:', err);
          //   setError(err.message);
          }
        };
      // Function to be called when the specific div is rendered
      // router.push('http://localhost:3001');
      // shareAddrHash(address,hash);
      console.log(JSON.parse(anonAadhaar.anonAadhaarProofs[0]?.pcd).claim?.signalHash);
      // const { addr } = router.query;
      const addr = "0x166Eb494F047Ae0b95CE71Cd29e5c13De61229AA";
      console.log("test",addr);
      // apicall(addr,JSON.parse(anonAadhaar.anonAadhaarProofs[0]?.pcd).claim?.signalHash);
      saveUser(addr,JSON.parse(anonAadhaar.anonAadhaarProofs[0]?.pcd).claim?.signalHash);
      redirect();
    }
  }, [anonAadhaar.status,router.query]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <main className="flex flex-col items-center gap-8 bg-white rounded-2xl max-w-screen-sm mx-auto h-[24rem] md:h-[20rem] p-8">
        <h1 className="font-bold text-2xl">Welcome to Anon Aadhaar Example</h1>
        <p>Prove your Identity anonymously using your Aadhaar card.</p>

        {/* Import the Connect Button component */}
        <LogInWithAnonAadhaar nullifierSeed={1234} />

        {useTestAadhaar ? (
          <p>
            You&apos;re using the <strong> test </strong> Aadhaar mode
          </p>
        ) : (
          <p>
            You&apos;re using the <strong> real </strong> Aadhaar mode
          </p>
        )}
        <button
          onClick={switchAadhaar}
          type="button"
          className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Switch for {useTestAadhaar ? "real" : "test"}
        </button>
      </main>
      <div className="flex flex-col items-center gap-4 rounded-2xl max-w-screen-sm mx-auto p-8">
        {/* Render the proof if generated and valid */}
        {anonAadhaar.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            <p>Got your Aadhaar Identity Proof</p>
            <>Welcome anon!</>
            {latestProof && (
              <>
              <AnonAadhaarProof
                code={JSON.stringify(JSON.parse(latestProof), null, 2)}
                />
                {/* console.log(latestProof); */}
              {/* <div ref={specificDivRef}>Redirecting....</div> */}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
