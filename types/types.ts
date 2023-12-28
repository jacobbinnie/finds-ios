import { Database } from "@/libs/database.types";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type Find = Database["public"]["Tables"]["finds"]["Row"];

export enum FindAction {
  LIKE = "LIKE",
  SAVE = "SAVE",
}
