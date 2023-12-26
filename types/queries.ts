// queries.ts

import { supabase } from "@/utils/supabase";
import { QueryData } from "@supabase/supabase-js";

// Explore Tab

export const AllFindsQuery = `
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
        username,
        image
      )
      `;

const AllFinds_SB_Query = supabase.from("finds").select(AllFindsQuery);
export type AllFindsDto = QueryData<typeof AllFinds_SB_Query>;
export type SingleFindDto = QueryData<typeof AllFinds_SB_Query>[0];

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
