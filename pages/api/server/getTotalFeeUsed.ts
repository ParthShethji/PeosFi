import axios from "axios";

const DEFAULT_FEES_USED = 1;

const getTransactionHistory = async (address) => {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=T9RV3FGW573WX9YX45F1Z89MEMEUNQXUC7
   `; // its fees.wtf api keys
  try {
    const response = await axios.get(url);
    const transactions = response.data.result;
    // console.log({ response, transactions });
    return transactions;
  } catch (error) {
    console.error({ error, DEFAULT_FEES_USED });
    return DEFAULT_FEES_USED;
  }
};

export const getTotalFees = async (address) => {
  const transactions = await getTransactionHistory(address);
  const feesInWei = transactions.reduce((acc, tx) => {
    const fee = Number(tx.gasPrice) * Number(tx.gasUsed);
    return acc + fee;
  }, 0);
  const fees = feesInWei / 10 ** 18;
  console.log({ fees });
  return fees;
};

// getTotalFees("0x31304ccdd28e62ef552824db08a350d752068c39");
