import type { NextApiRequest, NextApiResponse } from "next";
import { deleteRowsFromSupabase, newDeleteRowsFromSupabase } from "./supabase";
type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let { endorser, beneficiary } = req.body as {
    endorser: string;
    beneficiary: string;
  };
  endorser = endorser?.toLowerCase();
  beneficiary = beneficiary?.toLowerCase();
  console.log({ endorser, beneficiary, req: req.body });
  // console.log({ req });
  const store = await newDeleteRowsFromSupabase({
    supabaseTable: "approves",
    endorser: endorser,
    beneficiary: beneficiary,

  });
  console.log({ store });

  res.status(200).json({ message: store });
}
