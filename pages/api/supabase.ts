import { createClient, SupabaseClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const DEFAULT_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

export const createSupabaseClient = ({
  supabaseUrl,
  supabaseKey,
}: {
  supabaseUrl?: string;
  supabaseKey?: string;
}): SupabaseClient<any, "public", any> => {
  try {
    supabaseUrl = supabaseUrl || DEFAULT_SUPABASE_URL;
    supabaseKey = supabaseKey || DEFAULT_SUPABASE_KEY;

    const supabase = createClient(supabaseUrl, supabaseKey);
    return supabase;
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

export const storeDataToSupabase = async ({
  supabaseUrl,
  supabaseKey,
  supabaseTable,
  data,
}: {
  supabaseUrl?: string;
  supabaseKey?: string;
  supabaseTable: string;
  data: any;
}): Promise<any> => {
  try {
    supabaseUrl = supabaseUrl || DEFAULT_SUPABASE_URL;
    supabaseKey = supabaseKey || DEFAULT_SUPABASE_KEY;
    const supabase = createSupabaseClient({ supabaseUrl, supabaseKey });
    const { data: response, error } = await supabase
      .from(supabaseTable)
      .insert(data);
    if (error) throw error;
    return response;
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

export const getDataFromSupabase = async ({
  supabaseUrl,
  supabaseKey,
  supabaseTable,
  filter,
}: {
  supabaseUrl?: string;
  supabaseKey?: string;
  supabaseTable: string;
  filter?: {
    column: string;
    operator: string;
    value: string;
  };
}): Promise<any> => {
  try {
    supabaseUrl = supabaseUrl || DEFAULT_SUPABASE_URL;
    supabaseKey = supabaseKey || DEFAULT_SUPABASE_KEY;
    const supabase = createSupabaseClient({ supabaseUrl, supabaseKey });
    const { data: response, error } = filter
      ? await supabase
          .from(supabaseTable)
          .select()
          .filter(filter.column, filter.operator, filter.value)
      : await supabase.from(supabaseTable).select("*");
    if (error) throw error;
    return response;
  } catch (error) {
    console.error({ error });
    throw error;
  }
};

export const deleteRowsFromSupabase = async ({
  supabaseUrl,
  supabaseKey,
  supabaseTable,
  filter1,
  filter2,
}: {
  supabaseUrl?: string;
  supabaseKey?: string;
  supabaseTable: string;
  filter1?: {
    column: string;
    operator: string;
    value: string;
  };
  filter2?: {
    column: string;
    operator: string;
    value: string;
  };
}): Promise<any> => {
  try {
    supabaseUrl = supabaseUrl || DEFAULT_SUPABASE_URL;
    supabaseKey = supabaseKey || DEFAULT_SUPABASE_KEY;
    const supabase = createSupabaseClient({ supabaseUrl, supabaseKey });
    // delete all rows where id > 0
    const { data: response, error } = await supabase
      .from(supabaseTable)
      .delete()
      .eq(filter1?.column, filter1?.value)
      .eq(filter2?.column, filter2?.value);

    if (error) throw error;
    return response;
  } catch (error) {
    console.error({ error });
    throw error;
  }
};


export const newDeleteRowsFromSupabase = async ({
  supabaseUrl,
  supabaseKey,
  supabaseTable,
  endorser,
  beneficiary,
}: {
  supabaseUrl?: string;
  supabaseKey?: string;
  supabaseTable: string;
  endorser: string;
  beneficiary: string;
}): Promise<any> => {
  try {
    supabaseUrl = supabaseUrl || DEFAULT_SUPABASE_URL;
    supabaseKey = supabaseKey || DEFAULT_SUPABASE_KEY;
    const supabase = createSupabaseClient({ supabaseUrl, supabaseKey });

    console.log({ endorser, beneficiary });

    const { data: response, error } = await supabase
      .from(supabaseTable)
      .delete()
      .eq("endorser", endorser.toLowerCase())
      .eq("beneficiary", beneficiary.toLowerCase());

    if (error) throw error;
    console.log({ response });
    return response;
  } catch (error) {
    console.error({ error });
    throw error;
  }
};
