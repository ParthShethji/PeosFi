import type { NextApiRequest, NextApiResponse } from "next";
import { getLoansList } from "./server/getLoansList";
type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let { address } = req.body as {
    address: string;
  };
  address = address?.toLowerCase();
  console.log({ address, req: req.body });
  // console.log({ req });
  const loans = await getLoansList(address);
  console.log({ loans });

  res.status(200).json({ message: loans });
}
