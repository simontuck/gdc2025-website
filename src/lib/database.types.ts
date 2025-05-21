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
      agenda_items: {
        Row: {
          id: string
          day: number
          start_time: string
          end_time: string
          title: string
          subtitle: string | null
          description: string | null
          format: string
          room: string | null
          capacity: number | null
          goals: string[] | null
          target_audience: string[] | null
          prerequisites: string | null
          materials_url: string | null
          recording_url: string | null
          slides_url: string | null
          status: string
          labels: string[] | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          day: number
          start_time: string
          end_time: string
          title: string
          subtitle?: string | null
          description?: string | null
          format: string
          room?: string | null
          capacity?: number | null
          goals?: string[] | null
          target_audience?: string[] | null
          prerequisites?: string | null
          materials_url?: string | null
          recording_url?: string | null
          slides_url?: string | null
          status?: string
          labels?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          day?: number
          start_time?: string
          end_time?: string
          title?: string
          subtitle?: string | null
          description?: string | null
          format?: string
          room?: string | null
          capacity?: number | null
          goals?: string[] | null
          target_audience?: string[] | null
          prerequisites?: string | null
          materials_url?: string | null
          recording_url?: string | null
          slides_url?: string | null
          status?: string
          labels?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      agenda_organizations: {
        Row: {
          agenda_item_id: string
          organization_id: string
          role: string
        }
        Insert: {
          agenda_item_id: string
          organization_id: string
          role: string
        }
        Update: {
          agenda_item_id?: string
          organization_id?: string
          role?: string
        }
      }
      agenda_speakers: {
        Row: {
          agenda_item_id: string
          speaker_id: string
          role: string
          speaking_order: number | null
          notes: string | null
          confirmed: boolean | null
        }
        Insert: {
          agenda_item_id: string
          speaker_id: string
          role: string
          speaking_order?: number | null
          notes?: string | null
          confirmed?: boolean | null
        }
        Update: {
          agenda_item_id?: string
          speaker_id?: string
          role?: string
          speaking_order?: number | null
          notes?: string | null
          confirmed?: boolean | null
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          short_name: string | null
          type: Database["public"]["Enums"]["organization_type"]
          description: string | null
          website_url: string | null
          logo_url: string | null
          linkedin_url: string | null
          twitter_url: string | null
          contact_email: string | null
          contact_phone: string | null
          address: string | null
          country: string | null
          is_co_organizer: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          short_name?: string | null
          type: Database["public"]["Enums"]["organization_type"]
          description?: string | null
          website_url?: string | null
          logo_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          country?: string | null
          is_co_organizer?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          short_name?: string | null
          type?: Database["public"]["Enums"]["organization_type"]
          description?: string | null
          website_url?: string | null
          logo_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          address?: string | null
          country?: string | null
          is_co_organizer?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      speaker_organizations: {
        Row: {
          speaker_id: string
          organization_id: string
          role: string
          start_date: string | null
          end_date: string | null
          is_current: boolean | null
        }
        Insert: {
          speaker_id: string
          organization_id: string
          role: string
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean | null
        }
        Update: {
          speaker_id?: string
          organization_id?: string
          role?: string
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean | null
        }
      }
      speakers: {
        Row: {
          id: string
          name: string
          title: string | null
          email: string | null
          bio: string | null
          avatar_url: string | null
          linkedin_url: string | null
          twitter_url: string | null
          website_url: string | null
          primary_organization_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          title?: string | null
          email?: string | null
          bio?: string | null
          avatar_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          website_url?: string | null
          primary_organization_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          title?: string | null
          email?: string | null
          bio?: string | null
          avatar_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          website_url?: string | null
          primary_organization_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      organization_type: "intergovernmental" | "government" | "standards_body" | "open_source" | "ngo" | "industry" | "academic" | "other"
    }
  }
}