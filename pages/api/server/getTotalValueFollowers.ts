import { getTotalEthValueOfFollowers } from "./getEthBalance";
import { getFollowers } from "./getFollowers";

export const getTotalValueFollowers = async (address) => {

  const followers = await getFollowers(address);
  console.log({ followers: followers?.length });
  console.log(followers);
  if (!followers || followers?.length == 0) return 0;
  const followerAddresses = followers;
  // console.log({ followerAddresses });
  const totalValue = await getTotalEthValueOfFollowers(followerAddresses);
  return totalValue;
};

// getTotalValueFollowers("0x31304ccdd28e62ef552824db08a350d752068c39");