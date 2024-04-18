import { type ClassValue, clsx } from "clsx";
import { ethers } from "ethers";
import { twMerge } from "tailwind-merge";
import { Address } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// 2023-09-23T21:50:16.000Z return 2 hours ago
export function timeAgo(date: string) {
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = now - time;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${new Date(date).toLocaleDateString()}`;
  }
}
export const getContract = () => {
  const NEXT_WEB3_TESNET_RPC = process.env.NEXT_WEB3_TESNET_RPC;
  if (!NEXT_WEB3_TESNET_RPC)
    throw new Error("NEXT_WEB3_TESNET_RPC is not defined");

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_WEB3_TESNET_RPC
  );
  const contract = new ethers.Contract(socialPool, socialABI, provider);
  return contract;
};

export const contractChains = [
  {
    chainName: "Sepolia",
    chainId: 11155111,
    token: "0x27fa57Ee81c091e71D7B12416C72EfF2A2cc70f2",
    p2p: "0xA9976E07C1e2882533e14e57E6C480A1Df555E18",
    pool: "0x63bD7E1cFb915fec9467E9c85C66e4cBA9a65aAF",
  },
  {
    chainName: "baseGoerli",
    chainId: 84531,
    token: "0xafEFeF08686014AE38f6DBFCbCF02136c1156b64",
    p2p: "0x6217d1128d4dec8ec3993f44910fcca908181180",
    pool: "0xEe5d27a1642F1E6Ba52aBeCb110eEf3fd8254Ab0",
  },

  {
    chainName: "goerli",
    chainId: 5,
    token: "0xdB6ffA2494192BbC3c664f42a423F6542c5c99ae",
    p2p: "0xd877dfb1a74972C41673D5F72d232C46386Ef5B4",
    pool: "0xf8986B3DdA96D46375a08d2a6f0F1893ce937360",
  },
  {
    chainName: "arbitrum",
    chainId: 42161,
    token: "0x650ffE307F5cc48e41DF8063D94538353f7C70a8",
    p2p: "0xb48e018d53b24c3a36f5d5e7725b70667db83b3d",
    pool: "0xe239bfb50eee1a5043e94f07d2787b87470e9d73",
  },
  {
    chainName: "polygonZkEvm",
    chainId: 1101,
    token: "0xed99be7A25fc3A2Ec67679F8483FcCEDB9eEe178",
    p2p: "0x671fB8f6Fb4f622F7f5235f817841268B299d394",
    pool: "0xc5126Eb24430d459Cd810B882C3AD286D380B6bD",
  },
  {
    chainName: "celo",
    chainId: 42220,
    token: "0x650ffE307F5cc48e41DF8063D94538353f7C70a8",
    p2p: "0xb48e018d53b24c3a36f5d5e7725b70667db83b3d",
    pool: "0xe239bfb50eee1a5043e94f07d2787b87470e9d73",
  },
  {
    chainName: "lineaTestnet",
    chainId: 59140,
    token: "0x650ffE307F5cc48e41DF8063D94538353f7C70a8",
    p2p: "0xb48e018d53b24c3a36f5d5e7725b70667db83b3d",
    pool: "0xe239bfb50eee1a5043e94f07d2787b87470e9d73",
  },
  {
    chainName: "mantle",
    chainId: 5000,
    token: "0x650ffE307F5cc48e41DF8063D94538353f7C70a8",
    p2p: "0xb48e018d53b24c3a36f5d5e7725b70667db83b3d",
    pool: "0xe239bfb50eee1a5043e94f07d2787b87470e9d73",
  },
  {
    chainName: "aurora",
    chainId: 1313161554,
    token: "0x650ffE307F5cc48e41DF8063D94538353f7C70a8",
    p2p: "0xb48e018d53b24c3a36f5d5e7725b70667db83b3d",
    pool: "0xe239bfb50eee1a5043e94f07d2787b87470e9d73",
  },
  {
    chainName: "neonDevnet", // c mort
    chainId: 245022934,
    token: "0x650ffE307F5cc48e41DF8063D94538353f7C70a8",
    p2p: "0xb48e018d53b24c3a36f5d5e7725b70667db83b3d",
    pool: "0xe239bfb50eee1a5043e94f07d2787b87470e9d73",
  },
  {
    chainName: "fuel",
    chainId: 42161,
    token: "0x650ffE307F5cc48e41DF8063D94538353f7C70a8",
    p2p: "0xb48e018d53b24c3a36f5d5e7725b70667db83b3d",
    pool: "0xe239bfb50eee1a5043e94f07d2787b87470e9d73",
  },
];

export const getChainInfo = (chainId: number) => {
  const chainInfo = contractChains.find((chain) => chain.chainId === chainId);
  if (!chainInfo) {
    throw new Error(`No chain info found for chainId: ${chainId}`);
  }
  return chainInfo;
};

const getChainList = () => {
  const chainList = contractChains.map((chain) => {
    return {
      chainId: chain.chainId,
      chainName: chain.chainName,
    };
  });
  return chainList;
};
export const socialPool: Address = "0x63bD7E1cFb915fec9467E9c85C66e4cBA9a65aAF";
export const p2pLending: Address = "0xA9976E07C1e2882533e14e57E6C480A1Df555E18";
export const socialABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_apiSigner",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "__asset",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "asset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "borrower",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "Ray",
            name: "interestRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "limitRepayDate",
            type: "uint256",
          },
        ],
        internalType: "struct LoanTerms",
        name: "loanTerms",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "apiSignature",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "apiNonce",
        type: "uint256",
      },
    ],
    name: "borrow",
    outputs: [
      {
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "convertToAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    name: "convertToShares",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "loan",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "borrower",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "Ray",
            name: "interestRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "limitRepayDate",
            type: "uint256",
          },
        ],
        internalType: "struct LoanTerms",
        name: "terms",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "initiationDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "repayDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "loanStatus",
    outputs: [
      {
        internalType: "enum LoanStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "maxDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "maxMint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "maxRedeem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "maxWithdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nbOfLoansEmitted",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    name: "previewDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "previewMint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "previewRedeem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    name: "previewWithdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "redeem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "repay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
export const p2pABI = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_asset",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "borrower",
            type: "address",
          },
          {
            internalType: "address",
            name: "lender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "Ray",
            name: "interestRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "limitDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "repayDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initiationDate",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct ZeroFiP2PLending.Loan",
        name: "loan",
        type: "tuple",
      },
    ],
    name: "LoanInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "borrower",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "Ray",
            name: "interestRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct ZeroFiP2PLending.DesiredLoanTerms",
        name: "terms",
        type: "tuple",
      },
    ],
    name: "LoanRequested",
    type: "event",
  },
  {
    inputs: [],
    name: "asset",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "desiredLoans",
    outputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "Ray",
        name: "interestRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "getLoanStatus",
    outputs: [
      {
        internalType: "enum LoanStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "desiredLoanId",
        type: "uint256",
      },
    ],
    name: "lend",
    outputs: [
      {
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "loan",
    outputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "lender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "Ray",
        name: "interestRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limitDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "repayDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "initiationDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nbOfDesiredLoans",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nbOfLoans",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "repay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "Ray",
        name: "interestRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "requestLoan",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
