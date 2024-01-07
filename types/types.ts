import { Database } from "@/libs/database.types";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type Find = Database["public"]["Tables"]["finds"]["Row"];

export enum FindAction {
  LIKE = "LIKE",
  SAVE = "SAVE",
}

export interface GooglePlace {
  id: string;
  displayName: {
    languageCode: string;
    text: string;
  };
  shortFormattedAddress: string;
  types: string[];
}

export interface GooglePlacesResponse {
  places: GooglePlace[];
}
