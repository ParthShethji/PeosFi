import axios from "axios";

export const getUserOnChainData = async (identity: string) => {
  let data = JSON.stringify({
    query: `query findOneIdentity {
    identity(platform: "ethereum", identity: "${identity.toLocaleLowerCase()}") {
        status
        uuid
        displayName
        createdAt
        addedAt
        updatedAt
        neighborWithTraversal(depth: 3) {
        source
        from {
            uuid
            platform
            identity
            displayName
        }
        to {
            uuid
            platform
            identity
            displayName
            avatarUrl
            profileUrl
        }
        }
    }
    }`,
    variables: {},
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://relation-service.next.id/",
    headers: {
      "content-type": "application/json",
    },
    data: data,
  };

  const response = (await axios(config)).data;
  const neighbors = [];
  for (const neighbor of response.data.identity.neighborWithTraversal) {
    const neighborProfile = {
      source: neighbor.source,
      displayName: neighbor.to.displayName,
      identity: neighbor.to.identity,
      profileUrl: neighbor.to.profileUrl,
    };
    neighbors.push(neighborProfile);
  }

  const userProfile = {
    ENS: response.data.identity.displayName,
    identity,
    neighbors: neighbors,
  };
  return userProfile;
};
