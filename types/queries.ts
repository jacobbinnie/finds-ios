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

export const getFindDetailsQuery = supabase.from("finds").select(
  `
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
`
);

export type FindDetails = QueryData<typeof getFindDetailsQuery>;
export type SingleFindDetails = QueryData<typeof getFindDetailsQuery>[0];

// Find Reviews

export const getFindReviewsQuery = supabase.from("finds").select(
  `
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
`
);

export type AllFindReviews = QueryData<typeof getFindReviewsQuery>;
export type SingleFindReview = QueryData<typeof getFindReviewsQuery>[0];
