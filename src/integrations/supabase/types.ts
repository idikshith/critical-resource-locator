export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ambulances: {
        Row: {
          created_at: string | null
          current_latitude: number | null
          current_longitude: number | null
          driver_id: string | null
          equipment: string[] | null
          id: string
          status: Database["public"]["Enums"]["ambulance_status"] | null
          updated_at: string | null
          vehicle_number: string
        }
        Insert: {
          created_at?: string | null
          current_latitude?: number | null
          current_longitude?: number | null
          driver_id?: string | null
          equipment?: string[] | null
          id?: string
          status?: Database["public"]["Enums"]["ambulance_status"] | null
          updated_at?: string | null
          vehicle_number: string
        }
        Update: {
          created_at?: string | null
          current_latitude?: number | null
          current_longitude?: number | null
          driver_id?: string | null
          equipment?: string[] | null
          id?: string
          status?: Database["public"]["Enums"]["ambulance_status"] | null
          updated_at?: string | null
          vehicle_number?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          blood_type: string | null
          contact_info: string | null
          content: string
          created_at: string | null
          id: string
          location: string | null
          post_type: Database["public"]["Enums"]["post_type"]
          resolved: boolean | null
          title: string
          updated_at: string | null
          urgent: boolean | null
          user_id: string
        }
        Insert: {
          blood_type?: string | null
          contact_info?: string | null
          content: string
          created_at?: string | null
          id?: string
          location?: string | null
          post_type: Database["public"]["Enums"]["post_type"]
          resolved?: boolean | null
          title: string
          updated_at?: string | null
          urgent?: boolean | null
          user_id: string
        }
        Update: {
          blood_type?: string | null
          contact_info?: string | null
          content?: string
          created_at?: string | null
          id?: string
          location?: string | null
          post_type?: Database["public"]["Enums"]["post_type"]
          resolved?: boolean | null
          title?: string
          updated_at?: string | null
          urgent?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      emergency_contacts: {
        Row: {
          created_at: string | null
          id: string
          name: string
          phone: string
          relationship: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          phone: string
          relationship?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          phone?: string
          relationship?: string | null
          user_id?: string
        }
        Relationships: []
      }
      emergency_requests: {
        Row: {
          ambulance_id: string | null
          created_at: string | null
          destination_address: string | null
          destination_latitude: number | null
          destination_longitude: number | null
          estimated_arrival_time: string | null
          hospital_id: string | null
          id: string
          notes: string | null
          patient_condition: string | null
          patient_id: string
          pickup_address: string
          pickup_latitude: number
          pickup_longitude: number
          priority: Database["public"]["Enums"]["priority_level"]
          status: Database["public"]["Enums"]["request_status"] | null
          updated_at: string | null
        }
        Insert: {
          ambulance_id?: string | null
          created_at?: string | null
          destination_address?: string | null
          destination_latitude?: number | null
          destination_longitude?: number | null
          estimated_arrival_time?: string | null
          hospital_id?: string | null
          id?: string
          notes?: string | null
          patient_condition?: string | null
          patient_id: string
          pickup_address: string
          pickup_latitude: number
          pickup_longitude: number
          priority: Database["public"]["Enums"]["priority_level"]
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
        }
        Update: {
          ambulance_id?: string | null
          created_at?: string | null
          destination_address?: string | null
          destination_latitude?: number | null
          destination_longitude?: number | null
          estimated_arrival_time?: string | null
          hospital_id?: string | null
          id?: string
          notes?: string | null
          patient_condition?: string | null
          patient_id?: string
          pickup_address?: string
          pickup_latitude?: number
          pickup_longitude?: number
          priority?: Database["public"]["Enums"]["priority_level"]
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_requests_ambulance_id_fkey"
            columns: ["ambulance_id"]
            isOneToOne: false
            referencedRelation: "ambulances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_requests_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          address: string
          available_beds: number | null
          created_at: string | null
          emergency_capacity: number | null
          id: string
          latitude: number
          longitude: number
          name: string
          phone: string
          specialties: string[] | null
        }
        Insert: {
          address: string
          available_beds?: number | null
          created_at?: string | null
          emergency_capacity?: number | null
          id?: string
          latitude: number
          longitude: number
          name: string
          phone: string
          specialties?: string[] | null
        }
        Update: {
          address?: string
          available_beds?: number | null
          created_at?: string | null
          emergency_capacity?: number | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          phone?: string
          specialties?: string[] | null
        }
        Relationships: []
      }
      medical_articles: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      ambulance_status: "available" | "busy" | "maintenance"
      app_role: "admin" | "patient" | "driver" | "hospital_staff"
      post_type:
        | "blood_request"
        | "medical_help"
        | "resource_sharing"
        | "general"
      priority_level: "low" | "medium" | "high" | "critical"
      request_status:
        | "pending"
        | "assigned"
        | "in_transit"
        | "completed"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ambulance_status: ["available", "busy", "maintenance"],
      app_role: ["admin", "patient", "driver", "hospital_staff"],
      post_type: [
        "blood_request",
        "medical_help",
        "resource_sharing",
        "general",
      ],
      priority_level: ["low", "medium", "high", "critical"],
      request_status: [
        "pending",
        "assigned",
        "in_transit",
        "completed",
        "cancelled",
      ],
    },
  },
} as const
