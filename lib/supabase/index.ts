import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

export const verifyUser = async (address) => {
  const { data, error } = await supabase.from("users").insert({
    address: address.toLowerCase(),
    isVerifiedWorldcoin: true,
  });
  if (error) throw error;
  return data;
};

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data;
};
