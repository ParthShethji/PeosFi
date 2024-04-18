import type { NextApiRequest, NextApiResponse } from "next";
import { storeDataToSupabase } from "./supabase";
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
  const store = await storeDataToSupabase({
    supabaseTable: "approves",
    data: { endorser, beneficiary },
  });
  console.log({ store });

  res.status(200).json({ message: store });
}
