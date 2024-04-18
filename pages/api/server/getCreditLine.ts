import { getTotalFees } from "./getTotalFeeUsed";
import { getTotalValueFollowers } from "./getTotalValueFollowers";

const RATIO_TVF_CREDIT_LINE = 0.02;
const RATIO_FEES_CREDIT_LINE = 0.1;
const ETH_PRICE = 1500; // TODO add a cache to get the price from the last 5 minutes

export const getCreditLine = async (address: string): Promise<number> => {
  const reputationScore = 1; // TODO
  console.log({ address });
  const totalValueFollowers = await getTotalValueFollowers(address);
  console.log({ totalValueFollowers });
  const creditLineTVF = totalValueFollowers * RATIO_TVF_CREDIT_LINE;

  const totalFeesPaid = await getTotalFees(address);
  console.log({ totalFeesPaid });
  const creditLineFees = totalFeesPaid * RATIO_FEES_CREDIT_LINE;
  const creditLineInEth = Math.min(creditLineTVF, creditLineFees);
  const creditLine = creditLineInEth * ETH_PRICE;
  const quadraticValue =
    Math.sqrt(creditLineTVF * creditLineFees) * reputationScore;

  console.log({
    quadraticValue,
    creditLineUSD: creditLine,
    creditLineInEth,
    creditLineTVF,
    creditLineFees,
  });
  return creditLine;
};

// getCreditLine("0x31304ccdd28e62ef552824db08a350d752068c39");
// getCreditLine("0x674dc72D0738D2f905aE9F3ef17C0384c8bd28d2");
