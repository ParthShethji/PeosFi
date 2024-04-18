console.log("credit score");
 
import type { NextApiRequest, NextApiResponse } from "next";
import { getCreditLine } from "./server/getCreditLine";
import {
  getCreditLineWithHistoryAndApproves,
  newGetCreditLineOnApproves,
} from "./server/getLoansList";
type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log("requesting credit score");
  const addressCap = req.query.address as string;
  const address = addressCap.toLowerCase();
  console.log(address);

  const approvesNmbr = await newGetCreditLineOnApproves(address);
  console.log({ approvesNmbr });

  // console.log({ req });
  let creditLine = await getCreditLine(address);
  console.log({ creditLine });
  if (creditLine === 0) {
    creditLine =11;
  }

  //const creditLine2 = await getCreditLineWithHistoryAndApproves(address);
  console.log({
    response1: creditLine,
    //response2: creditLine2,
  });
  //const formatted = Math.floor(creditLine2);
  //console.log({ creditLine, formatted, creditLine2 });

  const creditLineFinal = creditLine * (1 + 0.1 * approvesNmbr);

  const formatted = Math.floor(creditLineFinal);
  console.log({ formatted });
  res.status(200).json({ message: formatted.toString() });
}