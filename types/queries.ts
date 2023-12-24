// queries.ts

import { supabase } from "@/utils/supabase";
import { QueryData } from "@supabase/supabase-js";

// Explore Tab

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

// Find Details Modal

export const FindDetailsQuery = `
id,
rating,
review,
photos,
places (
  name,
  id,
  locality
),
profile (
  id,
  created_at,
  firstname,
  username,
  image,
  finds (
    id
  )
)
`;

const FindDetails_SB_Query = supabase.from("finds").select(FindDetailsQuery);
export type FindDetailsDto = QueryData<typeof FindDetails_SB_Query>;
export type SingleFindDetailsDto = QueryData<typeof FindDetails_SB_Query>[0];

// Find Reviews

export const FindReviewsQuery = `
id,
created_at,
profile (
  id,
  firstname,
  username,
  image
),
review,
rating,
places (
  id,
  name,
  locality
)
`;

const FindReviews_SB_Query = supabase.from("finds").select(FindReviewsQuery);
export type FindReviewsDto = QueryData<typeof FindReviews_SB_Query>;
export type SingleFindReviewsDto = QueryData<typeof FindReviews_SB_Query>[0];
