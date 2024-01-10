export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      finds: {
        Row: {
          created_at: string
          id: string
          photos: string[]
          place: string | null
          rating: number
          review: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          photos: string[]
          place?: string | null
          rating: number
          review: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          photos?: string[]
          place?: string | null
          rating?: number
          review?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "finds_place_fkey"
            columns: ["place"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      places: {
        Row: {
          categories: string[]
          created_at: string
          google_maps_uri: string
          google_places_id: string
          id: string
          name: string
          short_formatted_address: string
          updated_at: string
        }
        Insert: {
          categories: string[]
          created_at?: string
          google_maps_uri: string
          google_places_id: string
          id?: string
          name: string
          short_formatted_address: string
          updated_at?: string
        }
        Update: {
          categories?: string[]
          created_at?: string
          google_maps_uri?: string
          google_places_id?: string
          id?: string
          name?: string
          short_formatted_address?: string
          updated_at?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          created_at: string
          firstname: string
          id: string
          image: string | null
          username: string
        }
        Insert: {
          created_at?: string
          firstname: string
          id: string
          image?: string | null
          username: string
        }
        Update: {
          created_at?: string
          firstname?: string
          id?: string
          image?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      saves: {
        Row: {
          created_at: string
          find: string
          id: string
          profile: string
        }
        Insert: {
          created_at?: string
          find: string
          id?: string
          profile: string
        }
        Update: {
          created_at?: string
          find?: string
          id?: string
          profile?: string
        }
        Relationships: [
          {
            foreignKeyName: "saves_find_fkey"
            columns: ["find"]
            isOneToOne: false
            referencedRelation: "finds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saves_profile_fkey"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
