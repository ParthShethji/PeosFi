const gateway = "plum-odd-rooster-546.mypinata.cloud";
const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
const apikey = "c5bada734d55e3464748";
const secretkey =
  "38c572d0a50cce4910617d4d3f02838c1d4455c6de5edeb8b64000cbc08405c0";
const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhYzEzZDA5ZC03NTQ3LTQ1NjktOWZkMi0zMmJmMjk0YjUwMGMiLCJlbWFpbCI6Im5pY29hbHoubmZ0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjNWJhZGE3MzRkNTVlMzQ2NDc0OCIsInNjb3BlZEtleVNlY3JldCI6IjM4YzU3MmQwYTUwY2NlNDkxMDYxN2Q0ZDNmMDI4MzhjMWQ0NDU1YzZkZTVlZGViOGI2NDAwMGNiYzA4NDA1YzAiLCJpYXQiOjE2OTU1MDI2Nzd9.G6tUsgB0o2bbCxPqATb3lLTxBA58YA4Ic20rdrW5t4E";
export const uploadJson = async (data: unknown): Promise<string> => {
  const serialized = JSON.stringify(data);
  console.log({
    serialized,
    secretkey,
    apikey,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      pinata_api_key: apikey,
      pinata_secret_api_key: secretkey,
    },
    body: serialized,
  };

  const res = await fetch(url, options);
  const json = await res.json();

  return "ipfs://" + json.IpfsHash;
};
