// queries.ts

import { supabase } from "@/utils/supabase";
import { QueryData } from "@supabase/supabase-js";

// Explore Tab

export const AllFindsQuery = `
      id,
      created_at,
      rating,
      review,
      vibe,
      photos,
      user_id,
      places (
        id,
        name,
        short_formatted_address,
        google_maps_uri,
        google_places_id,
        categories,
        created_at,
        updated_at
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
vibe,
photos,
places (
  id,
    name,
    short_formatted_address,
    google_maps_uri,
    google_places_id,
    categories,
    created_at,
    updated_at
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
vibe,
places (
  id,
    name,
    short_formatted_address,
    google_maps_uri,
    google_places_id,
    categories,
    created_at,
    updated_at
)
`;

const FindReviews_SB_Query = supabase.from("finds").select(FindReviewsQuery);
export type FindReviewsDto = QueryData<typeof FindReviews_SB_Query>;
export type SingleFindReviewsDto = QueryData<typeof FindReviews_SB_Query>[0];

// Profile Search

export const ProfileSearchQuery = `
id,
firstname,
username,
image,
created_at
`;

const ProfileSearch_SB_Query = supabase
  .from("profile")
  .select(ProfileSearchQuery);
export type ProfileSearchDto = QueryData<typeof ProfileSearch_SB_Query>;
export type SingleProfileSearchDto = QueryData<
  typeof ProfileSearch_SB_Query
>[0];

// Profile Details

export const ProfileDetailsQuery = `
id,
created_at,
firstname,
username,
image,
finds (
  id,
  created_at,
  user_id,
  rating,
  review,
  vibe,
  photos,
  places (
    id,
    name,
    short_formatted_address,
    google_maps_uri,
    google_places_id,
    categories,
    created_at,
    updated_at
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
)
`;

const ProfileDetails_SB_Query = supabase
  .from("profile")
  .select(ProfileDetailsQuery);
export type ProfileDetailsDto = QueryData<typeof ProfileDetails_SB_Query>[0];
