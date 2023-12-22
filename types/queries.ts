// queries.ts

import { supabase } from "@/utils/supabase";
import { QueryData } from "@supabase/supabase-js";

export const getAllFindsQuery = supabase.from("finds").select(
  `
      id,
      rating,
      review,
      photos,
      user_id,
      likes (
        profile
      ),
      places (
        name,
        id,
        locality
      ),
      profile (
        id,
        firstname,
        username
      )
      `
);

export type AllFinds = QueryData<typeof getAllFindsQuery>;
export type SingleFind = QueryData<typeof getAllFindsQuery>[0];
