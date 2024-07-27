import axios from "axios";
import "dotenv/config";

export const getFollowers = async (address) => {
  try {
    const AIRSTACK_API_KEY = process.env.AIRSTACK_API_KEY;
    
    if (!AIRSTACK_API_KEY)
      throw new Error("No AIRSTACK_API_KEY environment variable found.");
    const query = JSON.stringify({
      query: `query MyQuery {
        SocialFollowers(
          input: {filter: {identity: {_eq: "${address}"}}, blockchain: ALL, limit: 200}
        ) {
          Follower {
            followerAddress {
              addresses
            }
            dappName
          }
        }
      }`,
      variables: {},
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.airstack.xyz/gql",
      headers: {
        authorization: AIRSTACK_API_KEY,
        "Content-Type": "application/json",
      },
      data: query,
    };

    const { data } = await axios.request(config);
    const followers = data?.data?.SocialFollowers?.Follower;
    // console.log({ followers });
    return followers;
  } catch (error) {
    console.log({ getFollowers: error });
    return ["0x31304ccdd28e62ef552824db08a350d752068c39"]; // TODO remove this
  }
};

